import { category, books } from "../../../../data"; // Pastikan nama file sesuai
import fs from "fs";
import path from "path";

export default function handler(req, res) {
    if (req.method === "GET") {
        res.status(200).json(category);
    } 
    
    else if (req.method === "POST") {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Nama kategori diperlukan" });
        }

        const newCategory = {
            id: Date.now(),
            name,
        };

        category.push(newCategory);

        // Simpan category dan books ke file
        const filePath = path.join(process.cwd(), "data.js"); // Pastikan ini mengarah ke file sumber
        const updatedData = 
            `let category = ${JSON.stringify(category, null, 2)};\n` +
            `let books = ${JSON.stringify(books, null, 2)};\n` +
            `module.exports = { category, books };`;

        fs.writeFileSync(filePath, updatedData, "utf8");

        res.status(201).json(newCategory);
    } 
    
    else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
