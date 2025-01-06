const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
// Use CORS middleware
app.use(cors());
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  const uri = "mongodb://admin:12345@localhost:27017"; // MongoDB URI
  const dbName = "user"; // Replace with your database name

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const db = client.db(dbName);
    const collection = db.collection("userProfiles");

    // Retrieve all users
    const users = await collection.find().toArray();

    // Respond with the users data
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  } finally {
    await client.close();
  }
});

// POST route to add a new user
app.post("/users", async (req, res) => {
  const uri = "mongodb://admin:12345@localhost:27017"; // MongoDB URI
  const dbName = "user"; // Replace with your database name

  const client = new MongoClient(uri);

  // Get user data from the request body
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res
      .status(400)
      .json({
        error: "Missing required fields: username, email, and password",
      });
  }

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const db = client.db(dbName);
    const collection = db.collection("userProfiles");

    // Insert the new user into the collection
    const result = await collection.insertOne({
      firstName,
      lastName,
      createdAt: new Date(),
    });

    // Respond with the result
    res
      .status(201)
      .json({ message: "User added successfully", userId: result.insertedId });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
