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
  stroke(0);
  strokeWeight(1);
  switch(ts.length){
    case 1://point
      break;
    case 2://linear
      if(showControlPoints){
        line(p0.x, p0.y, p1.x, p1.y);
      }
      stroke(34,177,76);
      strokeWeight(20);
      Bezier.linear(p0, p1);
      break;
    case 3://quadratic
      if(showControlPoints){
        line(p0.x, p0.y, p1.x, p1.y);
        line(p1.x, p1.y, p2.x, p2.y);
      }
      stroke(255,0,0);
      strokeWeight(20);
      Bezier.quadratic(p0, p1, p2, bezPoint);
      break;
    case 4://cubic
      if(showControlPoints){
        line(p0.x, p0.y, p1.x, p1.y);
        line(p1.x, p1.y, p2.x, p2.y);
        line(p2.x, p2.y, p3.x, p3.y);
      }
      stroke(0,162,232);
      strokeWeight(20);
      Bezier.cubic(p0, p1, p2, p3, bezPoint);
      break;
  }
  if(showControlPoints){
    for(var i=0; i<ts.length; i++){
      controlPoint(ts[i]);
    }
  }
}

function bezPoint(x,y){
  ellipse(x,y,5,5);
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