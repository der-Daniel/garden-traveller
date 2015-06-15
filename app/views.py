import os
from app import app, db, models
from flask import render_template, redirect, url_for, request, Response
from flask import send_file, send_from_directory
from flask import make_response, abort
from flask import jsonify
from flask import flash
from flask import jsonify
from flask.ext.login import login_user, logout_user
from flask.ext.login import login_required, current_user
from .util import calculateLocationOrder


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

offeringUpdateParser = reqparse.RequestParser()
offeringUpdateParser.add_argument('amount', type=int, help='Amount in grams')
offeringUpdateParser.add_argument('price', type=int, help='Price')


# routeParser = reqparse.RequestParser()
# routeParser.add_argument('')

#########################################################################################
#                          API Functionality
#########################################################################################
class OfferingAll(Resource):

    def get(self):
        gardens = models.Garden.query.all()
        data = {}
        for garden in gardens:
            print('Garden', garden)
            for offering in garden.offerings:
                data[offering.id] = {
                    'product': offering.product.name,
                    'amount': offering.amount,
                    'price': offering.price,
                    'productId': offering.product_id,
                    'gardenId': offering.garden_id
                }
        return {'success': True, 'offerings': data}


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

    def put(self, id):
        args = offeringUpdateParser.parse_args()
        offering = models.Offering.query.get(id)
        if offering is None:
            return {'success': False, 'message': 'Offering not found!'}

        amount = args['amount']
        price = args['price']
        if amount:
            offering.amount = amount
        if price:
            offering.price = price

        db.session.add(offering)
        db.session.commit()
        return {'success': True}

    def post(self):
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

    def post(self):
        # args = routeParser.parse_args()
        userRequest = {
            '2': 5,
            '1': 10,
            '4': 2
        }
        # willy
        # willy
        # lui
        # darmstadtium
        offerings = {
            '2': {'longitude': '49.876224', 'latitude': '8.650388', 'product_id': 2, 'amount': 1000, 'garden_id': 3},
            '1': {'longitude': '49.876224', 'latitude': '8.650388', 'product_id': 1, 'amount': 500, 'garden_id': 3},
            '3': {'longitude': '49.873229', 'latitude': '8.651730', 'product_id': 5, 'amount': 60, 'garden_id': 1},
            '4': {'longitude': '49.874174', 'latitude': '8.657718', 'product_id': 4, 'amount': 300, 'garden_id': 4}
        }
        startLoc = {'longitude': '49.872129', 'latitude': '8.652706'}
        endLoc = {'longitude': '49.877739', 'latitude': '8.661381'}
        orderedPlaces = calculateLocationOrder(userRequest, offerings, startLoc, endLoc)
        print('ORDERED PLACES ', orderedPlaces)
        return {'success': True, 'via_points': orderedPlaces}


class ProductsAll(Resource):

    def get(self):
        products = models.Product.query.all()
        result = {}
        for product in products:
            result[product.id] = product.name

        return {'success': True, 'products': result}


class Product(Resource):

    def post(self):
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
                'latitude': garden.location.latitude,
                'city': garden.address.city,
                'street': garden.address.street,
                'zipcode': garden.address.zipcode,
                'house_number': garden.address.house_number
            }
        return {'success': True, 'gardens': result}


class Garden(Resource):

    def post(self):
        args = gardenParser.parse_args()
        print('POST GARDEN ', args)

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

        user = models.User.query.get(1)
        if user is None:
            return {'success': False, 'message': 'No user in DB!'}

        user.gardens.append(garden)
        db.session.add(user)
        db.session.add(garden)
        db.session.commit()
        return {'success': True}


#########################################################################################
#                               API URIs
#########################################################################################

# offering
api.add_resource(Offering, '/api/offering', '/api/offering/<string:id>')
api.add_resource(OfferingAll, '/api/offering/all')

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
    # print('SIGNIN START')
    # print(request)
    # args = loginParser.parse_args()
    # print('SIGNIN args', args)
    # email = args['email']
    # password = args['password']
    #
    # user = models.User.query.filter_by(email=email).first()
    # if user is None:
    #     return jsonify({'success': False, 'message': 'User not found!'})
    # if user.is_correct_password(password):
    #     login_user(user)
    #     return jsonify({'success': True})
    # else:
    #     return jsonify({'success': False, 'message': 'Wrong email or password!'})
    return jsonify({'success': True})


@app.route('/api/signout')
@login_required
def signout():
    logout_user()
    return jsonify({'success': True})


@app.route('/api/admin/users')
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
            'gardens': []
        }
        for garden in user.gardens:
            obj = {
                'id': garden.id,
                'name': garden.name
            }
            userData['gardens'].append(obj)
        result[user.id] = userData
    return jsonify(result)

#
# Angular pages
#
@app.route('/<path:path>')
def indexApp(path):
    # angularjs requires the response composed like this:
    # return make_response(open('app/static/dist/index.html').read())
    print('PATH', path)
    return send_from_directory('/home/patrick/repos/bep/app/static/dist', path)


@app.before_request
def option_autoreply():
    """ Always reply 200 on OPTIONS request """

    if request.method == 'OPTIONS':
        resp = app.make_default_options_response()

        headers = None
        if 'ACCESS_CONTROL_REQUEST_HEADERS' in request.headers:
            headers = request.headers['ACCESS_CONTROL_REQUEST_HEADERS']

        h = resp.headers

        # Allow the origin which made the XHR
        h['Access-Control-Allow-Origin'] = '*'
        # Allow the actual method
        h['Access-Control-Allow-Methods'] = request.headers['Access-Control-Request-Method']
        # Allow for 10 seconds
        h['Access-Control-Max-Age'] = "10"

        # We also keep current headers
        if headers is not None:
            h['Access-Control-Allow-Headers'] = headers

        return resp

@app.after_request
def set_allow_origin(resp):
    """ Set origin for GET, POST, PUT, DELETE requests """

    h = resp.headers

    # Allow crossdomain for other HTTP Verbs
    if request.method != 'OPTIONS' and 'Origin' in request.headers:
        h['Access-Control-Allow-Origin'] = request.headers['Origin']
        h['Access-Control-Allow-Methods'] = 'POST,GET,PUT,DELETE'
        h['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token, Authorization'

    # print(request.method)
    # print('H')
    # print(h)
    # print('res headrs')
    # print(resp.headers)
    return resp
