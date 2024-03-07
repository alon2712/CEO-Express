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

def get_new_ideas(new_assistant, client, summary):
    try:

        thread = client.beta.threads.create()

        message = client.beta.threads.messages.create(
            thread_id=thread.id,
            role= "user",
            content=summary
        )

        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=new_assistant.id
        )
        output = ""
        while run.status != "completed":
            keep_retrieving_run = client.beta.threads.runs.retrieve(
                thread_id=thread.id,
                run_id=run.id
            )
            print(f"Run status: {keep_retrieving_run.status}")

            if keep_retrieving_run.status == "completed":
                print("\n")
                break
            elif keep_retrieving_run.status == 'requires_action':
                print('requires action')
                print("\n")

                output = keep_retrieving_run.required_action.submit_tool_outputs.tool_calls[0].function.arguments
                break

        return json.loads(output)["Ideas"]
    except:
        return []
    
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
    historyId = request.json.get('HistoryId')

    exc = ""
    try:
        new_assistant = client.beta.assistants.retrieve(
        assistant_id="asst_8DliSJERNewTbIRmwarOMJgT"
    )
        results = get_new_ideas(new_assistant, client, ideas)
        
        for result in results:         
            databaseInfo.addIdeaEntryQueryGenerated(result["new_idea_name"],
                                                     result[ "new_idea_description"] + " " + result[ "new_idea_reason"], 
                                                     historyId)
    except  Exception as e:
        exc = e

    response_body = {
        'message': results
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

@api.route('/deleteIdeaEntry', methods=['POST'])
def deleteIdeaEntry():
    ideaEntryId = request.json.get('IdeaEntryId')
    success = databaseInfo.deleteIdeaEntryQuery(ideaEntryId)
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



