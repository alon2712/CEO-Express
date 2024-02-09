from flask import Flask
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

# Just an example on how to use the api
@api.route('/test')
def tester():
    response_body = {
        'message': 'Flask react connection works'
    }
    return response_body

# Just an example on how to use the api
def saveData(info):
    #save info to DB
    success = True
    return success

def accessData(info):
    testResult = "test"
    return testResult

def doComputation(info, name):
    return info



