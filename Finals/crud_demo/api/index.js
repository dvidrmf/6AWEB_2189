// This file is saved inside the 'api' folder.

const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON body

const CONNECTION_STRING = "mongodb://localhost:27017";
const DATABASENAME = "MyDb";
let database;

// Block requests until DB is ready
app.use((req, res, next) => {
  if (!database) {
    return res.status(503).json({ error: "Database not connected yet." });
  }
  next();
});

console.log("Starting API...");
console.log("Connecting to MongoDB...");

async function start() {
  try {
    const client = new MongoClient(CONNECTION_STRING, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    await client.connect();
    database = client.db(DATABASENAME);
    console.log("Connected to MongoDB!");

    app.listen(5038, () => {
      console.log("Server running on http://localhost:5038");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

start();

// ══════════════════════════════════════
// GET all books
// ══════════════════════════════════════
app.get("/api/books/GetBooks", async (req, res) => {
  try {
    const result = await database.collection("Books").find({}).toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// ══════════════════════════════════════
// ADD a book
// ══════════════════════════════════════
app.post("/api/books/AddBook", async (req, res) => {
  try {
    const numOfDocs = await database.collection("Books").countDocuments();

    const newBook = {
      id: String(numOfDocs + 1),
      bookId: req.body.bookId   || "",
      title:  req.body.title    || "",
      author: req.body.author   || "",
      genre:  req.body.genre    || "",
      desc:   req.body.desc     || "",
      price:  Number(req.body.price) || 0,
      series: req.body.series   || "",
    };

    await database.collection("Books").insertOne(newBook);
    res.json("Added Successfully");
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Failed to add book" });
  }
});

// ══════════════════════════════════════
// UPDATE a book
// ══════════════════════════════════════
app.put("/api/books/UpdateBook/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedFields = {
      bookId: req.body.bookId   || "",
      title:  req.body.title    || "",
      author: req.body.author   || "",
      genre:  req.body.genre    || "",
      desc:   req.body.desc     || "",
      price:  Number(req.body.price) || 0,
      series: req.body.series   || "",
    };

    const result = await database.collection("Books").updateOne(
      { id: String(id) },
      { $set: updatedFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json("Updated Successfully");
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// ══════════════════════════════════════
// DELETE a book
// ══════════════════════════════════════
app.delete("/api/books/DeleteBook", async (req, res) => {
  try {
    const result = await database.collection("Books").deleteOne({ id: req.query.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json("Deleted Successfully");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});