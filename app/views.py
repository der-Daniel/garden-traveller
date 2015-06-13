import os
from app import app, db, models
from flask import render_template, redirect, url_for, request, Response
from flask import make_response, abort
from flask import jsonify
from flask import flash
from flask import jsonify
from flask.ext.login import login_user, logout_user
from flask.ext.login import login_required, current_user

from flask_restful import Resource
from flask_restful import reqparse
from app import api


loginParser = reqparse.RequestParser()
loginParser.add_argument('email', type=str, required=True,
                            help='Email address')
loginParser.add_argument('password', type=str, required=True,
                            help='password')


signupParser = reqparse.RequestParser()
signupParser.add_argument('surname', type=str, required=True,
                            help='Your surname')
signupParser.add_argument('name', type=str, required=True,
                                help='Your name')
signupParser.add_argument('email', type=str, required=True,
                            help='Email address')
signupParser.add_argument('password', type=str, required=True,
                            help='password')
signupParser.add_argument('street', type=str, help='Street', required=True)
signupParser.add_argument('houseNumber', type=str, help='House number', required=True)
signupParser.add_argument('zipCode', type=str, help='Zip code', required=True)
signupParser.add_argument('city', type=str, help='City', required=True)

class Offering(Resource):
    decorators = [login_required]

    def get(self, id):
        offering = models.Offering.query.get(id)
        if offering is None:
            return {'success': False, 'message': 'Offering not found!'}
        result = {
            'success': True,
            'product': offering.product,
            'amount': offering.amount,
            'price': offering.price
        }
        return result


api.add_resource(Offering, '/api/offering/<string:id>')
# api.add_resource(Logout, '/api/logout')

@app.route('/api/signup', methods = ['POST'])
def signup():
    args = signupParser.parse_args()
    user = models.User.query.filter_by(email=args['email']).first()
    if user is not None:
        print('FAIL: USER ALREADY REGISTERED')
        return {'success': False}

    address = models.Address(
        street=args['street'],
        zipcode= args['zipCode'],
        house_number=args['houseNumber'],
        city=args['city']
    )

    user = models.User(
        surname=args['surname'],
        name=args['name'],
        email=args['email'],
        password=args['password'],
        address=address
    )
    db.session.add(user)
    db.session.commit()
    print('SIGNUP SUCCESS')
    return jsonify({'success': True})

@app.route('/api/signin', methods = ['POST'])
def signin():
    args = loginParser.parse_args()
    email = args['email']
    password = args['password']

    user = models.User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'success': False, 'message': 'User not found!'})
    if user.is_correct_password(password):
        login_user(user)
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'message': 'Wrong email or password!'})

    print('SIGNIN ', email, password)
    return '200'

@app.route('/api/signout')
@login_required
def signout():
    logout_user()
    return jsonify({'success': True})


@app.route('/admin/users')
def adminUsers():
    users = models.User.query.all()
    result = {}
    for user in users:
        userData = {
            'surname': user.surname,
            'name': user.name,
            'email' : user.email,
            'password': user.password,
            'street': user.address.street,
            'city': user.address.city,
        }
        result[user.id] = userData
    return jsonify(result)

@app.route('/')
def index():
    return render_template('index.html')

#
# Angular pages
#
@app.route('/app')
def indexApp(**kwargs):
    # angularjs requires the response composed like this:
    return make_response(open('app/static/pages/index.html').read())
