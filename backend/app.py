from flask import Flask, jsonify, request
from pymongo import MongoClient
from pymongo.server_api import ServerApi

from dotenv import load_dotenv
import os
load_dotenv()
database_password = os.getenv("DB_PASS")


uri = f"mongodb+srv://jchen012004:{database_password}@accounts.vumyj.mongodb.net/?retryWrites=true&w=majority&appName=Accounts"

client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

app = Flask(__name__)