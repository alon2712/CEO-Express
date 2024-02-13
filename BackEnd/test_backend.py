import pytest
from base import saveData, accessData, doComputation, addIdeaEntry, getAllHistory, getAllIdeaEntriesForHistory
from databaseInfo import addIdeaEntryQuery, getAllHistoryQuery, getAllIdeaEntriesForHistory

def testSaveData():
    result = saveData("input")
    assert result == True

def testAccessData():
    result = accessData("input")
    assert result == "test"

def testDoComputation():
    result = doComputation("input1", "input2")
    assert result == "input1"

def testAddIdeaEntry():
    # Mock request.args.get method
    class MockRequest:
        def args(self):
            return {
                'HistoryID': 'test_history_id',
                'IdeaName': 'test_idea_name',
                'Description': 'test_description'
            }
    
    # Mock databaseInfo.addIdeaEntryQuery method
    class MockDatabaseInfo:
        @staticmethod
        def addIdeaEntryQuery(ideaName, description, historyID):
            # Mocking the database response
            return True

    # Mocking Flask request and databaseInfo module
    with pytest.monkeypatch.context() as m:
        m.setattr("base.request", MockRequest())
        m.setattr("base.databaseInfo", MockDatabaseInfo)
        result = addIdeaEntry()
    
    assert result == True # or "True" ?

def testGetAllHistory():
    # Mock databaseInfo.getAllHistoryQuery method
    class MockDatabaseInfo:
        @staticmethod
        def getAllHistoryQuery():
            # Mocking the database response
            return {"history1": "details1", "history2": "details2"}

    # Mocking the databaseInfo module
    with pytest.monkeypatch.context() as m:
        m.setattr("base.databaseInfo", MockDatabaseInfo)
        result = getAllHistory()
    
    assert result == {'message': '{"history1": "details1", "history2": "details2"}'}  # Ensure correct response

def testGetAllIdeaEntriesForHistory():
    # Mock request.args.get method
    class MockRequest:
        def args(self):
            return {'HistoryID': 'test_history_id'}

    # Mock databaseInfo.getAllIdeaEntriesForHistory method
    class MockDatabaseInfo:
        @staticmethod
        def getAllIdeaEntriesForHistory(historyID):
            # Mocking the database response
            return {"idea1": "details1", "idea2": "details2"}

    # Mocking Flask request and databaseInfo module
    with pytest.monkeypatch.context() as m:
        m.setattr("base.request", MockRequest())
        m.setattr("base.databaseInfo", MockDatabaseInfo)
        result = getAllIdeaEntriesForHistory()
    
    assert result == {'message': '{"idea1": "details1", "idea2": "details2"}'}  # Ensure correct response

@pytest.fixture(scope="module")
def test_connection_string():
    return "your_test_connection_string_here"

def test_getAllHistoryQuery(test_connection_string):
    # Getting pre-existing rows from 'History' table
    # Replace 'your_test_connection_string_here' with test connection string once I find it
    connection_string = test_connection_string
    map = getAllHistoryQuery(connection_string)
    assert len(map) > 0

def test_getAllIdeaEntriesForHistory(test_connection_string):
    # Getting pre-existing rows from'IdeaEntry' table
    # Replace 'your_test_connection_string_here' with test connection string once I find it
    connection_string = test_connection_string
    history_id = "your_test_history_id_here"
    map = getAllIdeaEntriesForHistory(connection_string, history_id)
    assert len(map) > 0

def test_addIdeaEntryQuery(test_connection_string):
    # Replace 'your_test_connection_string_here' with test connection string once I find it
    connection_string = test_connection_string
    idea_name = "Test Idea"
    description = "Test Description"
    history_id = "your_test_history_id_here"
    result = addIdeaEntryQuery(connection_string, idea_name, description, history_id)
    assert result == True
