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

@app.route('/new_user',methods=['GET'])
def new_users():
    return helper.register_new_user()

@app.route('/get_change_log',methods=['GET'])
def get_change_log():
    return jsonify(crdt.crdt_get_user_change_log(request.args.get('user_id')))

@app.route('/send_change_log',methods=['POST'])
def send_change_log():
    data = request.data
    helper.remote_change_log_process(data)
    return "success"



if __name__ == "__main__":
  app.run(host = '0.0.0.0', port = 3000)