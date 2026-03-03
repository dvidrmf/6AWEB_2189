const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());                         // handles JSON body
app.use(express.urlencoded({ extended: true })); // handles form-encoded body

const upload = multer();                         // handles multipart/form-data

const CONNECTION_STRING = "mongodb://localhost:27017";
const DATABASENAME = "MyDb";
let database;

// ── DB guard middleware ──
app.use((req, res, next) => {
  if (!database) {
    return res.status(503).json({ error: "Database not connected yet." });
  }
  next();
});

// ══════════════════════════════════════
// GET all books
// ══════════════════════════════════════
app.get("/api/books/GetBooks", async (req, res) => {
  try {
    const result = await database.collection("Books").find({}).toArray();
    console.log(`GET /GetBooks → returned ${result.length} books`);
    res.json(result);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// ══════════════════════════════════════
// ADD a book
// Accepts: JSON body OR multipart/form-data
// ══════════════════════════════════════
app.post("/api/books/AddBook", upload.none(), async (req, res) => {
  try {
    console.log("POST /AddBook — req.body:", req.body);

    const numOfDocs = await database.collection("Books").countDocuments();

    const newBook = {
      id:     String(numOfDocs + 1),
      bookId: req.body.bookId  || "",
      title:  req.body.title   || "",
      author: req.body.author  || "",
      genre:  req.body.genre   || "",
      desc:   req.body.desc    || "",
      price:  Number(req.body.price) || 0,
      series: req.body.series  || "",
    };

    console.log("Inserting:", newBook);
    await database.collection("Books").insertOne(newBook);
    res.json("Added Successfully");
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Failed to add book" });
  }
});

// ══════════════════════════════════════
// UPDATE a book
// Accepts: JSON body OR multipart/form-data
// ══════════════════════════════════════
app.put("/api/books/UpdateBook/:id", upload.none(), async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`PUT /UpdateBook/${id} — req.body:`, req.body);

    const updatedFields = {
      bookId: req.body.bookId  || "",
      title:  req.body.title   || "",
      author: req.body.author  || "",
      genre:  req.body.genre   || "",
      desc:   req.body.desc    || "",
      price:  Number(req.body.price) || 0,
      series: req.body.series  || "",
    };

    console.log("Updating id:", id, "→", updatedFields);

    const result = await database.collection("Books").updateOne(
      { id: String(id) },
      { $set: updatedFields }
    );

    console.log(`matchedCount: ${result.matchedCount}, modifiedCount: ${result.modifiedCount}`);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: `Book with id "${id}" not found` });
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
    console.log(`DELETE /DeleteBook?id=${req.query.id}`);

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

// ══════════════════════════════════════
// START SERVER
// ══════════════════════════════════════
async function start() {
  try {
    console.log("Connecting to MongoDB...");

    const client = new MongoClient(CONNECTION_STRING, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    await client.connect();
    database = client.db(DATABASENAME);
    console.log(`Connected to MongoDB — database: "${DATABASENAME}"`);

    app.listen(5038, () => {
      console.log("Server running on http://localhost:5038");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

start();
