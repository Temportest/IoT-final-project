
let data = [];

fetch('http://localhost:8005/mqtt?macaddr=aa560370&startTime=2019-06-06 7:11:00&endTime=2019-06-06 12:00:00', {})
  .then((response) => {
    return response.json();
  }).then((jsonData) => {
    console.log(jsonData);
    for (let i = 0; i < jsonData.length; i++) {
      if (jsonData[i].lng === '0' && jsonData[i].lat === '0')
        continue;
      data.push([jsonData[i].lng, jsonData[i].lat]);
    }
  }).catch((err) => {
    console.log('錯誤:', err);
  });



let dayTimeLabel = ["2019-06-06 7", "2019-06-06 8", "2019-06-06 9", "2019-06-06 10", "2019-06-06 11", "2019-06-06 12", "2019-06-06 13", "2019-06-06 14", "2019-06-06 15"];
let shakeData = [];
let checked;
let count = 0;
let index = 7;

fetch('http://localhost:8005/mqtt?macaddr=aaeec755&startTime=2019-06-06 7:11:00&endTime=2019-06-06 16:00:00')
  .then((response) => {
    return response.json();
  }).then((jsonData) => {
    console.log(jsonData);
    for (let i = 0; i < jsonData.length; i++) {
      const createTime = new Date(jsonData[i].created_at).toLocaleString('zh', { hour12: false });
      const date = createTime.split(' ')[0];
      const hour = createTime.split(' ')[1].split(":")[0];
      if (hour === checked || i === 0) {
        checked = hour;
        count++;
        if (Number(checked) !== index) {
          console.log("!");
          shakeData.push(0);
          index++;
        }
      } else {
        console.log(checked + " " + count);
        shakeData.push(count);
        checked = hour;
        index++;
        count = 0;
      }
    } shakeData.push(count);

  }).catch((err) => {
    console.log('錯誤:', err);
  });
