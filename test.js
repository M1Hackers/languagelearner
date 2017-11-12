alert(document.body.innerText);

myHilitor = new Hilitor(document.body.innerText);

// var csvfile = "words.csv"; //later set up load up option
// // console.log("csvfile get request completed", csvfile);
// var words = ""
// $.get(csvfile, function(data) {
//     csvdata = papaparse.parse(data);
//     console.log(csvdata);
//    	for (var i; i<=len(csvdata); i++) {
//    		words += csvdata[i]
//    	}
//    	console.log(words)
// });
var words = ""


    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', '/wordy.txt');
    rawFile.onreadystatechange = function ()
    {
    	alert(rawFile.responseText);

        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                arr = allText.split(",");
                for (var i = 0; i<arr.length; i++){
                	words += i;
                }
                alert(allText, words);
            }
        }
    }
    rawFile.send();


// readTextFile("wordy.txt");


myHilitor.apply('a the script');