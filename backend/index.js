import express from 'express';
import {Database} from "sqlite-async";
import {userRouter} from "./users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {booksRouter} from "./books.js";


const JWT_SECRET = process.env.JWT_SECRET;


const app = express();

app.use(cors( {origin: "http://localhost:5173", credentials: true }) );
app.use(cookieParser());
export const db =await Database.open("library.sqlite").then(async db => {
    //role:0 : admin, 1:admin
    await db.run("create table if not exists users (id integer primary key autoincrement, name text, password blob, role int default 0)");
    await db.run("create table if not exists books (id integer primary key autoincrement, title text, author text, description text, qty int)")
    await db.run("create table if not exists user_books (userId int references users (id), bookId int references books (id), primary key (userId,bookId)) without rowid");

    return db
})
app.use(express.json());


app.use("/users", userRouter);
app.use("/book", booksRouter);


app.listen(3000, () => console.log('Server started on port 3000'));
