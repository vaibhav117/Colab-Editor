import sys
import random
import string
import json

import variables

def crdt_get_user_change_log(user_id):
    print (user_id,file=sys.stderr)
    print (variables.change_log_user_tracker,file=sys.stderr)
    iterator = variables.change_log_user_tracker[user_id]
    user_change_log = []
    print (iterator,file=sys.stderr)
    print (variables.change_log,file=sys.stderr)
    while iterator < (len(variables.change_log['commands'])-1):
        print (iterator,file=sys.stderr)
        iterator+=1
        user_change_log.append(variables.change_log['commands'][iterator])
        
    variables.change_log_user_tracker[user_id] = iterator
    return {'commands':user_change_log}

def crdt_init_user(user_id):
    variables.change_log_user_tracker[user_id] = -1

def crdt_append_to_change_log(command):
    variables.change_log['commands'].append(command)

    
