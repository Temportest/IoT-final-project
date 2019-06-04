
let data=[];

fetch('http://localhost:8005/mqtt?macaddr=aa560370&startTime=2019-06-04 18:11:00&endTime=2019-06-04 18:20:00', {})
  .then((response) => {
    return response.json();
  }).then((jsonData) => {
    console.log(jsonData);
    for(let i=0;i<jsonData.length;i++){
      data.push([jsonData[i].lng,jsonData[i].lat]);
    }
  }).catch((err) => {
    console.log('錯誤:', err);
  });
