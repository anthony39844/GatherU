from fastapi import FastAPI
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId
from pydantic import BaseModel, EmailStr

from dotenv import load_dotenv
import os
load_dotenv()
database_password = os.getenv("DB_PASS")


uri = f"mongodb+srv://jchen012004:{database_password}@accounts.vumyj.mongodb.net/?retryWrites=true&w=majority&appName=Accounts"

client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
db = client['test']
user_collection = db['users']
event_collection = db['events']


try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


app = FastAPI()

class Account(BaseModel):
    username: str
    email: EmailStr
    password: str
    contact: list
    role: str = "user"
    status: str = "unverified"

#  ----- EVENT SHIT -----

@app.get("/events")
async def displayEvents():

    res = event_collection.find()
    events = [event for event in res]
    for event in events:
        event["_id"] = str(event["_id"])
    return events

@app.patch("/events")
async def updateEvent():

    return {}

@app.post("/add_events/")
async def createEvent(item: dict):
    org_id = str(user_collection.find({"username": item["org"]}).to_list()[0]['_id'])
    new_item = {"name": item["name"], "time": item["time"],"place": item["place"],"org": item["org"],"org_id": org_id, "description": item["description"]}
    event_id = str(event_collection.insert_one(new_item).inserted_id)
    await updateAccount("events_list", event_id, org_id)
    return {}

@app.delete("/events")
async def deleteEvent():

    return {}

# ----- ACCOUNT SHIT -----

@app.get("/loginAccount")
async def displayAccount():
    res = user_collection.find()
    accounts = [account for account in res]
    for account in accounts:
        account["_id"] = str(account["_id"])
    return accounts

@app.patch("/updateAccount")
async def updateAccount(key, val, account_id):
    if key == "events_list":
        user_collection.update_one(
            {'_id': ObjectId(account_id)},
            {"$push": {key: val}});

    return {}

@app.post("/createAccount")
async def createAccount(username, email, password, contact, events=[], role="user"):
        
    return {}

@app.delete("/deleteaAccount")
async def deleteAccount():

    return {}

