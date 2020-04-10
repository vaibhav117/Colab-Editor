import sys
import random
import string
import json

import variables
import crdt

def register_new_user():
  letters = string.ascii_lowercase
  user_id = ''.join(random.choice(letters) for i in range(variables.id_len))
  while (user_id in variables.used_user_id):
    user_id = ''.join(random.choice(letters) for i in range(variables.id_len))
    used_user_id.add(variables.user_id)
  crdt.crdt_init_user(user_id)
  print (user_id,file=sys.stderr)
  return user_id

