
document.getElementById('textarea').focus();

(function refresh_display() {
    // your code
    render_text();

    setTimeout( refresh_display, 500 );
})();

(function send_to_server() {
    // your code
    sync_local_update_commands_with_server();

    setTimeout( send_to_server, 500 );
})();

document.addEventListener("keydown", process_key_press, false);


// document.getElementById("content").onkeydown = function(event){
//     id = get_id();
//     var client = new HttpClient();
//     alert(event.keyCode);
//     // var response = client.get('http://localhost:3000/send?key='+event.keyCode+'&'+'id='+user_id+'&'+'pos='+pos, function(response) {
//     //     alert(event.keyCode);
//     // });
// };
