var looping = true;
var showControlPoints = true;

var persistantTouches = new (function(){
  var _key = 'touches';
  this.value = [];
  this.init = function(){
    this.value = JSON.parse(localStorage.getItem(_key) || "[]");
  },
  this.save = function(ts){
    this.value.length = 0;
    for(var i=0; i<ts.length; i++){
      this.value[i] = ts[i];
    }
    localStorage.setItem(_key,JSON.stringify(this.value));
  }
})();

function preload(){
  persistantTouches.init();
}

function setup() { 
  //colorMode(HSL,255);
  resizeCanvas(windowWidth, windowHeight);
} 

function mouseMoved(){  }
function touchMoved(){  }

function touchStarted(){
  // use 5+ fingers to clear all points;
  persistantTouches.save(touches.length <= 4 ? touches : []);
  return false; // This is to prevent pinch-zooming on touch devices.
}

function mousePressed(){
  point(createVector(mouseX,mouseY));
}

function keyPressed(){
  if(keyCode == 17/*Ctrl*/){
    showControlPoints = !showControlPoints;
  }
  if(keyCode == ESCAPE){
    looping = !looping;
    if(looping){
      loop();
    } else {
      noLoop();
    }
  }
}

function draw() { 
  background(204,204,204);

  var ts = persistantTouches.value;
  let p0 = ts[0];
  let p1 = ts[1];
  let p2 = ts[2];
  let p3 = ts[3];
  noStroke();
  switch(ts.length){
    case 1://point
      break;
    case 2://linear
      if(showControlPoints){ drawPolyLine(p0, p1); }
      fill(34,177,76);
      Bezier.linear(p0, p1, bezPoint);
      break;
    case 3://quadratic
      if(showControlPoints){ drawPolyLine(p0, p1, p2); }
      fill(255,0,0);
      Bezier.quadratic(p0, p1, p2, bezPoint);
      break;
    case 4://cubic
      if(showControlPoints){ drawPolyLine(p0, p1, p2, p3); }
      fill(0,162,232);
      Bezier.cubic(p0, p1, p2, p3, bezPoint);
      break;
  }
  if(showControlPoints){
    for(var i=0; i<ts.length; i++){
      controlPoint(ts[i]);
    }
  }
}

function drawPolyLine(/*use this as you would a `params Vector2[] lines` argument in C# */){
  stroke(0);
  strokeWeight(2);
  var lastPoint;
  for(var i=0; i<arguments.length; i++){
    var point = arguments[i]; 
    if(!!lastPoint){
      line(lastPoint.x, lastPoint.y, point.x, point.y);
    }
    lastPoint = point;
  }
}

function bezPoint(x,y){
  noStroke();
  ellipse(x,y,20,20);
}

function controlPoint(p){
    noFill();
    strokeWeight(3);
    stroke(255);
    ellipse(p.x, p.y, 50, 50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}