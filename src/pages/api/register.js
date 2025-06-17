import mysql from "mysql2/promise";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username dan password wajib diisi" });
    }

    // Koneksi ke database
    const db = await mysql.createConnection({
        host: "localhost",
        user: "root",         // ganti sesuai user MySQL kamu
        password: "",         // ganti sesuai password MySQL kamu
        database: "user",     // ganti sesuai nama database kamu
    });

    // Cek apakah username sudah ada
    const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length > 0) {
        await db.end();
        return res.status(409).json({ message: "Username sudah terdaftar" });
    }

    // Simpan user baru
    await db.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
    await db.end();

    return res.status(201).json({ message: "Registrasi berhasil" });
}