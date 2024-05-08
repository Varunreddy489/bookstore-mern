import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import booksRoutes from "./routes/booksRoutes.js";
import connectToMongo from "./db/connectToMongo.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use("/api/books", booksRoutes);

const PORT = process.env.PORT;
console.log(PORT);

app.listen(PORT, () => {
  connectToMongo();
  console.log(`server runs ${PORT} `);
});
