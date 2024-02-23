from flask import Flask, request, jsonify
from flask_cors import CORS
import databaseInfo
import json
from openai import OpenAI
import time
api = Flask(__name__)
CORS(api)

# Just an example on how to use the api
@api.route('/test')
def tester():
    response_body = {
        'message': 'Flask react connection works'
    }
    return response_body


"""
This endpoint is used to generate ideas and add them to the database. Gets called with an api call like so:
http://127.0.0.1:5000/getNewIdeas?Ideas=Swimmer,Surfer&Count=2
"""
@api.route('/getNewIdeas', methods=['POST'])
def getNewIdeas():
    client = OpenAI(
        api_key="API-KEY"
    )

    ideas = request.json.get('Ideas')
    count = request.json.get('Count')
    historyId = request.json.get('HistoryId')

    exc = ""
    try:
        t0 = time.time()
           
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Imagine that you are a highly imaginative entrepreneur, renowned for your ability to innovate beyond the confines of ordinary thought but also keeping things obtainable and senseble. Your extraordinary talent lies not only in your capacity to conceive wholly original ideas, but also in your ability to take existing concepts and ingeniously transform them into something much more abstract and avant-garde, but also simple and createble by the average human. Curiosity, inventiveness, and a fearless disregard for the expected are virtually imprinted in your DNA. Society's norms and conventional wisdom have no hold over your entrepreneurial spirit and business strategies. Given these ideas, " + ideas + ", generate a new screative possible idea that is different, explaining how it would work behind the scenes, in less than 1 sentence (20 words). Provide only a description (NO TITLE)"}],
        )
        t1 = time.time()
        total1 = t1-t0
        completion2 = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Given this description :" + completion.choices[0].message.content + ", Generate a name that matches the idea in 20 characters or less"}],
        )
        t2 = time.time()
        total2 = t1-t0
        print(completion.choices[0].message.content)
        print(completion2.choices[0].message.content)
        print(total1)
        print(total2)
        databaseInfo.addIdeaEntryQuery("Generated: " + completion2.choices[0].message.content, completion.choices[0].message.content, historyId)
    except  Exception as e:
        exc = e

    response_body = {
        'message': exc
    }
    return response_body


"""
This endpoint is used to add an idea entry to the database. Gets called with an api call like so:
http://127.0.0.1:5000/addIdeaEntry?IdeaName=testingAPI&Description=description%20of%20idea&HistoryID=b49d01e1-9d78-41bc-9a49-d037c4747a25
"""
@api.route('/addIdeaEntry', methods=['POST'])
def addIdeaEntry():
    historyId = request.json.get('HistoryId')
    ideaName = request.json.get('IdeaName')
    description = request.json.get('Description')
    success = databaseInfo.addIdeaEntryQuery(description, ideaName, historyId)
    response_body = {
        'message': str(success)
    }
    return response_body

@api.route('/createNewHistory', methods=['POST'])
def createNewHistory():
    historyName = request.json.get('HistoryName')
    username = request.json.get('userName')
    success = databaseInfo.createNewHistory(historyName, username)
    response_body = {
        'message': "success of Create new history:" + str(success)
    }
    return response_body



"""
This endpoint is used to list all of the histories that we have.
Called like so:
http://127.0.0.1:5000/getAllHistory
"""
@api.route('/getAllHistory', methods=['GET'])
def getAllHistory():
    returnList = databaseInfo.getAllHistoryQuery()
    response_body = {
        'message': json.dumps(returnList, default=str, indent = 2)
    }
    return response_body 
    
"""
This endpoint gets all of the ideas and its details for a specific history.
Called like so:
http://127.0.0.1:5000/getAllIdeaEntriesForHistory?HistoryID=b49d01e1-9d78-41bc-9a49-d037c4747a25
"""
@api.route('/getAllIdeaEntriesForHistory', methods=['GET'])
def getAllIdeaEntriesForHistory():
    historyID = request.args.get('HistoryID')
    returnList = databaseInfo.getAllIdeaEntriesForHistory(historyID)
    response_body = {
        'message': json.dumps(returnList, default=str, indent = 2)
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



