function get_id() {
    var client = new HttpClient();
    var response = client.get('http://localhost:3000/new_user', function(response) {
        return response;
    });
}

function get_state(user_id){
    var client = new HttpClient();
    var response = client.get('http://localhost:3000/new_user', function(response) {
        return response;
    });
}



