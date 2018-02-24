const ttmanager = () => { document.querySelector("#editorField").style.display = "block"; }

let days = 7;
let periods = 6;

let data = [];

let field = null;
let fields = [];

let shiftHeld = false;

window.addEventListener("keydown", e => {
  if (e.keyCode == 16) {
    shiftHeld = true;
  }
})
window.addEventListener("keyup", e => {
  if (e.keyCode == 16) {
    getUserData()
  }
})

function editField(block) {
  if (shiftHeld) {
    fields.push(block);
  } else {
    fields = [block];
    getUserData();
  }
}
const getUserData = () => {
  if (fields.length > 0)
    document.querySelector(".getData").style.display = "block";
}

function parseData() {
  let dat = {
    name: document.querySelector("#name").value,
    from: document.querySelector("#from").innerHTML,
    to: document.querySelector("#to").innerHTML,
    loc: document.querySelector("#where").value
  }
  return dat;
}

const confirmEvent = () => {
  let data = parseData();

  for (let i = 0; i < fields.length; i++) {
    fields[i].innerHTML = "<B>" + data.name + "</B>" + "<br>" + data.loc;

    let period = fields[i].getAttribute("class")

    for (let i = 0; i < document.getElementsByClassName(period).length; i++) {
      document.getElementsByClassName(period)[i].setAttribute("from", data.from);
      document.getElementsByClassName(period)[i].setAttribute("to", data.to);
    }
  }

  doFinalCheck();

  document.querySelector(".getData").style.display = "none";

  shiftHeld = false;
  fields = [];
  field = null;
}

function doFinalCheck() {
  let day, period;

  let timeGap = 0;

  for (day = 1; day <= days; day++) {
    for (period = 1; period < periods; period++) {
      if (period > 1) {
        // shift times so that they don't overlap
      }
    }
  }
}