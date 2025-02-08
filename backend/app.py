from fastapi import FastAPI
from pymongo import MongoClient
from pymongo.server_api import ServerApi

from dotenv import load_dotenv
import os
load_dotenv()
database_password = os.getenv("DB_PASS")


uri = f"mongodb+srv://jchen012004:{database_password}@accounts.vumyj.mongodb.net/?retryWrites=true&w=majority&appName=Accounts"

client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
db = client['test']
user_collection = db['users']

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


app = FastAPI()

#  ----- EVENT SHIT -----

@app.get("/events")
async def displayEvents():
    collection = db['events']

    res = collection.find()
    events = [event for event in res]
    for event in events:
        event["_id"] = str(event["_id"])
    return events

@app.patch("/events")
async def updateEvent():

    return {}

@app.post("/events")
async def createEvent():
    
    return {}

@app.delete("/events")
async def deleteEvent():

    return {}

# ----- ACCOUNT SHIT -----

@app.get("/account")
async def displayAccount():
    res = user_collection.find()
    accounts = [account for account in res]
    for account in accounts:
        account["_id"] = str(account["_id"])
    return accounts

@app.patch("/account")
async def updateAccount():

    return {}

@app.post("/account")
async def createAccount():

    return {}

@app.delete("/account")
async def deleteAccount():

    return {}

