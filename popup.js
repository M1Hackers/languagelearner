const SEARCH_LIMIT = 10;
const CLIENT_ID = "BpQKpyTJ6W";
var idFinal = false;

$(document).ready(function() {
    chrome.tabs.executeScript(null,{file : 'hilitor.js'});

/*    $('#thou').click(function(){
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
	});*/

    $('#submit_hilite').click(function() {
        var setID;
        if ($('input[name="wordSet"]:checked', '#search_results').length>0) {
            setID = $('input[name=wordSet]:checked', '#search_results').attr("data-set-id");
        } else if ($('#set_id').val() !=  null) {
            var setURL = $('#set_id').val();
            var com_index = setURL.indexOf("com/") + 4;
            setID = $('#set_id').val().substring(com_index,setURL.indexOf("/",start=com_index+1));
        } else {
            setID = 1026577;
        }

        console.log(setID);
        querySet(setID);
    });

    $('#submit_search').click(function() {
        console.log("Searching:"+$("#search_terms").val());
        searchSets($("#search_terms").val(), SEARCH_LIMIT);
    });
    
    $('#reset_search').click(function () {
        $('#search_results').html('<p>Our default collection:</p>\n        <input type="radio" name="wordSet" data-set-id="207969" /><span>100 SAT Words</span><br />\n        <input type="radio" name="wordSet" data-set-id="374483" /><span>500 SAT Words</span><br />\n        <input type="radio" name="wordSet" data-set-id="1026577" /><span>1000 SAT Words</span><br />');
    });
});

function querySet(setID) {
    var queryURL = 'https://api.quizlet.com/2.0/sets/'+setID+'/terms?client_id='+CLIENT_ID;
    // alert("doing something!")
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
    var resultNo = resultObject['total_results'];
    var realLimit = resultNo == 0 ? 0 : (resultObject['total_result'] < limit ? resultNo : limit);

    for (var i = 0; i < realLimit; i++) {
        $("#search_results").append('<input type="radio" name="wordSet" data-set-id="'+setList[i]['id']+'" /><span>'+setList[i]['title']+' ('+setList[i]['term_count']+' terms)</span><br />');
    }

    $('#search_results').append('<p>Our default collection:</p>\n        <input type="radio" name="wordSet" data-set-id="207969" /><span>100 SAT Words</span><br />\n        <input type="radio" name="wordSet" data-set-id="374483" /><span>500 SAT Words</span><br />\n        <input type="radio" name="wordSet" data-set-id="1026577" /><span>1000 SAT Words</span><br />');
}