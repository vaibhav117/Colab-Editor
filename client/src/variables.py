app = Flask(__name__)

data = {
    'content':[
      {
        'element':'[',
        'tombstone':False,
        'start':True,
        'id':'aaa',
        'pos':0
      }
    ]
  }

used_user_id = set([])
id_len = 10