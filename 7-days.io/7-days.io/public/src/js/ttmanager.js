const ttmanager = () => { document.querySelector("#editorField").style.display = "block"; }

let data = [];

let field;

function editField(block) {
  field = block;
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
  // set value of innerHTML of field to recieved data
  let data = parseData();

  field.innerHTML = "<B>" + data.name + "</B>" + "<br>" + data.loc;
  field.setAttribute("from", data.from)
  field.setAttribute("to", data.to)

  document.querySelector(".getData").style.display = "none";
}