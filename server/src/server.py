from flask import Flask, render_template , request
import sys
import random
import string

app = Flask(__name__)

used_user_id = set([]) 


@app.route('/new_user',methods=['GET'])
def register_new_users():
    id = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 10)) 
    while (id in used_user_id):
        id = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 10))
    used_user_id.add(id)
    return id



@app.route('/')
def hello():
    print (used_user_id,file=sys.stderr)
    return "succcess"

if __name__ == "__main__":
  app.run(host = '0.0.0.0', port = 3000)