import datetime
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import DateTime
from app import db
from app import bcrypt
from flask.ext.login import UserMixin


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    surname = db.Column(db.String(128), nullable=False)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    _password = db.Column(db.String(128), nullable=False)

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def _set_password(self, plaintext):
        self._password = bcrypt.generate_password_hash(plaintext)

    def is_correct_password(self, plaintext):
        return bcrypt.check_password_hash(self._password, plaintext)

    address = db.Column(db.Integer, db.ForeignKey('address.id'), nullable=False)
    offerings = db.relationship('Offering', backref=db.backref('user', lazy='joined'), lazy='dynamic')
    gardens = db.relationship('Garden', backref=db.backref('garden', lazy='joined'), lazy='dynamic')



class Offering(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product = db.Column(db.String(128), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    price = db.Column(db.String(128), nullable=False)
    date = db.Column(DateTime, default=datetime.datetime.utcnow)
    garden = db.Column(db.Integer, db.ForeignKey('garden.id'), nullable=False)


class Garden(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    address = db.Column(db.Integer, db.ForeignKey('address.id'), nullable=False)
    location = db.Column(db.Integer, db.ForeignKey('location.id'), nullable=False)


class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    street = db.Column(db.String(128), nullable=False)
    zipcode = db.Column(db.String(128), nullable=False)
    house_number = db.Column(db.String(128), nullable=False)
    city = db.Column(db.String(128), nullable=False)


class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    longitude = db.Column(db.String(128), nullable=False)
    latitude = db.Column(db.String(128), nullable=False)
