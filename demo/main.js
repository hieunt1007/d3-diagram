var arr = [{
  id: 1,
  name: 'Chẳng cho mình là lãng tử, đã đi được mấy đâuChẳng cho mình là lãng tử, đã đi được mấy đâu'
}, {
  id: 2,
  name: 'aasd asd ad ad a'
}, {
  id: 3,
  name: 'asd asdasdasda das dsad asdasdwdas dasdsad '
}, {
  id: 4,
  name: 'asd asdasdasda das dsad asd aasda sdfw fwef efwefw wef fwe fwe w'
}];
var arr1 = [{source: 1, target: 2}, {source: 1, target: 3}, {source: 1, target: 4}];
d3Diagram.init({
  target: '#container',
  style: {
    node: {
      autoWrapText: false,
      shape: 'circle',
      radiusX: 70,
      radiusY: 50,
      margin: 30
    },
    line: {
      lineStyle: 'bezier'
    }
  }
}, arr, arr1);