document.addEventListener('DOMContentLoaded', function() {
    
    var buttonon = document.getElementById("button_press_on");
    buttonon.addEventListener("click",function(){

      chrome.tabs.executeScript(null,{file:"hilitor.js"},function(){
        chrome.tabs.executeScript(null, {file: "quizlet.js"},function());
      });   
    });
});
