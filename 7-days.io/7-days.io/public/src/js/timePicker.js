let hrs = null;
let mns = null

let objct;

function pickTime(obj) {
  objct = obj;
  document.querySelector(".prompt").style.display = "block";
  let items = "";
  for (let i = 1; i <= 12; i++) {
    let interval = 360 / 12;
    let degree = interval * i;

    let val = (hrs != null) ? ((i == 12) ? 00 : i * 5) : i;
    items += `<span class="deg${degree}" onclick="action(this)">${val}</span>`;
  }
  document.querySelector(".clock").innerHTML = `<div class="time">${items}</div>`;
}
const hrsSet = obj => hrs = Math.round(obj.innerHTML);
const mnsSet = obj => mns = Math.round(obj.innerHTML);
const action = obj => { if (hrs == null) { step2(obj) } else { finish(obj) } };

const setTime = obj => obj.innerHTML = hrs + ":" + mns;

function step2(obj) {
  hrsSet(obj);
  pickTime(objct);
}
function finish(obj) {
  mnsSet(obj);
  setTime(objct);
  document.querySelector(".prompt").style.display = "none";

  hrs = null;
  mns = null;
}