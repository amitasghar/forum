![Roteit](roteit.JPG)

# Roteit
A forum where you can post and reply to comments. Location/weather is captured along with comments.

A REST API implemented with python flask framework 


## Install libraries

Connexion module allows a Python program to use the Swagger specification
```
pip install connexion
```
Add SQLAlchemy for ORM and Marshmallow for serialzation of Python objects
```
pip install Flask-SQLAlchemy flask-marshmallow marshmallow-sqlalchemy marshmallow
```

#### downgrade SQLALchemy 
```
pip show Flask-SQLAlchemy
pip uninstall Flask-SQLAlchemy
pip install Flask-SQLAlchemy==2.1
pip show Flask-SQLAlchemy
```

#### weather API library
```
pip install pyowm
```
Documentation - https://pyowm.readthedocs.io/en/latest/usage-examples-v2/weather-api-usage-examples.html

#### Add support for adhoc certificates to enable https
```
pip install pyopenssl
```
## Running on local

After all libs have been installed
```
python build_database.py
run 
```
## Documentation
Swagger docs for API:
http://localhost:5000/api/ui/

## Testing

runtests.bat - execute Cypress test

(Unit tests using pytest were removed in favour of Cypress - Reason: since we are using SQLAlchemy for ORM, Integration tests make more sense)
