import express from "express";
import {db} from "./index.js";


export const booksRouter = express.Router();

booksRouter.get("/allbook", async (req, res) => {
    try {
        const books = await db.all("SELECT * FROM books"); // all() kell az összes rekordhoz
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

booksRouter.post("/addbook", async (req, res) => {

    try {
        const {title,author,description,qty} = req.body;

        const newBook = await db.get("insert into books (title, author, description,qty) values (?,?,?,?) returning id",title,author, description, qty);

        return res.status(200).json(newBook);

    }catch(err) {
        res.status(500).json({ error: err.message });
    }
});

booksRouter.delete("/deletebook/:id", async (req, res) => {

    const id = req.params.id;

    const book = await db.get("SELECT * FROM books WHERE id=?", id);

    if (!book) {
        return res.status(500).json("No book with id: " + id);
    }

    await db.get("DELETE FROM books WHERE id=?", id);

    return res.sendStatus(200);

})