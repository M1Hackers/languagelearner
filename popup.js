
chrome.browserAction.onClicked.addListener(function(tab) {
	document.addEventListener('DOMContentLoaded', function() {
    		myHilitor = new Hilitor("content");
    		myHilitor.apply("a the");
    		//js crap
		});
});