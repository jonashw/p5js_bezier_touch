var looping = true;
var scenes = [
  SceneA,
  SceneB
];
var scene = new CircularArray(scenes);
scene.onNext.subscribe(() => console.log('moved to the previous scene:' + scene.getCurrentIndex()));
scene.onPrev.subscribe(() => console.log('moved to the next scene:' + scene.getCurrentIndex()));
var buttons = (() => {
  return [a];
})();

function executeAll(methodName){
  for(var i=0; i<scenes.length; i++){
    if(methodName in scenes[i]){
      scenes[i][methodName]();
    }
  }
}

function executeCurrent(methodName){
  let s = scene.getCurrent();
  if(methodName in s){
    s[methodName]();
  }
}

function preload(){
  executeAll('preload');
}

function setup() { 
  resizeCanvas(windowWidth, windowHeight);
  executeAll('setup');
  let p = createButton("<< Previous Sketch");
  p.position(50, 10);
  p.mousePressed(scene.movePrev);
  let n = createButton("Next Sketch >>");
  n.position(width-200, 10);
  n.mousePressed(scene.moveNext);
} 


function mousePressed(){ executeCurrent('mousePressed'); }
function mouseMoved  (){ executeCurrent('mouseMoved');   }
function touchMoved  (){ executeCurrent('touchMoved');   }

function touchStarted(){
  if(touches.length == 5){
    scene.moveNext();
  } else {
    executeCurrent('touchStarted');
  }
  return false; // This is to prevent pinch-zooming on touch devices.
}

function keyPressed(){
  switch(keyCode){
    case RIGHT_ARROW:
      scene.moveNext();
      break;
    case LEFT_ARROW:
      scene.movePrev();
      break;
    case ESCAPE:
      looping = !looping;
      if(looping){
        loop();
      } else {
        noLoop();
      }
      break;
    case ENTER:
      alert('enter')
      break;
    default:
      executeCurrent('keyPressed');
      break;
  }
}

function draw() { 
  if(!looping){
    return;
  }
  scene.getCurrent().draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  executeCurrent('windowResized');
}