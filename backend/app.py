from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)