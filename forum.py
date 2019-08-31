# 3rd party modules
from flask import make_response, abort
from config import db
from models import Message, MessageSchema

def read_all():
    """
    This function responds to a request for /api/message
    with the complete lists of messages
    :return:        json string of list of messages
    """
    # Create the list of people from our data
    message = Message.query.order_by(Message.name).all()

    # Serialize the data for the response
    message_schema = MessageSchema(many=True)
    data = message_schema.dump(message)
    return data

def echo(word):
    return {'msg': word}, 200    

def health():
    return {'msg': 'ok'}, 200    