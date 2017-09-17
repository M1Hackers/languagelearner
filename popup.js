document.addEventListener('DOMContentLoaded', function() {
alert("fnfnfnf");
    var buttonon = document.getElementById("submit");
    buttonon.addEventListener("click",function(){
        
      chrome.tabs.executeScript(null,{file:"hilitor.js"},function(){
        chrome.tabs.executeScript(null, {file: "test.js"},function());
      });   
    });
});
