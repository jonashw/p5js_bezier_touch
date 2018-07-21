var SceneB = new (function(){
    var t = 0;
    var p0, p1, p2, p3;
    this.preload = () => {
        p0 = createVector(50,50);
        p1 = createVector(50,400);
        p2 = createVector(500,50);
        p3 = createVector(500,400);
    };
    this.touchStarted = () => {
    };
    this.keyPressed = () => {
    };
    this.draw = () => { 
        background(255,255,0);
        t += 0.01;
        if(t > 1){
            t = 0;
        }
        Bezier.cubicEase(t,p0, p1, p2, p3, drawFatBezierPoint);
        Bezier.cubic(p0, p1, p2, p3, drawThinBezierPoint);
        drawControlPoint(0,p0.x, p0.y);
        drawControlPoint(1,p1.x, p1.y);
        drawControlPoint(2,p2.x, p2.y);
        drawControlPoint(3,p3.x, p3.y);
    };
    function drawFatBezierPoint(x,y){
        fill(0);
        ellipse(x,y,20,20);
    }
    function drawThinBezierPoint(x,y){
        fill(0);
        ellipse(x,y,2,2);
    }
    function drawControlPoint(i,x,y){
        fill(255);
        ellipse(x,y,10,10);
        fill(0);
        text(i, x + 10, y + 10);
    }
})();