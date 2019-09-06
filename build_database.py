import os
from datetime import datetime
from config import db
from models import Message

# Data to initialize database with
# Data to initialize database with
MESSAGE = [
    {"parent_id" : 0, "name": "obiwan", "text_entry": "only a master of evil"},
    {"parent_id" : 0, "name": "luke", "text_entry": "nooooooo!!!!"},
    {"parent_id" : 0, "name": "leia", "text_entry": "scruffy looking"},
    {"parent_id" : 1, "name": "leia", "text_entry": "nerf herder"},
    {"parent_id" : 1, "name": "luke", "text_entry": "here to rescue you"},
    {"parent_id" : 2, "name": "luke", "text_entry": "ben"},
]

# Delete database file if it exists currently
if os.path.exists("message.db"):
    os.remove("message.db")

# Create the database
db.create_all()

# iterate over the MESSAGE structure and populate the database
for message in MESSAGE:
    m = Message(parent_id=message.get("parent_id"),name=message.get("name"), text_entry=message.get("text_entry"))
    db.session.add(m)

db.session.commit()