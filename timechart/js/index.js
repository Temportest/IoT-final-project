var timeFormat = 'DD/MM/YYYY TT';

var config = {
  type: 'line',
  animationEnabled: true,
  data: {
    labels: dayTimeLabel,
    datasets: [{
      lineTension: 0,
      fill: 'origin',
      label: "Стоимость",
      backgroundColor: '#c4c1b8',
      borderColor: '#a69e8b',
      data: shakeData,
    }]
  },
  options: {
    plugins: {
      filler: {
        propagate: true
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false
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
