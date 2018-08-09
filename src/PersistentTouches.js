function PersistentTouches(_key){
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
}