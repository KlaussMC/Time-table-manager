function addTimes(time1, time2) {
  let newTime = 0;

  let t1 = time1.split(":");
  let t2 = time2.split(":");

  t1[0] = Math.round(t1[0])
  t1[1] = Math.round(t1[1])
  t2[0] = Math.round(t2[0])
  t2[1] = Math.round(t2[1])

  newTime += t1[0] + t2[0];

  let mins = t1[1] + t2[1];

  while (mins > 60) {
    newTime += 1;
    mins -= 60;
  }
  newTime += ":" + mins;

  return newTime
}
function subTimes(time1, time2) {
  let newTime = 0;

  let t1 = time1.split(":");
  let t2 = time2.split(":");

  t1[0] = Math.round(t1[0])
  t1[1] = Math.round(t1[1])
  t2[0] = Math.round(t2[0])
  t2[1] = Math.round(t2[1])

  newTime = t1[0] - t2[0];

  let mins = t1[1] - t2[1];

  while (mins < 0) {
    newTime -= 1;
    mins += 60;
  }
  newTime += ":" + mins;
  return newTime;
}
function convertToReadableTime(hours, minutes) {
  return hours + ":" + minutes;
}
function getTimeGap(time1, time2) {
  return subTimes(time1, time2)
}