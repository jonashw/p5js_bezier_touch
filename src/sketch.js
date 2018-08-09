var looping = true;
var scenes = [
  SceneA,
  SceneD,
  SceneB,
  SceneC
];
var scene = new CircularArray(scenes);
scene.onPrev.subscribe(() => console.log('moved to the prev scene:' + scene.getCurrentIndex()));
scene.onNext.subscribe(() => console.log('moved to the next scene:' + scene.getCurrentIndex()));

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
    var hammer = new Hammer.Manager(document.body, {
      recognizers: [
        [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
      ]
    });

    hammer.on('swiperight',function(e){
      scene.movePrev();
    })
    hammer.on('swipeleft',function(e){
      scene.moveNext();
    })
    
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
  executeCurrent('touchStarted');
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