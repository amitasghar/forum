from datetime import datetime
from config import db, ma

class Message(db.Model):
    __tablename__ = 'message'
    message_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))
    text_entry = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class MessageSchema(ma.ModelSchema):
    class Meta:
        model = Message
        sqla_session = db.session    