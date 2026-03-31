from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017")

# Create database
db = client["kavach_db"]

# Create collection
collection = db["users"]

print("✅ Connected to MongoDB")
print("MongoDB server is running.....")

# Insert data
collection.insert_one({
    "name": "Jagadeesh",
    "project": "KAVACH"
})

print("✅ Data inserted")

# Fetch data
for user in collection.find():
    print(user)