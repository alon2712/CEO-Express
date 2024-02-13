import pyodbc
import os
import struct
from azure import identity
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
    map = {}
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT HISTORYId, Name FROM History")
    
    for row in cursor.fetchall():
        map[row.HISTORYId] = row.Name
    return map

def getAllIdeaEntriesForHistory(HistoryId):
    map = {}
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM IdeaEntry WHERE HistoryId=?", HistoryId)
    columns = [column[0] for column in cursor.description]
    for row in cursor.fetchall():
        row_dict = dict(zip(columns, row))
        map[row_dict['IdeaEntryId']] = row_dict
    conn.close()
    return map

def addIdeaEntryQuery(ideaName, description, historyID):
    guid = generate_custom_guid()
    print("GUID:")
    print(guid)
    conn = get_conn()
    cursor = conn.cursor()
    domain = generate_custom_guid()
    try:
        cursor.execute("INSERT INTO IdeaEntry (IdeaEntryId, Name, Description, DomainName, HistoryId, IsGenerated) VALUES (?, ?, ?, ?, ?, 0)", (guid, ideaName, description, str(domain)[:30], historyID))  #uuid.UUID
        conn.commit()
        conn.close()
    except Exception as e:
        print("An error occurred:", e)
        return False
    
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