var searchButton = document.getElementById("submit");
var bottom = document.getElementById("results");
var presetID = 1026577;
searchButton.addEventListener("click", function() {
        alert('clicked');
        alert(document.getElementById('main_input'));
        var resultSet = query(presetID);
        var wordList = extractWords(resultSet);
        alert(document.body.innerText);
        var myHilitor = new Hilitor(document.body.innerText);
        myHilitor.apply(wordList);
    });


function query(setID) {
    var CLIENT_ID = 'BpQKpyTJ6W';
    var queryURL = 'https://api.quizlet.com/2.0/sets/1026577?client_id='+CLIENT_ID;
    var resultSet;

    $.ajax({
        url: queryURL,
        success: function(data) {
            resultSet = JSON.stringify(data);
            alert(resultSet);
        }
    });

    return resultSet;
}

function extractWords(termSet) {
    var count = Object.keys(termSet).length;
    var wordString;
    for (var i = 0; i <= count; i++) {
        wordString += termSet[i]["term"] + " ";
    }
}