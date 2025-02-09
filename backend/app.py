from fastapi import FastAPI, HTTPException, status
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from bson import ObjectId
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware

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

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
#  ----- EVENT SHIT -----
class Event(BaseModel):
    name: str
    month: int
    day: int
    year: int
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


@app.patch("/update_events")
async def updateEvent(item: dict):
    # Build the update query using the $set operator
    update_data = {item["key"]: item["val"]}
    
    # Perform the update using update_one
    result = event_collection.update_one(
        {'_id': ObjectId(item["event_id"])},  # Matching the event by its ObjectId
        {'$set': update_data}  # Use $set to specify the fields to update
    )
    
    # Return a response (optional: you can include more info about the result)
    return {"modified_count": result.modified_count}

@app.post("/add_events/")
async def create_event(item: Event):

    # Find organization
    user_doc = user_collection.find({"username": str(item.org)}).to_list()[0]
    if not user_doc:
        return {"message" : "Error adding"}
    org_id = str(user_doc["_id"])

    # Insert event
    new_item = {
        "name": item.name,
        "month": item.month,
        "day": item.day,
        "year": item.year,
        "time": item.time,
        "place": item.place,
        "org": item.org,
        "org_id": org_id,
        "description": item.description,
    }

    result = event_collection.insert_one(new_item)
    event_id = str(result.inserted_id)

    # Ensure updateAccount is async
    await updateAccount("events_list", event_id, org_id)

    return {"message": "Event added successfully"}

@app.delete("/delete_events/{event_id}")
async def deleteEvent(event_id):
    event_doc = event_collection.find({"_id": ObjectId(event_id)}).to_list()[0]
    org_id = event_doc["org_id"]
    result = event_collection.delete_one({"_id": ObjectId(event_id)})

    if result.deleted_count == 0:
        return {"message": "Event not found or already deleted."}
    await updateAccount("events_list", event_id, org_id, remove=True)

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

@app.get("/displayAccount")
async def displayAccount():
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
async def updateAccount(key, val, account_id, remove=False):
    if key == "events_list":
        if remove:
            user_collection.update_one(
                { '_id': ObjectId(account_id)},
                { "$pull": { key: val } }
            )
        else:
            user_collection.update_one(
                {'_id': ObjectId(account_id)},
                {"$push": {key: val}});

    return {"message":"Account updated!"}

@app.post("/createAccount", status_code=status.HTTP_201_CREATED)
async def createAccount(account_info: Account):

    # Check if the username or email already exists in db
    if user_collection.find_one({"$or": [{"username": account_info.username}, {"email": account_info.email}]}):
        raise HTTPException(status_code=400, detail="Account with this username or email already exists")
    
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
    result = user_collection.insert_one(new_user)

    if result.inserted_count == 0:
        return {"message":"Failed to create account"}    
    
    return {"message":f"Account successfully created!"}

@app.delete("/deleteAccount")
async def deleteAccount(user_id: str):

    result = await user_collection.delete_one({"_id": ObjectId(user_id)})

    if result.deleted_count == 0:
        return {"message": f"Failed to delete user: {user_id}"}
    
    return {"message":"Account successfully deleted!"}

