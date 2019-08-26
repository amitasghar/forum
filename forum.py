# 3rd party modules
from flask import make_response, abort

def echo(word):
    return {'msg': word}, 200    

def health():
    return {'msg': 'ok'}, 200    