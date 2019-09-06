from datetime import datetime
from config import db, ma
from marshmallow import fields

class Message(db.Model):
    __tablename__ = "message"
    message_id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer)
    name = db.Column(db.String(32))
    text_entry = db.Column(db.String)
    timestamp = db.Column(
        db.DateTime, default=datetime.utcnow)  

class MessageSchema(ma.ModelSchema):
    class Meta:
        model = Message
        sqla_session = db.session