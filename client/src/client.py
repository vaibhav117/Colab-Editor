from flask import Flask, render_template , request
import sys

app = Flask(__name__)

text = []

@app.route('/')
def hello():
    return render_template('texteditor.html') 

@app.route('/send',methods=['GET'])
def hello2():
  print(request.args.get('key'), file=sys.stderr)
  process(request.args.get('key'))
  return "OK"

def process(key):
  map = {'37':'left' , '39':'right' , '38':'up' , '40':'down' , '97':'a' ,'122':'z' , '8':'erase' , '32':'space'}
  if(key >= 97 && key <= 122):
    text.append(
                  {
                    "value": chr(key), 
                    "status":True,
                    ""
                  }
                )

if __name__ == "__main__":
  app.run(host = '0.0.0.0', port = 3000)