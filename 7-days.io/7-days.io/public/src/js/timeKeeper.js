function addTimes(a, b) {
  let c = 0
    , d = a.split(":")
    , e = b.split(":");
  d[0] = Math.round(d[0]),
    d[1] = Math.round(d[1]),
    e[0] = Math.round(e[0]),
    e[1] = Math.round(e[1]),
    c += d[0] + e[0];
  let f = d[1] + e[1];
  for (; 60 < f;)
    c += 1,
      f -= 60;
  return c += ":" + f,
    c
}
function subTimes(a, b) {
  let c = 0
    , d = a.split(":")
    , e = b.split(":");
  d[0] = Math.round(d[0]),
    d[1] = Math.round(d[1]),
    e[0] = Math.round(e[0]),
    e[1] = Math.round(e[1]),
    c = d[0] - e[0];
  let f = d[1] - e[1];
  for (; 0 > f;)
    c -= 1,
      f += 60;
  return c += ":" + f,
    c
}
const rt = (a, b) => { return a + ":" + b }