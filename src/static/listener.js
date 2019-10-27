document.getElementById("content").onkeydown = function(event){
    
    var client = new HttpClient();
    client.get('http://localhost:3000/send'+event.keyCode, function(response) {
        alert(event.keyCode);
    });
};


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