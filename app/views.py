import os
from app import app, db, models
from flask import render_template, redirect, url_for, request, Response
from flask import make_response, abort
from flask import jsonify
from flask import flash

# from flask_restful import Resource
# from flask_restful import reqparse
# from app import api


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
