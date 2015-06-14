from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask.ext.bcrypt import Bcrypt
from flask.ext.login import LoginManager
from flask.ext.cors import CORS

app = Flask(__name__)
CORS(app, resources=r'/api/*', allow_headers='Content-Type')
app.config.from_object('app.settings')
app.url_map.strict_slashes = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# api
api = Api(app)

from app import models, views

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "signin"


@login_manager.user_loader
def load_user(userid):
    return models.User.query.filter(models.User.id == userid).first()
