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
    block.style.background = "var(--accent)";
    block.style.color = "#eee";
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
    if (data.name && data.loc)
      fields[i].innerHTML = "<B>" + data.name + "</B>" + "<br>" + data.loc;

    let period = fields[i].getAttribute("class")

    for (let i = 0; i < document.getElementsByClassName(period).length; i++) {
      if (data.from) {
        document.getElementsByClassName(period)[i].setAttribute("from", data.from)
        document.getElementsByClassName(period)[i].setAttribute("to", data.to)
      }
    }
  }
  console.log("resetting editor");

  resetEditor();
  doFinalCheck();
}

function doFinalCheck() {
  let day, period;

  let timeGap = 0;

  for (day = 1; day <= days; day++) {
    for (period = 1; period < periods; period++) {
      if (period > 1) {
        // shift times so that they don't overlap
        if (getPeriodTimes(day, period) != null) {
          let newFinishTime;
          try {
            newFinishTime = addTimes(getPeriodTimes(day, period).to, subTimes(getPeriodTimes(day, period).to, getPeriodTimes(day, period).from))
          } catch (e) {
            newFinishTime = null;
          }
          if (newFinishTime != null) {
            setPeriodTimes(day, period, getPeriodTimes(day, period).to, newFinishTime);
          }
        }
      }
    }
  }
}

function setPeriodTimes(day, period, from, to) {
  document.getElementsByClassName("day" + day)[0].childNodes[period - 1].setAttribute("from", from)
  document.getElementsByClassName("day" + day)[0].childNodes[period - 1].setAttribute("to", to)
}

function getPeriodTimes(day, period) {
  let times = {
    from: null,
    to: null
  }
  try {
    times.from = document.getElementsByClassName("day" + day)[0].childNodes[period - 1].getAttribute("from")
    times.to = document.getElementsByClassName("day" + day)[0].childNodes[period - 1].getAttribute("to")
  } catch (e) {
    return null;
  }

  return times
}

const changedays = val => { days = val; updateTable() }
const changeperiods = val => { periods = val; updateTable() }

function updateTable() {
  let newTable = "<table>";

  for (let i = 0; i < days; i++) {
    let tr = `<tr class="day${i}">`
    for (let j = 0; j < periods; j++) {
      tr += `<td onclick="editField(this)" class="period${j}">Day ${i + 1}<br><span>Period ${j + 1}</span></td>`
    }
    tr += "</tr>";
    newTable += tr;
  }
  newTable += "</table>";
  document.querySelector(".tableCont").innerHTML = newTable;
}


function exportTable() {
  let incompleteFields = false;
  let data = {
    days: document.querySelector("#days").value,
    periods: document.querySelector("#periods").value,
    data: []
  }
  for (let i = 0; i < days; i++) {
    let day = [];
    for (let j = 0; j < periods; j++) {

      let dayTag = document.querySelector(".day" + i).children[j];

      try {
        if (dayTag) {
          let period = {
            name: dayTag.querySelector("b").innerHTML,
            location: dayTag.innerHTML.split("<br>")[1],
            from: dayTag.getAttribute("from"),
            to: dayTag.getAttribute("to")
          }
          day.push(period);
        }
      } catch (e) {
        if (dayTag) {
          let period = {
            name: null,
            location: null,
            from: null,
            to: null
          }
          day.push(period);
          incompleteFields = true;
        }
      }
    }
    data.data.push(day);
  }
  if (incompleteFields) {
    if (confirm("There are some fields that are empty, are you sure you want to continue?"))
      console.log(data);
  } else {
    console.log(data);
  }
}

/* My School Table

<table><tbody><tr class="day0"><td class="period0" onclick="editField(this)" from="9:0" to="10:20"><b>Geography</b><br>room 14</td><td class="period1" onclick="editField(this)" from="10:20" to="11:10"><b>English</b><br>room 7</td><td class="period2" onclick="editField(this)" from="23:30" to="24:40"><b>Photography</b><br>room 12</td><td class="period3" onclick="editField(this)" from="24:40" to="13:30"><b>Science</b><br>room 21</td><td class="period4" onclick="editField(this)" from="14:10" to="14:50"><b>Math</b><br>room 3</td><td class="period5" onclick="editField(this)" from="14:50" to="15:30"><b>IT</b><br>room 17</td></tr><tr class="day1"><td class="period0" onclick="editField(this)" from="9:0" to="10:20"><b>English</b><br>room 7</td><td class="period1" onclick="editField(this)" from="10:20" to="11:10"><b>Photography</b><br>room 12</td><td class="period2" onclick="editField(this)" from="23:30" to="24:40"><b>Science</b><br>room 21</td><td class="period3" onclick="editField(this)" from="24:40" to="13:30"><b>Math</b><br>room 3</td><td class="period4" onclick="editField(this)" from="14:10" to="14:50"><b>IT</b><br>room 17</td><td class="period5" onclick="editField(this)" from="14:50" to="15:30"><b>PE</b><br>Hall</td></tr><tr class="day2"><td class="period0" onclick="editField(this)" from="9:0" to="10:20"><b>Photography</b><br>room 12</td><td class="period1" onclick="editField(this)" from="10:20" to="11:10"><b>Science</b><br>room 21</td><td class="period2" onclick="editField(this)" from="23:30" to="24:40"><b>Math</b><br>room 3</td><td class="period3" onclick="editField(this)" from="24:40" to="13:30"><b>IT</b><br>room 17</td><td class="period4" onclick="editField(this)" from="14:10" to="14:50"><b>PE</b><br>Hall</td><td class="period5" onclick="editField(this)" from="14:50" to="15:30"><b>Geography</b><br>room 14</td></tr><tr class="day3"><td class="period0" onclick="editField(this)" from="9:0" to="10:20"><b>Science</b><br>room 21</td><td class="period1" onclick="editField(this)" from="10:20" to="11:10"><b>Math</b><br>room 3</td><td class="period2" onclick="editField(this)" from="23:30" to="24:40"><b>IT</b><br>room 17</td><td class="period3" onclick="editField(this)" from="24:40" to="13:30"><b>PE</b><br>Hall</td><td class="period4" onclick="editField(this)" from="14:10" to="14:50"><b>Geography</b><br>room 14</td><td class="period5" onclick="editField(this)" from="14:50" to="15:30"><b>English</b><br>room 7</td></tr><tr class="day4"><td class="period0" onclick="editField(this)" from="9:0" to="10:20"><b>Math</b><br>room 3</td><td class="period1" onclick="editField(this)" from="10:20" to="11:10"><b>IT</b><br>room 17</td><td class="period2" onclick="editField(this)" from="23:30" to="24:40"><b>PE</b><br>Hall</td><td class="period3" onclick="editField(this)" from="24:40" to="13:30"><b>Geography</b><br>room 14</td><td class="period4" onclick="editField(this)" from="14:10" to="14:50"><b>English</b><br>room 7</td><td class="period5" onclick="editField(this)" from="14:50" to="15:30"><b>Photography</b><br>room 12</td></tr><tr class="day5"><td class="period0" onclick="editField(this)" from="9:0" to="10:20"><b>IT</b><br>room 17</td><td class="period1" onclick="editField(this)" from="10:20" to="11:10"><b>PE</b><br>Hall</td><td class="period2" onclick="editField(this)" from="23:30" to="24:40"><b>Geography</b><br>room 14</td><td class="period3" onclick="editField(this)" from="24:40" to="13:30"><b>English</b><br>room 7</td><td class="period4" onclick="editField(this)" from="14:10" to="14:50"><b>Photography</b><br>room 12</td><td class="period5" onclick="editField(this)" from="14:50" to="15:30"><b>Science</b><br>room 21</td></tr><tr class="day6"><td class="period0" onclick="editField(this)" from="9:0" to="10:20"><b>PE</b><br>Hall</td><td class="period1" onclick="editField(this)" from="10:20" to="11:10"><b>Geography</b><br>room 14</td><td class="period2" onclick="editField(this)" from="23:30" to="24:40"><b>English</b><br>room 7</td><td class="period3" onclick="editField(this)" from="24:40" to="13:30"><b>Photography</b><br>room 12</td><td class="period4" onclick="editField(this)" from="14:10" to="14:50"><b>Science</b><br>room 21</td><td class="period5" onclick="editField(this)" from="14:50" to="15:30"><b>Math</b><br>room 3</td></tr></tbody></table>

*/

function resetEditor() {
  shiftHeld = false;
  fields = [];
  field = null;

  document.querySelector("#from").innerHTML = "From";
  document.querySelector("#from").value = "";
  document.querySelector("#to").innerHTML = "To";
  document.querySelector("#to").value = "";

  document.querySelector(".getData").style.display = "none";

  for (let i in document.querySelectorAll("td")) {
    try {
      document.querySelectorAll("td")[i].style.background = "transparent";
      document.querySelectorAll("td")[i].style.color = "#222";
    } catch (e) {}
  }
}