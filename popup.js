document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById("button_press_on");
    var b = document.body;
    button.addEventListener("click",function(){
        myHilitor = new Hilitor(b);
        myHilitor.apply("a the");
    });
});
