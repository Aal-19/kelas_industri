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

    // Cek user di database
    const [rows] = await db.execute(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password]
    );
    await db.end();

   if (rows.length === 1) {
        return res.status(200).json({ message: "Login berhasil", user: rows[0] });
    } else {
        return res.status(401).json({ message: "Username atau password salah" });
    }
}