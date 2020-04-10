// CRDT MAIN FUNCTIONS
function crdt_local_append_in_crdt(key){
    console.log(content);
    console.log('cursor_pos:'+crdt_get_cursor_pos());
    var new_element_count = crdt_get_count();
    var new_element_id    = crdt_get_user_id();
    var new_element_pos   = crdt_get_cursor_pos();
    var left_element      = crdt_get_element(new_element_pos-1);

    var element = {
        'element'   : String.fromCharCode(key),
        'tombstone' : false,
        'start'     : false,
        'id'        : new_element_id,
        'count'     : new_element_count
    };
    
    crdt_insert_element_in_content(new_element_pos,element);
    crdt_insert_local_update_commands(new_element_pos,key,new_element_id,new_element_count,left_element);
    crdt_increment_cursor_pos();
    crdt_increment_count();
}

function crdt_backspace_key() {
    console.log(content);
    console.log('cursor_pos:'+crdt_get_cursor_pos());
    var element_pos = crdt_get_cursor_pos();
    var left_element=crdt_get_element(element_pos-1);
    if(element_pos>1){
        crdt_remove_element_from_content(element_pos-1);
        crdt_remove_local_update_commands(crdt_get_element(element_pos-1));
        crdt_move_cursor_left();
    }
}

function crdt_left_key(){
    console.log(content);
    console.log('cursor_pos:'+crdt_get_cursor_pos());
    crdt_move_cursor_left();
}

function crdt_right_key(){
    console.log(content);
    console.log('cursor_pos:'+crdt_get_cursor_pos());
    crdt_move_cursor_right();
}


// CRDT ELEMENT FUNCTIONS
function crdt_insert_element_in_content(pos,element) {
    content['content'].splice(pos,0,element);
}

function crdt_insert_local_update_commands(key,new_element_id,new_element_count,left_element){
    local_update_commands['commands'].push({
        'event'     : "Add",
        'element'   : String.fromCharCode(key),
        'left_id'   : left_element['id'],
        'left_count': left_element['count'],
        'id'        : new_element_id,
        'count'     : new_element_count
    });
}

function crdt_get_element(pos) {
    return content['content'][pos];
}

function crdt_remove_element_from_content(pos){
    content['content'][pos]['tombstone'] = true;
}

function crdt_remove_local_update_commands(element){
    console.log(element);
    local_update_commands['commands'].push({
        'event' : "Remove",
        'id'    : element['id'],
        'count' : element['count']
    });
}

function crdt_get_content_len(){
    return content['content'].length
}

// USER-ID FUNCTIONS
function crdt_set_user_id(val){
    user_id=val;
}

function crdt_get_user_id(){
    return user_id;
}


// CUSRSOR FUNCTIONS
function crdt_increment_cursor_pos(){
    cursor_pos++;
}

function crdt_decrement_cursor_pos(){
    cursor_pos--;
}

function crdt_get_cursor_pos(){
    return cursor_pos;
}

function crdt_move_cursor_left(){
    var pos = crdt_get_cursor_pos();
    if(pos>1){
        crdt_decrement_cursor_pos();
    }
    pos = crdt_get_cursor_pos();
    while(pos>1 && crdt_get_element(pos-1)['tombstone']==true){
        crdt_decrement_cursor_pos();
        pos = crdt_get_cursor_pos();
    }
}

function crdt_move_cursor_right(){
    var pos = crdt_get_cursor_pos();
    if(pos<(crdt_get_content_len())){
        crdt_increment_cursor_pos();
    }
    pos = crdt_get_cursor_pos();
    while(pos<(crdt_get_content_len()) && crdt_get_element(pos)['tombstone']==true){
        crdt_increment_cursor_pos();
        pos = crdt_get_cursor_pos();
    }
}


// COUNTER FUNCTIONS
function crdt_set_count(val) {
    count=val;
}

function crdt_increment_count(){
    count++;
}

function crdt_get_count() {
    return count;
}

