import fs from "fs";
import path from "path";
import { category, books } from "../../../../data";

export default function handler(req, res) {
    if (req.method === "GET") {
        res.status(200).json(books);
    } else if (req.method === "POST") {
        const { title, author } = req.body;
        const newBook = {
            id: Date.now(),
            title,
            author,
        };
        books.push(newBook);

        const filePath = path.join(process.cwd(), "data.js");
        const updatedData = `let category = ${JSON.stringify(category)};\nlet books = ${JSON.stringify(books)};\nmodule.exports = { category, books };`;
        fs.writeFileSync(filePath, updatedData, "utf8");

        res.status(201).json(newBook);
    }
}
