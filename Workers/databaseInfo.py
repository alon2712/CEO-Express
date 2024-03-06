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

def addMarketGapIdeaQuery(ideaName, ideaDescription, searchQuery, nicheScore, createDate, sentiment):
    conn = get_conn()
    cursor = conn.cursor()
    domain = str(uuid.uuid4())
    try:
        cursor.execute("INSERT INTO MarketGapIdea (Name, Description, SearchQuery, HasBeenSearched, NicheScore, CreateDate, Sentiment) VALUES ( ?, ?, ?, ?, ?, ?)", 
                       (ideaName, ideaDescription, searchQuery, 0, nicheScore, createDate, sentiment))
        conn.commit()
        conn.close()
    except Exception as e:
        print("An error occurred:", e)
        return e 
    
    return True

def getNextElementToSearch():
    returnList = []
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT TOP 1 * FROM MarketGapIdea WHERE HasBeenSearched = 0 ORDER BY newid()")
    columns = [column[0] for column in cursor.description]
    for row in cursor.fetchall():
        returnList.append(dict(zip(columns, row)))
    conn.close()
    return returnList

def updateHasBeenSearched(current_id):
    conn = get_conn()
    cursor = conn.cursor()
    domain = str(uuid.uuid4())
    try:
        cursor.execute("UPDATE HasBeenSearched=1 where MarketGapIdeaID=?", current_id)
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