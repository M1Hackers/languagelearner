document.addEventListener('DOMContentLoaded', function() {
    
    var button = document.getElementById("button_press_on");
    button.addEventListener("click",function(){

      chrome.tabs.executeScript(null,{file:"hilitor.js"},function(){
        chrome.tabs.executeScript(null, {file: "test.js"});
      });   
    });
});
