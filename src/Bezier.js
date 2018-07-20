var Bezier = (() => {
    /* The use of callbacks in this module is for better performance.
    ** By sending the x and y primitives as arguments to the callback,
    ** we avoid creating and returning an object in a tight loop. 
    ** Read: memory leak. */
    //Reference: https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Specific_cases
    function q(t,p0,p1,p2,callback){
        let t2 = t*t;
        let p0c = 1-2*t+t2;
        let p1c = 2*(t-t2);
        let p2c = t2;
        let x = (p0c * p0.x) + (p1c * p1.x) + (p2c * p2.x);
        let y = (p0c * p0.y) + (p1c * p1.y) + (p2c * p2.y);
        callback(x,y);
    }
    function c(t,p0,p1,p2,p3,callback){
        let t2 = t*t;
        let t3 = t*t*t;
        let p0c = (1 - 3*t + 3*t2 - t3);
        let p1c = 3*(t - 2*t2 + t3);
        let p2c = 3*(t2 - t3);
        let p3c = t3;
        let x = (p0c * p0.x) + (p1c * p1.x) + (p2c * p2.x) + (p3c * p3.x);
        let y = (p0c * p0.y) + (p1c * p1.y) + (p2c * p2.y) + (p3c * p3.y);
        callback(x,y);
    }
    return {
        step: 0.005,
        linear: (p0,p1) => {
            line(p0.x, p0.y, p1.x, p1.y);
        },
        quadraticEase: q,
        quadratic: function(p0,p1,p2,callback) {
            for(var t=0; t<1; t+=Bezier.step){
                q(t,p0,p1,p2,callback);
            }
        },
        cubicEase: c,
        cubic: function(p0,p1,p2,p3,callback) {
            for(var t=0; t<1; t+=Bezier.step){
                c(t,p0,p1,p2,p3,callback);
            }
        }
    };
})();
