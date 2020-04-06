window.onload = function exampleFunction() {
    var doc = document.getElementById('doc');
    doc.contentEditable = true;
    doc.focus();
    var myCookie = getCookie("user_id");
    if (myCookie == null) {
        var client = new HttpClient();
        var response = client.get('http://localhost:3000/new_user', function(response) {
            setCookie("user_id",response);
        });
    }
    
} 


document.getElementById('doc').keydown(function(event){
    
    var client = new HttpClient();
    var response = client.get('http://localhost:3000/send?key='+event.keyCode, function(response) {
        alert(event.keyCode);
    });
});


var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
}

function setCookie(name, value) {
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);  
    document.cookie = updatedCookie;
  }

  function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 