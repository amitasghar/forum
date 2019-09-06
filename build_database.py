import os
from datetime import datetime
from config import db
from models import Message

# Data to initialize database with
# Data to initialize database with
MESSAGE = [
    {"parent_id" : 0, "name": "obiwan", "text_entry": "only a master of evil", "location": "toronto", "temparature": "22", "lattitude": "11", "longtitude": "22"},
    {"parent_id" : 0, "name": "luke", "text_entry": "nooooooo!!!!", "location": "toronto", "temparature": "22", "lattitude": "11", "longtitude": "22"},
    {"parent_id" : 0, "name": "leia", "text_entry": "scruffy looking", "location": "montreal", "temparature": "22", "lattitude": "11", "longtitude": "22"},
    {"parent_id" : 1, "name": "leia", "text_entry": "nerf herder", "location": "toronto", "temparature": "22", "lattitude": "11", "longtitude": "22"},
    {"parent_id" : 1, "name": "luke", "text_entry": "here to rescue you", "location": "toronto", "temparature": "22", "lattitude": "11", "longtitude": "22"},
    {"parent_id" : 2, "name": "luke", "text_entry": "ben", "location": "toronto", "temparature": "22", "lattitude": "11", "longtitude": "22"},
]

# Delete database file if it exists currently
if os.path.exists("message.db"):
    os.remove("message.db")

# Create the database
db.create_all()

# iterate over the MESSAGE structure and populate the database
for message in MESSAGE:
    m = Message(parent_id=message.get("parent_id"),name=message.get("name"), text_entry=message.get("text_entry"), location=message.get("location"), temparature=message.get("temparature"), lattitude=message.get("lattitude"), longtitude=message.get("longtitude"))
    db.session.add(m)

db.session.commit()