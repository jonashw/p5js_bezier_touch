var SceneC = new (function(){
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
        background(255,0,0);
        t += 0.005;
        if(t > 1){
            t = 0;
        }
        noFill();
        stroke(255);
        bezier(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        bezierDetail(5);
        let t_eased = Easing.Cubic.InOut(t);
        var x = bezierPoint(p0.x, p1.x, p2.x, p3.x, t_eased);
        var y = bezierPoint(p0.y, p1.y, p2.y, p3.y, t_eased);
        drawFatBezierPoint(x,y);
        drawControlPoint(0,p0.x, p0.y);
        drawControlPoint(1,p1.x, p1.y);
        drawControlPoint(2,p2.x, p2.y);
        drawControlPoint(3,p3.x, p3.y);
    };
    function drawFatBezierPoint(x,y){
        fill(255);
        noStroke();
        ellipse(x,y,20,20);
    }
    function drawThinBezierPoint(x,y){
        fill(255);
        noStroke();
        ellipse(x,y,2,2);
    }
    function drawControlPoint(i,x,y){
        noStroke();
        fill(255);
        ellipse(x,y,10,10);
        fill(0);
        text(i, x + 10, y + 10);
    }
})();