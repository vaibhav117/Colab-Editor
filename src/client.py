from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('texteditor.html') 

@app.route('/send',methods=['GET'])
def hello2():
  map = {'37':'left' , '39':'right' , '38':'up' , '40':'down' , '65':'a' ,'90':'z' , '8':'erase' , '32':'space'}
  print('call received')
  print(request.headers)
  return 1

if __name__ == "__main__":
  app.run(host = '0.0.0.0', port = 3000)