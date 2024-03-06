import pyodbc
import os
import struct
import uuid

from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

class Person(BaseModel):
    first_name: str
    last_name: Union[str, None] = None

with open('connectionString.txt', 'r') as file:
    # Read the contents of the file and store it in a variable
    file_contents = file.read()
connection_string = file_contents

app = FastAPI()

def getAllHistoryQuery():
    returnList = []
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT HistoryId, Name, UserName FROM History")
    columns = [column[0] for column in cursor.description]
    for row in cursor.fetchall():
        returnList.append(dict(zip(columns, row)))
    conn.close()
    return returnList

def getAllIdeaEntriesForHistory(HistoryId):
    returnList = []
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM IdeaEntry WHERE HistoryId=?", HistoryId)
    columns = [column[0] for column in cursor.description]
    for row in cursor.fetchall():
        returnList.append(dict(zip(columns, row)))
    conn.close()
    return returnList

def addIdeaEntryQuery(ideaName, description, historyId):
    conn = get_conn()
    cursor = conn.cursor()
    domain = str(uuid.uuid4())
    try:
        cursor.execute("INSERT INTO IdeaEntry (Name, Description, DomainName, HistoryId, IsGenerated) VALUES ( ?, ?, ?, ?, 0)", (ideaName, description, str(domain)[:20], historyId)) 
        conn.commit()
        conn.close()
    except Exception as e:
        print("An error occurred:", e)
        return e 
    
    return True

def createNewHistory(HistoryName, userName):
    conn = get_conn()
    cursor = conn.cursor()
    domain = str(uuid.uuid4())
    try:
        cursor.execute("INSERT INTO HISTORY (Name, UserName, DomainName) VALUES (?, ?, ?)", (HistoryName, userName, str(domain)[:20]))
        conn.commit()
        conn.close()
    except Exception as e:
        print("An error occurred:", e)
        return e 
    return True

# TODO: This needs to be edited!!!!!!!!!
def addMarketGapIdeaQuery(ideaName, ideaDescription, searchQuery, hasBeenSearched, nicheScore, createDate, sentiment):
    conn = get_conn()
    cursor = conn.cursor()
    domain = str(uuid.uuid4())
    try:
        cursor.execute("INSERT INTO MarketGapIdea (Name, Description, SearchQuery, HasBeenSearched, NicheScore, CreateDate, Sentiment) VALUES ( ?, ?, ?, ?, 0)", 
                       (ideaName, ideaDescription, searchQuery, hasBeenSearched, nicheScore, createDate, sentiment))
        conn.commit()
        conn.close()
    except Exception as e:
        print("An error occurred:", e)
        return e 
    
    return True

def getNextElementToSearch():
    conn = get_conn()
    cursor = conn.cursor()
    domain = str(uuid.uuid4())
    try:
        cursor.execute("SELECT TOP 1 * FROM MarketGapIdea WHERE HasBeenSearched = 0 ORDER BY newid()")
        conn.commit()
        conn.close()
    except Exception as e:
        print("An error occurred:", e)
        return e 
    return True

def generate_custom_guid():
    generated_uuid = uuid.uuid4()
    return generated_uuid

def get_conn():
    conn = pyodbc.connect(connection_string)
    return conn

#This can be changed to test the endpoints
# def main():
#     idea_entries = addIdeaEntryQuery("testing ideas2", "this is a test", "d0594ee2-5748-4da9-9cc2-3e606618c9a1")
#     print(idea_entries)

# if __name__ == "__main__":
#     main()