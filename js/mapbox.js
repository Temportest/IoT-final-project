mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyeXNvcGh5dGEiLCJhIjoiY2piZnVhOXFyMnhicjMybnoyOG5ueW43cCJ9.i6e5n-YiCbVQG-dvJAdkQQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [120.217134, 22.976278],
  zoom: 18.3
});

function pointOnCircle(index) {
  tagData = data[index];

  return {
    "type": "Point",
    "coordinates": data[index]
  };
}

// 繪製路線
map.on('load', function () {
  map.addLayer({
    "id": "route",
    "type": "line",
    "source": {
      "type": "geojson",
      "data": {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": data
        }
      }
    },
    "layout": {
      "line-join": "round",
      "line-cap": "round"
    },
    "paint": {
      "line-color": "red",
      "line-width": 2
    }
  });
});


// 圓圈圖釘
map.on('load', function () {
  // Add a source and layer displaying a point which will be animated in a circle.
  map.addSource('point', {
    "type": "geojson",
    "data": pointOnCircle(0)
  });

  map.addLayer({
    "id": "point",
    "source": "point",
    "type": "circle",
    "paint": {
      "circle-radius": 10,
      "circle-color": "#007cbf"
    }
  });
  let i = 0;
  function animateMarker(timestamp) {
    // Update the data to a new position based on the animation timestamp. The
    // divisor in the expression `timestamp / 1000` controls the animation speed.
    map.getSource('point').setData(pointOnCircle(Math.floor(timestamp / 1000) - 3));

    // Request the next frame of the animation.
    if ((timestamp / 1000) - 3 < data.length)
      requestAnimationFrame(animateMarker);
  }

  // After 3 second start the animation.
  setTimeout(function () { animateMarker(0); }, 3000);
});


// 動畫圖釘
var size = 150;

var pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),

  onAdd: function () {
    var canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');
  },

  render: function () {
    var duration = 1000;
    var t = (performance.now() % duration) / duration;

    var radius = size / 2 * 0.3;
    var outerRadius = size / 2 * 0.7 * t + radius;
    var context = this.context;

    // draw outer circle
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
    context.fillStyle = 'rgba(0, 153, 255,' + (1 - t) + ')';
    context.fill();

    // draw inner circle
    context.beginPath();
    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
    context.fillStyle = 'rgba(0, 153, 255, 1)';
    context.strokeStyle = 'white';
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();

    // update this image's data with data from the canvas
    this.data = context.getImageData(0, 0, this.width, this.height).data;

    // keep the map repainting
    map.triggerRepaint();

    // return `true` to let the map know that the image was updated
    return true;
  }
};

map.on('load', function () {

  map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
  map.addSource("points", {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": pointOnCircle(0)
        }
      }]
    }
  });
  map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": "points",
    "layout": {
      "icon-image": "pulsing-dot"
    }
  });

  function animateMarker(timestamp) {
    // Update the data to a new position based on the animation timestamp. The
    // divisor in the expression `timestamp / 1000` controls the animation speed.
    map.getSource('points').setData(pointOnCircle(Math.floor(timestamp / 1000) - 3));

    // Request the next frame of the animation.
    if ((timestamp / 1000) - 3 < data.length)
      requestAnimationFrame(animateMarker);
  }

  // After 3 second start the animation.
  setTimeout(function () { animateMarker(0); }, 3000);
});
