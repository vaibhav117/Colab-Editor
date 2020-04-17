var user_id = "temp";
var count = 1;
var cursor_pos = 1;
var local_update_pointer_pos = -1;
var host_server_ip = "${HOST_IP}";
var cursor_state = false;
var content = {
    'content':[
        {
            'element'   :'[',
            'tombstone' :true,
            'start'     :true,
            'id'        :'aaaaaaaaaa',
            'count'     :0
        }
    ]
};

var local_update_commands = {
    'commands' : []
};

var text = ""

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

var HttpClientPost = function() {
    this.post = function(aUrl, data, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "POST", aUrl, true );            
        anHttpRequest.send( JSON.stringify(data) );
    }
}
