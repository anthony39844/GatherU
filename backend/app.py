from flask import Flask, jsonify, request
from pymongo import MongoClient

uri = "mongodb+srv://jchen012004:<db_password>@accounts.vumyj.mongodb.net/?retryWrites=true&w=majority&appName=Accounts"

app = Flask(__name__)