import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for Save a new Book
router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    const newBook = new Book({
      title,
      author,
      publishYear,
    });

    await newBook.save();

    res.status(200).json({
      _id: newBook._id,
      title: newBook.title,
      author: newBook.author,
      publishYear: newBook.publishYear,
    });
  } catch (error) {
    console.log("error in addBook:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route for Get All Books from database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log("error in Get Books:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(404).json({ error: "fill out all the fields " });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    console.log(result);

    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log("error in update book:", error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ error: "book not found" });
    }

    return res.status(200).json({ message: "book deleted successfully" });
  } catch (error) {
    console.log("error in delete book:", error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
