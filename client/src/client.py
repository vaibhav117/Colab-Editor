from flask import Flask, render_template , request
import sys
import random
import string
import data
import json
import variables
import helper



@app.route('/')
def hello():
    return render_template('texteditor.html')

@app.route('/send',methods=['GET'])
def hello2():
  print(request.args.get('key')+' '+request.args.get('id'), file=sys.stderr)
  process(request.args.get('key'),request.args.get('id'),request.args.get('pos'))
  print (json.dumps(data),file=sys.stderr)
  return "OK"

@app.route('/new_user',methods=['GET'])
def register_new_users():
    letters = string.ascii_lowercase
    user_id = ''.join(random.choice(letters) for i in range(id_len))
    while (user_id in used_user_id):
        user_id = ''.join(random.choice(letters) for i in range(id_len))
    used_user_id.add(user_id)
    print (user_id,file=sys.stderr)
    return user_id



if __name__ == "__main__":
  app.run(host = '0.0.0.0', port = 3000)