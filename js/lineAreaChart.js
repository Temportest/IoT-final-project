
var config = {
  type: 'line',
  animationEnabled: true,
  data: {
    labels: dayTimeLabel,
    datasets: [{
      lineTension: 0,
      fill: 'origin',
      label: "震動次數",
      backgroundColor: 'rgba(99, 184, 255,.5)',
      borderColor: 'rgb(99, 184, 255)',
      data: shakeData,
    }]
  },
  options: {
    plugins: {
      filler: {
        propagate: true
      }
    },
    legend: {
      labels: {
        fontColor: "white"
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: "white",
          beginAtZero: false
        },
        gridLines: {
          color: 'rgba(171,171,171,1)',
          lineWidth: 0.5
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: "white"
        },
        gridLines: {
          color: 'rgba(171,171,171,1)',
          lineWidth: 0.5
        }
      }]
    },
    tooltips: {
      mode: 'nearest'
    }
  }
};

window.onload = function () {
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myLine = new Chart(ctx, config);
};
