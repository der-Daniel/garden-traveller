from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.bcrypt import Bcrypt
from flask.ext.login import LoginManager
from flask_restful import Api


app = Flask(__name__)
app.config.from_object('app.settings')
app.url_map.strict_slashes = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)


# api
api = Api(app)

from app import models, views

