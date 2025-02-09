from fastapi import FastAPI, HTTPException, status
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

from dotenv import load_dotenv
import os
load_dotenv()
database_password = os.getenv("DB_PASS")
secret_key = os.getenv("SECRET_KEY")
algo = os.getenv("ALGORITHM")


uri = f"mongodb+srv://jchen012004:{database_password}@accounts.vumyj.mongodb.net/?retryWrites=true&w=majority&appName=Accounts"

client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
db = client['test']
user_collection = db['users']
event_collection = db['events']

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


app = FastAPI()

#  ----- EVENT SHIT -----
class Event(BaseModel):
    name: str
    time: str
    place: str
    org: str
    description: str

@app.get("/events")
async def displayEvents():

    res = event_collection.find()
    events = [event for event in res]
    for event in events:
        event["_id"] = str(event["_id"])
    return events

@app.patch("/events")
async def updateEvent(event_id, key, val):
    event_collection.update_one(
            {'_id': ObjectId(event_id)},
            {{key: val}})
    return {}

@app.post("/add_events/")
async def createEvent(item: Event):
    org_id = str(user_collection.find({"username": item.org}).to_list()[0]._id)
    new_item = {"name": item.name, "time": item.time,"place": item.place,"org": item.org,"org_id": org_id, "description": item.description}
    event_id = str(event_collection.insert_one(new_item).inserted_id)
    await updateAccount("events_list", event_id, org_id)
    return {"message": "event added successfully"}

@app.delete("/delete_events/{event_id}")
async def deleteEvent(event_id):
    result = await event_collection.delete_one({"_id": ObjectId(event_id)})

    if result.deleted_count == 0:
        return {"message": "Event not found or already deleted."}

    return {"message": f"Event {event_id} deleted successfully."}
    

# ----- ACCOUNT SHIT -----

class Account(BaseModel):
    username: str
    email: EmailStr
    password: str
    contact: list
    events_list: list  = []
    role: str = "user"
    status: str = "unverified"

class LoginRequest(BaseModel):
    email: str
    password: str

def create_access_token(data: LoginRequest, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)  # Default expiration time

    to_encode.update({"exp": expire})  # Set expiration time
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=algo)
    return encoded_jwt

@app.get("/displayAccounts")
async def displayAccounts():
    res = user_collection.find()
    accounts = [account for account in res]
    for account in accounts:
        account["_id"] = str(account["_id"])
    return accounts

@app.post("/loginAccount")
async def loginAccount(loginRequest: LoginRequest):
    
    user = user_collection.find_one({"email":loginRequest.email})

    if not user or not pwd_context.verify(loginRequest.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {
        "id": str(user["_id"]),   # Convert ObjectId to string
        "email": user["email"],
        "username": user["username"],
        "role": user["role"]
    }

@app.patch("/updateAccount")
async def updateAccount(key, val, account_id):

    if key == "events_list":
        result = user_collection.update_one(
            {'_id': ObjectId(account_id)},
            {"$push": {key: val}})

    return {"message":"Account updated!"}

@app.post("/createAccount", status_code=status.HTTP_201_CREATED)
async def createAccount(account_info: Account):

    # Check if the username or email already exists in db
    if user_collection.find_one({"$or": [{"username": account_info.username}, {"email": account_info.email}]}):
        raise HTTPException(status_code=400, detail="Account with this username or email already exists")
    else:
    
        hashed_password = pwd_context.hash(account_info.password)

        # Create new entry in db
        new_user = {
            "username": account_info.username,
            "email": account_info.email,
            "password": hashed_password,
            "contact": account_info.contact,
            "events_list": account_info.events_list,
            "role": account_info.role,
            "status": account_info.status

        }

        # Insert into collection of users
        result = await user_collection.insert_one(new_user)

        if result.inserted_count == 0:
            return {"message":"Failed to create account"}    
        
        return {"message":f"Account successfully created!"}

@app.delete("/deleteAccount")
async def deleteAccount(user_id: str):

    result = await user_collection.delete_one({"_id": ObjectId(user_id)})

    if result.deleted_count == 0:
        return {"message": f"Failed to delete user: {user_id}"}
    
    return {"message":"Account successfully deleted!"}

