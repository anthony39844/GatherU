from fastapi import FastAPI
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import json

from dotenv import load_dotenv
import os
load_dotenv()
database_password = os.getenv("DB_PASS")


uri = f"mongodb+srv://jchen012004:{database_password}@accounts.vumyj.mongodb.net/?retryWrites=true&w=majority&appName=Accounts"

client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
db = client['sample_training']
collection = db['zips']
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


app = FastAPI()

#  ----- EVENT SHIT -----

@app.get("/events")
async def displayEvents():
    res = collection.find({"city":"HUEYTOWN"})
    documents = list(res)
    json_data = json.dumps(documents, default=str)


    return json_data


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

    return {}

@app.patch("/account")
async def updateAccount():

    return {}

@app.post("/account")
async def createAccount():

    return {}

@app.delete("/account")
async def deleteAccount():

    return {}

