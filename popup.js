const SEARCH_LIMIT = 10;
const CLIENT_ID = "BpQKpyTJ6W";

$(document).ready(function() {
    chrome.tabs.executeScript(null,{file : 'hilitor.js'});
    $('#submit_hilite').click(function() {
        setID = $('#set_id').val();
        if (setID == null || setID == "") {
            setID = 1026577;
        }
        querySet(setID);
    });
    $('#submit_search').click(function() {
        searchSets($("#search_terms").val(), SEARCH_LIMIT);
    });
});

function querySet(setID) {
    var queryURL = 'https://api.quizlet.com/2.0/sets/'+setID+'/terms?client_id='+CLIENT_ID;

    $.ajax({
        url: queryURL,
        success: function(data) { onSetReceived(data) }
    });
}

function onSetReceived(resultSet)
{
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

function searchSets(queryString, limit) {
    var queryURL = 'https://api.quizlet.com/2.0/search/sets?client_id='+CLIENT_ID+'&q='+encodeURI(queryString);

    $.ajax({
        url: queryURL,
        success: function(data) { onSetListReceived(data, limit) }
    });
}

function onSetListReceived (resultObject, limit) {
    setList = resultObject['sets'];
    $("#search_results").empty();
    var realLimit = resultObject['total_result'] < limit ? resultObject['total_result'] : limit;

    for (var i = 0; i < realLimit; i++) {
        $("#search_results").append('<input type="radio" name="wordSet" /><span>'+setList[i]['title']+' ('+setList[i]['term_count']+' terms)</span><br />');
    }
}