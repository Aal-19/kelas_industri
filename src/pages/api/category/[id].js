import { category, books } from '../../../../data'; // Import semua data
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { id } = req.query;
    const categoryId = parseInt(id, 10);
    const categoryIndex = category.findIndex((c) => c.id === categoryId);

    if (req.method === 'GET') {
        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Category not found' });
        }
        return res.status(200).json(category[categoryIndex]);
    }

    else if (req.method === 'PUT') {
        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const { name } = req.body;
        category[categoryIndex].name = name;

        const filePath = path.join(process.cwd(), 'data.js');
        const updatedData = 
            `let category = ${JSON.stringify(category, null, 2)};\n` +
            `let books = ${JSON.stringify(books, null, 2)};\n` +
            `module.exports = { category, books };`;

        fs.writeFileSync(filePath, updatedData, 'utf8');

        return res.status(200).json(category[categoryIndex]);
    }

    else if (req.method === 'DELETE') {
        if (categoryIndex === -1) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.splice(categoryIndex, 1);

        const filePath = path.join(process.cwd(), 'data.js');
        const updatedData = 
            `let category = ${JSON.stringify(category, null, 2)};\n` +
            `let books = ${JSON.stringify(books, null, 2)};\n` +
            `module.exports = { category, books };`;

        fs.writeFileSync(filePath, updatedData, 'utf8');

        return res.status(200).json({ message: 'Category deleted successfully' });
    }

    else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
