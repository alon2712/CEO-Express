from flask import Flask, request, jsonify
from flask_cors import CORS
import databaseInfo
import json

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
@api.route('/getNewIdeas', methods=['GET'])
def getNewIdeas():
    client = OpenAI(
        api_key="INSERT KEY HERE"
    )

    ideas = request.args.get('Ideas')
    count = request.args.get('Count')

    pastResults = "Swimmer"
    completions = []
    for i in range(int(count or 0)):
        completion = client.chat.completions.create(
          model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": "Imagine that you are a highly imaginative entrepreneur, renowned for your ability to innovate beyond the confines of ordinary thought. Your extraordinary talent lies not only in your capacity to conceive wholly original ideas, but also in your ability to take existing concepts and ingeniously transform them into something much more abstract and avant-garde. Curiosity, inventiveness, and a fearless disregard for the expected are virtually imprinted in your DNA. Society's norms and conventional wisdom have no hold over your entrepreneurial spirit and business strategies. Given these ideas, " + ideas + ", generate a new super creative mind-blowing but possible idea that are different, explaining how it would work behind the scenes, in less than 1 sentence in this format unnumbered, \"[TITLE - DESCRIPTION]\". This idea should be different from any of these: " + pastResults}],
        )
        completions.append(completion.choices[0].message.content.split(" - "))
        pastResults = pastResults + " " + completions[i][0]
        databaseInfo.addIdeaEntryQuery(completions[i][0], completions[i][1])
    response_body = {
        'message': str(True)
    }
    return response_body['message']


"""
This endpoint is used to add an idea entry to the database. Gets called with an api call like so:
http://127.0.0.1:5000/addIdeaEntry?IdeaName=testingAPI&Description=description%20of%20idea&HistoryID=b49d01e1-9d78-41bc-9a49-d037c4747a25
"""
@api.route('/addIdeaEntry', methods=['POST'])
def addIdeaEntry():
    historyId = request.json.get('HistoryId')
    ideaName = request.json.get('IdeaName')
    description = request.json.get('Description')
    success = databaseInfo.addIdeaEntryQuery(ideaName, description, historyId)
    response_body = {
        'message': str(success)
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



