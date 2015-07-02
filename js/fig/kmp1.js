
var mystr = '^abaab';
var fail = [-1, 0, 0, 1, 1, 2];
var starty = 50, startx = 20;
var len = 80;
var start = new Point(startx, starty);

createRec = function(s, e, c) {
  var hwd = 16;
  var rec = new Rectangle(s, e);
  var eps = new Point(0, 10);
  var md = (s + e) / 2 + eps;
  var path = new Path.Rectangle(rec);
  path.style = {
    strokeColor: 'black',
    strokeWidth: 4,
  };
  var text = new PointText({
    point: md,
    content: c,
    justification: 'center',
    fontSize: 40,
    fillColor: 'blue',
  });
  return path;
};

createArrow = function(s, e) {
  console.log(s, e);
  var del = Math.abs(s.x - e.x) * 0.17;
  var upd = new Point(0, -del);
  var md = (s + e)/2 + upd;
  var path = new Path();
  path.style = {
    strokeColor: 'black',
    strokeWidth: 2,
  };
  path.add(s);
  path.curveTo(md, e);
  var ls = path.lastSegment;
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

for(var i=0; i<mystr.length; i++) {
  createRec(new Point(startx+i*len, starty),
      new Point(startx+i*len+len, starty+len), mystr[i]);
  if( i > 0 ) {
    var cur = createArrow(new Point(startx+i*len+len/2, starty),
        new Point(startx+fail[i]*len+len/2, starty));
    console.log(cur.segments);
  }
}
