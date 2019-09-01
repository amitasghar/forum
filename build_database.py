import os
from config import db
from models import Message

# Data to initialize database with
MESSAGE = [
    {"name": "obiwan", "text_entry": "only a master of evil"},
    {"name": "luke", "text_entry": "nooooooo!!!!"},
    {"name": "leia", "text_entry": "scruffy looking"},
]

# Delete database file if it exists currently
if os.path.exists("message.db"):
    os.remove("message.db")

# Create the database
db.create_all()

# iterate over the MESSAGE structure and populate the database
for message in MESSAGE:
    m = Message(name=message.get("name"), text_entry=message.get("text_entry"))
    db.session.add(m)

db.session.commit()