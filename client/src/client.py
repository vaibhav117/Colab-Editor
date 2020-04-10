from flask import Flask, render_template , request , jsonify
import sys
import random
import string
import json

import variables
import helper
import crdt

app = Flask(__name__)


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
def new_users():
    return helper.register_new_user()

@app.route('/get_change_log',methods=['GET'])
def return_change_log():
    return jsonify(crdt.crdt_get_user_change_log(request.args.get('user_id')))




if __name__ == "__main__":
  app.run(host = '0.0.0.0', port = 3000)