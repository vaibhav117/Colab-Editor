def process(key_code,user_id,pos):
  # Backspace
  if (int(key_code) == ord('\b')):
    backspace()
  elif (chr(int(key_code)+32)>='a' and chr(int(key_code)+32)<='z'):
    insert(chr(int(key_code)+32),int(user_id))


def backspace():
  print ('backspace',file=sys.stderr)

def insert(key,user_id):
  element = {
        'element':key,
        'tombstone':False,
        'start':False,
        'id':user_id,
        'pos':pos
      }
  data['content'].append(element)
  print (key+' '+user_id,file=sys.stderr)