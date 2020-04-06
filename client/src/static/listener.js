

document.getElementById("content").onkeydown = function(event){
    id = get_id();
    var client = new HttpClient();
    var response = client.get('http://localhost:3000/send?key='+event.keyCode+'&'+'id='+user_id+'&'+'pos='+pos, function(response) {
        alert(event.keyCode);
    });
};
