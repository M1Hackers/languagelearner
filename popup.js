var resultSet;

$(document).ready(function() {
    chrome.tabs.executeScript(null,{file : 'hilitor.js'});
    $('#submit').click(function() {
        setID = $('#set_id').val();
        if (setID == null || setID == "") {
            setID = 1026577;
        }
        query(setID);
    });
});

function query(setID) {
    var CLIENT_ID = 'BpQKpyTJ6W';
    var queryURL = 'https://api.quizlet.com/2.0/sets/'+setID+'/terms?client_id='+CLIENT_ID;

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