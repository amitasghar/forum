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

def create(post):
    """
    This function creates a new post in the forum
    :param post:  post containing user name and message
    :return:        201 on success
    """
    #name = "default_user" # hardcode user name for now
    #text = post.get("text_entry")

    # Create a message instance using the schema and the passed in post
    schema = MessageSchema()
    new_post = schema.load(post, session=db.session)

    # Add the post to the database
    db.session.add(new_post)
    db.session.commit()

    # Serialize and return the newly created post in the response
    data = schema.dump(new_post)

    return data, 201

def echo(word):
    return {'msg': word}, 200    

def health():
    return {'msg': 'ok'}, 200    