
var mystr = '^ab';
var pos = new Point(140, 40);
var dt = [
  [[0, 0], '^'],
  [[-60, 70], 'a'],
  [[50, 80], 'b'],
  [[-90, 170], 'aa'],
  [[-10, 170], 'ab'],
];
var el = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
];
var fail = [-1, 0, 0, 1, 2];
var ref = [0, -1, 1, -1, 1];
var starty = 50, startx = 20;
var len = 80;
var start = new Point(startx, starty);

createNode = function(cen, c) {
  var md = new Point(cen);
  var rad = 30;
  var eps = new Point(0, 10);
  var path = new Path.Circle(md, 30);
  path.style = {
    strokeColor: 'black',
    strokeWidth: 4,
  };
  var text = new PointText({
    point: md+eps,
    content: c,
    justification: 'center',
    fontSize: 40,
    fillColor: 'blue',
  });
  return path;
};

drawEdge = function(s, e) {
  var rad = 30;
  var dt = e - s;
  dt.length = rad;
  var path = new Path();
  path.add(s + dt, e - dt);
  path.style = {
    strokeWidth: 2,
    strokeColor: 'black',
  };
  return path;
}

createArrow = function(s, md, e) {
  console.log(s, e);
  var rad = 30;
  var path = new Path();
  path.style = {
    strokeColor: 'black',
    strokeWidth: 2,
  };
  path.add(s);
  path.curveTo(md, e);
  var fs = path.firstSegment;
  var ls = path.lastSegment;
  var d1 = fs.handleOut.clone();
  d1.length = rad;
  fs.point += d1;
  var d2 = fs.handleIn.clone();
  ls.point += d1;
  
  var arr = new Path();
  arr.style = {
    fillColor: 'black',
  };
  var df = ls.handleIn.clone();
  df.angle += 12;
  df.length = 25;
  arr.add(ls.point + df);
  arr.add(ls.point);
  df.angle -= 24;
  arr.add(ls.point + df);
  arr.closed = true;
  return path;
}

for(var i=0; i<dt.length; i++) {
  console.log(pos);
  createNode(new Point(dt[i][0]) + pos, dt[i][1]);
}

for(var i=0; i<el.length; i++) {
  var u = el[i][0], v = el[i][1];
  drawEdge(new Point(dt[u][0]) + pos, new Point(dt[v][0]) + pos);
}

for(var i=1; i<dt.length; i++) {
  var f = fail[i];
  var ps = new Point(dt[i][0]) + pos;
  var pe = new Point(dt[f][0]) + pos;
  var md = (ps + pe) / 2;
  var d = pe - ps;
  d.angle += 90 * ref[i];
  d.length = 40;
  md += d;
  createArrow(ps, md, pe);
}
