"use strict";
const ttmanager = () => document.querySelector("#editorField").style.display = "block";
let days = 7 , periods = 6 , data = [] , field = null , fields = [] , shiftHeld = !1;
window.addEventListener("keydown", a => {
  16 == a.keyCode && (shiftHeld = !0)
}),
window.addEventListener("keyup", a => {
  16 == a.keyCode && getUserData()
});
function editField(a) {
  shiftHeld ? (fields.push(a),
    a.style.background = "var(--accent)",
    a.style.color = "#eee") : (fields = [a],
      getUserData())
}
const getUserData = () => {
  0 < fields.length && (document.querySelector(".getData").style.display = "block")
};
function parseData() {
  let a = {
    name: document.querySelector("#name").value,
    from: document.querySelector("#from").innerHTML,
    to: document.querySelector("#to").innerHTML,
    loc: document.querySelector("#where").value
  };
  return a
}
const confirmEvent = () => {
  let a = parseData();
  for (let b = 0; b < fields.length; b++) {
    a.name && a.loc && (fields[b].innerHTML = "<B>" + a.name + "</B><br>" + a.loc);
    let f = fields[b].getAttribute("class");
    for (let g = 0; g < document.getElementsByClassName(f).length; g++)
      a.from && (document.getElementsByClassName(f)[g].setAttribute("from", a.from),
        document.getElementsByClassName(f)[g].setAttribute("to", a.to))
  }
  doFinalCheck(),
    resetEditor()
};
function doFinalCheck() {
  let a, b;
  for (a = 1; a <= days; a++)
    for (b = 1; b < periods; b++)
      if (1 < b) {
        const g = getPeriodTimes(a, b) ? () => {
          let h = addTimes(getPeriodTimes(a, b).to, subTimes(getPeriodTimes(a, b).to, getPeriodTimes(a, b).from));
          h ? () => {
            setPeriodTimes(a, b, getPeriodTimes(a, b).to, h)
          } : () => {
            return null
          } } : () => {
            return null
          };
        g()
      }
}
function setPeriodTimes(a, b, f, g) {
  document.getElementsByClassName("day" + a)[0].childNodes[b - 1].setAttribute("from", f),
  document.getElementsByClassName("day" + a)[0].childNodes[b - 1].setAttribute("to", g)
}
function getPeriodTimes(a, b) {
  let f = {
    from: null,
    to: null
  };
  try {
    f.from = document.getElementsByClassName("day" + a)[0].childNodes[b - 1].getAttribute("from"),
    f.to = document.getElementsByClassName("day" + a)[0].childNodes[b - 1].getAttribute("to")
  } catch (g) {
    return null;
  }
  f = f.to && f.from ? f : null;
  return f;
}
const changedays = a => {
  days = a, updateTable()
}, changeperiods = a => {
  periods = a,
  updateTable()
};
function updateTable() {
  let a = "<table>";
  for (let f, b = 0; b < days; b++) {
    f = `<tr class="day${b}">`;
    for (let g = 0; g < periods; g++)
      f += `<td onclick="editField(this)" class="period${g}">Day ${b + 1}<br><span>Period ${g + 1}</span></td>`;
    f += "</tr>",
      a += f
  }
  a += "</table>",
    document.querySelector(".tableCont").innerHTML = a
}
function exportTable() {
  let a = !1
    , b = {
      days: document.querySelector("#days").value,
      periods: document.querySelector("#periods").value,
      data: []
    };
  for (let g, f = 0; f < days; f++) {
    g = [];
    for (let k, h = 0; h < periods; h++) {
      k = document.querySelector(".day" + f).children[h];
      try {
        if (k) {
          let l = {
            name: k.querySelector("b").innerHTML,
            location: k.innerHTML.split("<br>")[1],
            from: k.getAttribute("from"),
            to: k.getAttribute("to")
          };
          g.push(l)
        }
      } catch (l) {
        if (k) {
          g.push({
            name: null,
            location: null,
            from: null,
            to: null
          }),
            a = !0
        }
      }
    }
    b.data.push(g)
  }
  a ? confirm("There are empty fields, are you sure you want to continue?") && console.log(b) : console.log(b)
}
function resetEditor() {
  for (let a in shiftHeld = !1,
    fields = [],
    field = null,
    document.querySelector("#from").innerHTML = "From",
    document.querySelector("#from").value = "",
    document.querySelector("#to").innerHTML = "To",
    document.querySelector("#to").value = "",
    document.querySelector(".getData").style.display = "none",
    document.querySelectorAll("td"))
    try {
      document.querySelectorAll("td")[a].style.background = "transparent",
        document.querySelectorAll("td")[a].style.color = "#222"
    } catch (b) { }
}
