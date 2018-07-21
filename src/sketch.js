var looping = true;
var scenes = [
  SceneA
];
var scene = new CircularArray(scenes);

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
} 

function mouseMoved(){ executeCurrent('mouseMoved'); }
function touchMoved(){ executeCurrent('touchMoved'); }
function mousePressed(){ executeCurrent('mousePressed'); }

function touchStarted(){
  if(touches.length == 5){
    scene.moveNext();
    console.log('moved to the next scene:' + scene.getCurrentIndex());
  } else {
    executeCurrent('touchStarted');
  }
  return false; // This is to prevent pinch-zooming on touch devices.
}

function keyPressed(){
  switch(keyCode){
    case RIGHT_ARROW:
      scene.moveNext();
      console.log('moved to the next scene:' + scene.getCurrentIndex());
      break;
    case LEFT_ARROW:
      scene.movePrev();
      console.log('moved to the previous scene:' + scene.getCurrentIndex());
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