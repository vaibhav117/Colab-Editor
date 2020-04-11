
document.getElementById('textarea').focus();

(function refresh_display() {
    if(crdt_get_user_id() != 'temp'){
        render_text();
    }
    setTimeout( refresh_display, 20 );
})();

(function send_update_log_to_server() {
    if(crdt_get_user_id() != 'temp'){
        sync_local_update_commands_with_server();
    }    
    setTimeout( send_update_log_to_server, 10000 );
})();

(function get_update_log_from_server() {
    if(crdt_get_user_id() != 'temp'){
        sync_remote_update_commands_with_server();
    }
    setTimeout( get_update_log_from_server, 10000 );
})();

document.addEventListener("keydown", process_key_press, false);

