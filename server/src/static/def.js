function get_id() {
    var client = new HttpClient();
    var response = client.get('http://localhost:3000/new_user', function(response) {
        crdt_set_user_id(response);
    });
}

function get_change_log(user_id){
    var response = client.get('http://localhost:3000/get_change_log?user_id', function(response) {
        content = JSON.parse(response);
        render_text();
    });
}

function render_text() {
    text = ""
    for (index = 0; index < content['content'].length; index++) { 
        if ( !content['content'][index]['start'] && !content['content'][index]['tombstone'] ){
            text += content['content'][index]['element'];
        } 
        if(index+1 == crdt_get_cursor_pos()){
            text += '|'
        }
    }
    document.getElementById("textarea").innerHTML = text;
    return text;
}

function process_key_press(event) {
    var key = event.keyCode

    if(String.fromCharCode(key)>='A' && String.fromCharCode(key)<='Z'){
        crdt_local_append_in_crdt(key+32);
    }
    else if(key==32){
        crdt_local_append_in_crdt(key);
    }
    else if(key==8){
        crdt_backspace_key();
    }
    else if(key==37){
        crdt_left_key();
    }
    else if(key==39){
        crdt_right_key();
    }
}

function sync_local_update_commands_with_server(){
    var client = new HttpClientPost();
    var response = client.post('http://localhost:3000/send_change_log', local_update_commands, function(response) {
        crdt_clear_local_update_commands();
    });
}

function sync_remote_update_commands_with_server(){
    var client = new HttpClient();
    var response = client.get('http://localhost:3000/get_change_log?user_id='+crdt_get_user_id(), function(response) {
        var remote_commands = JSON.parse(response);
        for (var i=0 ; i<remote_commands['commands'].length ; i++){
            console.log(remote_commands['commands'][i]);
            crdt_process_remote_command(remote_commands['commands'][i]);
        }
    });
}


