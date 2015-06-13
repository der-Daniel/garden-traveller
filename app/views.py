import os
from app import app, db, models
from flask import render_template, redirect, url_for, request, Response
from flask import make_response, abort
from flask import jsonify
from flask import flash

from flask_restful import Resource
from flask_restful import reqparse
from app import api


loginParser = reqparse.RequestParser()
loginParser.add_argument('email', type=str, required=True,
                            help='Email address')
loginParser.add_argument('password', type=str, required=True,
                            help='password')



# class Login(Resource):
#
#     def put(self):
#         args = loginParser.parse_args()
#         print('LOGIN ', args)
#         return {'success': True}
#
# class Logout(Resource):
#
#     def put(self):
#         return {'success': True}



# api.add_resource(Login, '/api/login')
# api.add_resource(Logout, '/api/logout')

@app.route('/api/signup', methods = ['POST'])
def signup():
    return 'OK'

@app.route('/api/signin', methods = ['POST'])
def signin():
    print('SIGNIN')

    args = loginParser.parse_args()
    print(dir(loginParser))
    print('ARGS ', args)

    # try:
    #     email = request.form['email']
    #     password = request.form['password']
    #     print('EMAIL', email)
    #     print('PASS', password)
    # except KeyError as e:
    #     print('KEY ERROR')
    return '200'




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
