var resultSet;
var idFinal = false;

$(document).ready(function() {
	$('#thou').click(function(){
		setID = 1026577;
		idFinal = true;
		console.log("thousand", setID);
	});
	$('#oneh').click(function(){
		setID = 207969;
		idFinal = true;
		console.log("one hundred", setID);
	});
	$('#fiveh').click(function(){
		setID = 374483;
		idFinal = true;
		console.log("five hundred", setID);
	});
    chrome.tabs.executeScript(null,{file : 'hilitor.js'});
    $('#submit').click(function() {
        setURL = $('#set_id').val(); //now this is a URL
        if (idFinal == false) {
        	setID = setURL.substring(setURL.indexOf("com/") + 4);
	        setIDarr = setID.split('/');
	        setID = setIDarr[0];
	        if (setURL == null || setURL == "") {
	            setID = 1026577;
	        }
        }
	        
        console.log(setID);
        query(setID);
    });
});

function query(setID) {
    var CLIENT_ID = 'BpQKpyTJ6W';
    var queryURL = 'https://api.quizlet.com/2.0/sets/'+setID+'/terms?client_id='+CLIENT_ID;
    // alert("doing something!")
    $.ajax({
        url: queryURL,
        success: function(data) { onResultReceived(data) }
    });
}

function onResultReceived(data)
{
    resultSet = data;

    var wordList = extractWords(resultSet);

    chrome.tabs.executeScript(null,{code: '(new Hilitor(document.body.innerText)).apply("'+JSON.stringify(wordList).slice(1,-1)+'");'},function(){
    });
}
function extractWords(termSet) {
    var count = Object.keys(termSet).length;
    var wordString = "";
    for (var i = 0; i < count; i++) {
        wordString += termSet[i]["term"] + " ";
    }

    return wordString;
}