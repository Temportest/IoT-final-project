let chart;
console.log(shakeData);
let pieData = [
  { y: ((27 / 280) * 100).toFixed(1), label: 27, name: "7 點" },
  { y: ((71 / 280) * 100).toFixed(1), label: 71, name: "8 點" },
  { y: ((31 / 280) * 100).toFixed(1), label: 31, name: "9 點" },
  { y: ((48 / 280) * 100).toFixed(1), label: 48, name: "10 點" },
  { y: ((63 / 280) * 100).toFixed(1), label: 63, name: "11 點" },
  { y: 0, label: 0, name: "12 點" },
  { y: 0, label: 0, name: "13 點" },
  { y: ((10 / 280) * 100).toFixed(1), label: 10, name: "14 點" },
  { y: ((30 / 280) * 100).toFixed(1), label: 30, name: "15 點" },
];

chart = new CanvasJS.Chart("chartContainer", {
  //exportEnabled: true,
  animationEnabled: true,
  backgroundColor: "#29395b",
  theme: "dark1", //"light1", "dark1", "dark2"
  title: {
    // text: "Indicator value"
  },
  legend: {
    cursor: "pointer",
    itemclick: explodePie
  },
  data: [{
    type: "pie",
    showInLegend: true,
    toolTipContent: "使用次數: <strong>{label}次</strong>",
    indexLabel: "{name} - {y}%",
    dataPoints: pieData,
    showInLegend: false
  }]
});
chart.render();

function explodePie(e) {
  if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
    e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
  } else {
    e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
  }
  e.chart.render();
}

