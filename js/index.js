mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyeXNvcGh5dGEiLCJhIjoiY2piZnVhOXFyMnhicjMybnoyOG5ueW43cCJ9.i6e5n-YiCbVQG-dvJAdkQQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [120.21740, 22.9762],
  zoom: 19
});
console.log(data);

function pointOnCircle(index) {
  return {
    "type": "Point",
    "coordinates": data[index]
  };
}

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
let i=0;
  function animateMarker(timestamp) {
    // Update the data to a new position based on the animation timestamp. The
    // divisor in the expression `timestamp / 1000` controls the animation speed.
    map.getSource('point').setData(pointOnCircle(Math.floor(timestamp / 1000)-3));

    // Request the next frame of the animation.
    if ((timestamp / 1000)-3<data.length)
      requestAnimationFrame(animateMarker);
  }

  // After 3 second start the animation.
  setTimeout(function () { animateMarker(0);}, 3000);
});
