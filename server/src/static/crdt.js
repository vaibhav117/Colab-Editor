// --------------------------------------------- CRDT MAIN FUNCTIONS
function crdt_local_append_in_crdt(key){
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
    console.log(element);
    crdt_insert_element_in_content(new_element_pos,element);
    crdt_insert_local_update_commands(key,new_element_id,new_element_count,left_element);
    crdt_increment_cursor_pos();
    crdt_increment_count();
}

function crdt_remote_append_in_crdt(char,left_id,left_count,id,count){
    if(id==crdt_get_user_id())
        return;
    var pos = 0;
    var new_element = {
        'element'   : char,
        'tombstone' : false,
        'start'     : false,
        'id'        : id,
        'count'     : count
    }
    while(pos<content['content'].length){
        var element = crdt_get_element(pos);
        if( element['id']==left_id && element['count']==left_count ){
            pos++;
            while( (pos<content['content'].length) && crdt_compare_count_id(id,count,crdt_get_element(pos)['id'],crdt_get_element(pos)['count']) ) {
                pos++;
            }
            crdt_insert_element_in_content(pos,new_element);
            crdt_check_count_for_max(count);
            console.log('insert '+char+' at '+pos);
            if(pos<=crdt_get_cursor_pos())
                crdt_move_cursor_right();
            break;
        }
        else{
            pos++;
        }   
    }
}

function crdt_backspace_key() {
    var element_pos = crdt_get_cursor_pos();
    var left_element=crdt_get_element(element_pos-1);
    if(element_pos>1){
        crdt_remove_element_from_content(left_element['id'],left_element['count']);
        crdt_remove_local_update_commands(crdt_get_element(element_pos-1));
        crdt_move_cursor_left();
    }
}

function crdt_left_key(){
    crdt_move_cursor_left();
}

function crdt_right_key(){
    crdt_move_cursor_right();
}

function crdt_process_remote_command(command) {
    if( command['event'] == "Add" ){
        crdt_remote_append_in_crdt(command['element'],command['left_id'],command['left_count'],command['id'],command['count'])
    }
    else if( command['event'] == "Remove" ){
        crdt_remove_element_from_content(command['id'],command['count']);
    }
}

// true response means we have to shift right
function crdt_compare_count_id(new_id,new_count,old_id,old_count){
    if(new_count<old_count){
        return true;
    }
    else if (new_count==old_count){
        if(new_id<old_id)
            return true;
        else 
            return false;
    }
    else 
        return false;
}


// --------------------------------------------- CRDT UPDATE COMMAND FUNCTIONS
function crdt_clear_local_update_commands(){
    local_update_commands['commands'] = []
}

function crdt_get_local_update_pos(){
    return local_update_pointer_pos;
}

function crdt_update_local_uupdate_pos(val){
    local_update_pointer_pos = val;
}

function crdt_get_local_update_commands(){
    var events = [];
    iterator = crdt_get_local_update_pos();
    while(iterator<(local_update_commands['commands'].length-1))
    {
        iterator++;
        events.push(local_update_commands['commands'][iterator]);
    }
    crdt_update_local_uupdate_pos(iterator);
    return events;
}



// --------------------------------------------- CRDT ELEMENT FUNCTIONS
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

function crdt_remove_element_from_content(id,count){
    for (var i=0 ; i<content['content'].length ; i++){
        if( content['content'][i]['id']==id && content['content'][i]['count']==count ){
            content['content'][i]['tombstone'] = true;
        }
    }
}

function crdt_remove_local_update_commands(element){
    local_update_commands['commands'].push({
        'event' : "Remove",
        'id'    : element['id'],
        'count' : element['count']
    });
}

function crdt_get_content_len(){
    return content['content'].length
}

// --------------------------------------------- USER-ID FUNCTIONS
function crdt_set_user_id(val){
    user_id=val;
}

function crdt_get_user_id(){
    return user_id;
}


// --------------------------------------------- CUSRSOR FUNCTIONS
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


// --------------------------------------------- COUNTER FUNCTIONS
function crdt_set_count(val) {
    count=val;
}

function crdt_increment_count(){
    count++;
}

function crdt_get_count() {
    return count;
}

function crdt_check_count_for_max(val) {
    if( crdt_get_count() <= val){
        crdt_set_count(val+1);
    }
}


