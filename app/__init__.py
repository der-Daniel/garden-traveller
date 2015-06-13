from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask_restful import Api


app = Flask(__name__)
app.config.from_object('app.settings')
app.url_map.strict_slashes = False
db = SQLAlchemy(app)

# api
api = Api(app)

from app import models, views
