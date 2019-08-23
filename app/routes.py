
from flask import render_template
from app import app

@app.route('/')
@app.route('/hello')
def hello():
  return 'hello world'

#echo a word
@app.route('/echo/<word>')
def show_user(word):  
  return 'Word is: %s' % word