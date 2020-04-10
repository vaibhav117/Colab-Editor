function get_id() {
    var client = new HttpClient();
    var response = client.get('http://localhost:3000/new_user', function(response) {
        crdt_set_user_id(response);
    });
}

function get_change_log(user_id){
    var response = client.get('http://localhost:3000/get_change_log?user_id', function(response) {
        console.log(JSON.parse(response));
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
    console.log(text);
    return text;
}

function process_key_press(event) {
    var key = event.keyCode
    if(String.fromCharCode(key)>='A' && String.fromCharCode(key)<='Z'){
        crdt_local_append_in_crdt(key+32);
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
    var response = client.get('http://localhost:3000/get_change_log?user_id', function(response) {
        console.log(JSON.parse(response));
        content = JSON.parse(response);
        render_text();
    });
}


