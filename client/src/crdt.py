import sys
import random
import string
import json

import variables

def crdt_get_user_change_log(user_id):
    iterator = variables.change_log_user_tracker[user_id]
    user_change_log = []
    while iterator < length(change_log)-1:
        user_change_log.append(change_log[iterator])
        iterator+=1
    return {'commands':user_change_log}

def crdt_init_user(user_id):
    variables.change_log_user_tracker[user_id] = -1