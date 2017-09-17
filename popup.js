document.addEventListener('DOMContentLoaded', function() {
    
    var button = document.getElementById("submit");
    button.addEventListener("click",function(){

      chrome.tabs.executeScript(null,{file:"hilitor.js"},function(){
        chrome.tabs.executeScript(null, {file: "test.js"});
      });   
    });
});
