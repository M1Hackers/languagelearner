var searchButton = document.getElementById("runq");
var bottom = document.getElementById("results");
searchButton.addEventListener("click", function() {
        console.log('clicked');
        login(function(accessToken) {
                var songInput = document.getElementById('main_input').value;
            getSet(accessToken,songInput);
        });
    });
    
function login(callback) {
    var CLIENT_ID = 'JeQAjdJkCQ';
    var SECRET_ID = 'XVx5fgQc8XV9gaz6pPf3qG';
    var REDIRECT_URI = 'https://qmit.tumblr.com';
    var randomstring = "fnfnfnfnf"
    
    var url = "https://quizlet.com/authorize?client_id="+CLIENT_ID+"&response_type=code&scope=read%20write_set&state="+randomstring;
    
    var width = 550,
        height = 630,
        left = (screen.width / 2) - (width / 2),
        top = (screen.height / 2) - (height / 2);
        
    
    window.addEventListener("message", function(event) {
        var hash = JSON.parse(event.data);
        if (hash.type == 'code') {
            callback(hash.code);
        }
    }, false);
    
    var w = window.open(url,
                        'Quizlet',
                        'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
                       );
    
};

function getSet(accessToken, setID) {
        var nameset = setID;
        var CLIENT_ID = 'JeQAjdJkCQ';
        $.ajax({
            url: 'https://api.quizlet.com/2.0/search/sets?q=french%20animals&client_id='+CLIENT_ID,
            success: function(response) {
                    alert(response);
            },
            headers: {
              'Authorization': 'Bearer ' + accessToken
            },
            error : function(exception){alert('Exception:'+exception);},
            dataType : "text"
        });
    };