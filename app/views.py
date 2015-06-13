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

#########################################################################################
#                       API request parsers
#########################################################################################


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

productParser = reqparse.RequestParser()
productParser.add_argument('name', type=str, help='Name of product', required=True)

gardenParser = reqparse.RequestParser()
gardenParser.add_argument('name', type=str, help='Name of garden', required=True)
gardenParser.add_argument('street', type=str, help='Street', required=True)
gardenParser.add_argument('houseNumber', type=str, help='House number', required=True)
gardenParser.add_argument('zipCode', type=str, help='Zip code', required=True)
gardenParser.add_argument('city', type=str, help='City', required=True)
gardenParser.add_argument('longitude', type=str, help='Longitude', required=True)
gardenParser.add_argument('latitude', type=str, help='Latitude', required=True)


offeringParser = reqparse.RequestParser()
offeringParser.add_argument('amount', type=int, help='Amount in grams', required=True)
offeringParser.add_argument('price', type=int, help='Price', required=True)
offeringParser.add_argument('productId', type=int, help='Product Id', required=True)
offeringParser.add_argument('gardenId', type=int, help='Garden Id', required=True)

# routeParser = reqparse.RequestParser()
# routeParser.add_argument('')

#########################################################################################
#                          API Functionality
#########################################################################################

class Offering(Resource):
    # decorators = [login_required]

    def get(self, id):
        offering = models.Offering.query.get(id)
        if offering is None:
            return {'success': False, 'message': 'Offering not found!'}
        result = {
            'success': True,
            'product': offering.product.name,
            'amount': offering.amount,
            'price': offering.price
        }
        return result

    def put(self):
        args = offeringParser.parse_args()

        garden = models.Garden.query.filter_by(id=args['gardenId']).first()
        if garden is None:
            return {'success': False, 'message': 'Garden not found!'}

        product = models.Product.query.filter_by(id=args['productId']).first()
        if product is None:
            return {'success': False, 'message': 'Product not found!'}

        offering = models.Offering(
            amount = args['amount'],
            price = args['price'],
            product=product
        )

        garden.offerings.append(offering)
        db.session.add(offering)
        db.session.add(garden)
        db.session.commit()
        return {'success': True}

class Address(Resource):

    def get(self, id):
        print('GET ADDRESS ', id)
        return {}


class AllUserAddresses(Resource):

    def get(self):
        print('GET ALL USER ADDRESSES')
        return {}


class Route(Resource):

    def put(self):
        args = routeParser.parse_args()
        print('ROUTE')


class ProductsAll(Resource):

    def get(self):
        products = models.Product.query.all()
        result = {}
        for product in products:
            result[product.id] = product.name

        return {'success': True, 'products': result}


class Product(Resource):

    def put(self):
        args = productParser.parse_args()
        name = args['name']
        product = models.Product.query.filter_by(name=name).first()
        if product is not None:
            return {'success': False, 'message': 'Product already in db.'}

        product = models.Product(
            name=name
        )
        db.session.add(product)
        db.session.commit()
        return {'success': True}


class GardensAll(Resource):

    def get(self):
        # TODO: get only gardens from current_user
        gardens = models.Garden.query.all()
        result = {}
        for garden in gardens:
            result[garden.id] = {
                'name': garden.name,
                'longitude': garden.location.longitude,
                'latitude': garden.location.latitude
            }
        return {'success': True, 'gardens': result}


class Garden(Resource):

    def put(self):
        args = gardenParser.parse_args()

        garden = models.Garden.query.filter_by(name=args['name']).first()
        if garden is not None:
            return {'success': False, 'message': 'Garden exists!'}

        address = models.Address(
            street=args['street'],
            zipcode= args['zipCode'],
            house_number=args['houseNumber'],
            city=args['city']
        )

        location = models.Location(
            longitude=args['longitude'],
            latitude=args['latitude']
        )

        garden = models.Garden(
            name=args['name'],
            address=address,
            location=location,
        )

        db.session.add(garden)
        db.session.commit()
        return {'success': True}


#########################################################################################
#                               API URIs
#########################################################################################

# offering
api.add_resource(Offering, '/api/offering', '/api/offering/<string:id>')

# address
api.add_resource(Address, '/api/address/<string:id>')
api.add_resource(AllUserAddresses, '/api/address')

# product
api.add_resource(Product, '/api/product')
api.add_resource(ProductsAll, '/api/product/all')

# garden
api.add_resource(Garden, '/api/garden')
api.add_resource(GardensAll, '/api/garden/all')

api.add_resource(Route, '/api/route')


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
