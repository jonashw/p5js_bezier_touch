var SceneD = new (function(){
    //VaporWave pallete from http://www.color-hex.com/color-palette/10221
    var looping = true;
    var showControlPoints = true;

    var persistantTouches = new PersistentTouches('geometry-touches');

    this.preload = () => {
        persistantTouches.init();
    };

    var shapeDrawFn = new CircularArray([
        //drawPolyLine,
        drawMesh
    ]);

    setInterval(() => {
        //shapeDrawFn.moveNext();
    }, 1000);

    this.touchStarted = () => {
        persistantTouches.save(touches);
        return false; // This is to prevent pinch-zooming on touch devices.
    };

    this.keyPressed = () => {
        if(keyCode == 17/*Ctrl*/){
            showControlPoints = !showControlPoints;
        }
    };
    this.draw = () => {
        let ts = touches.length ? touches : persistantTouches.value;
        background(1,205,254);
        if(showControlPoints){
            for(var i=0; i<ts.length; i++){
                controlPoint(ts[i]);
            }
        }
        stroke(5,255,161);
        strokeWeight(4);
        shapeDrawFn.getCurrent()(ts);
    };

    function controlPoint(p){
        //noFill();
        //strokeWeight(5);
        //stroke(255,200,200);
        fill(255,113,206);
        noStroke();
        ellipse(p.x, p.y, 50, 50);
    }

    function drawPolyLine(points){
        if(points.length < 2){
            return;
        }
        if(points.length == 2){
            drawCircleBetween(points[0], points[1]);
            return;
        }
        for(var i=0; i<points.length; i++){
            var a = points[i]; 
            var b = points[i+1];
            if(!!b){ 
                line(a.x, a.y, b.x, b.y); 
            } else if (i > 1) {
                line(a.x, a.y, points[0].x, points[0].y);
            }
        }
    }

    function drawMesh(points, noOutline){
        if(points.length < 2){
            return;
        }
        if(points.length == 2){
            drawCircleBetween(points[0], points[1]);
            return;
        }
        for(var i=0; i<points.length; i++){
            var a = points[i]; 
            for(var j=0; j<points.length; j++){
                if(i == j){ continue; }
                if(noOutline){
                    if(i == j - 1){ continue; }
                    if(i == j + 1){ continue; }
                    if(i==0 && j == points.length-1){ continue; }
                    if(j==0 && i == points.length-1){ continue; }
                }
                var b = points[j];
                line(a.x, a.y, b.x, b.y); 
            }
        }
    }

    function drawCircleBetween(a,b){
        let r = Math.sqrt(Math.pow(a.x-b.x, 2) + Math.pow(a.y-b.y, 2));
        let xMid = (a.x+b.x)/2;
        let yMid = (a.y+b.y)/2;
        //ellipse(a.x, a.y, r * 2);
        noFill();
        ellipse(xMid, yMid, r);
    }
})();