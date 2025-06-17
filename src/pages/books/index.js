import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Sidebar from "@/component/sidebar";

// Fungsi getBooks
async function getBooks() {
    const res = await fetch("/api/books");
    if (!res.ok) throw new Error("Gagal mengambil data buku");
    return await res.json();
}

// (Jika ada apiDeleteBook, tambahkan juga di sini)
async function apiDeleteBook(id) {
    const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Gagal menghapus buku");
}

export default function BookList() {
    const router = useRouter();
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");

    // Proteksi login & ambil username
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const uname = localStorage.getItem("username");
        if (!isLoggedIn) {
            router.replace("/login");
        } else {
            setUsername(uname || "");
        }
    }, [router]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchData();
    }, []);

    const deleteBook = async (id) => {
        try {
            await apiDeleteBook(id);
            setBooks(prevBooks => prevBooks.filter(b => b.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        router.replace("/login");
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
                {/* User Info & Logout */}
                <div className="flex justify-end items-center mb-4">
                    <span className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                        <span role="img" aria-label="user">👤</span>
                        <span>{username}</span>
                        <button
                            onClick={handleLogout}
                            className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                        >
                            Logout
                        </button>
                    </span>
                </div>
                <h1 className="text-4xl font-extrabold mb-8">📚 Daftar Buku</h1>
                <div className="mb-6">
                    <Link href="/books/add">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow transition">
                            ➕ Tambah Buku
                        </button>
                    </Link>
                </div>
                <div className="overflow-hidden rounded-lg shadow-lg">
                    <table className="w-full bg-gray-800 text-white">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-700 to-gray-900 text-white text-left text-sm uppercase">
                                <th className="py-4 px-6">Judul</th>
                                <th className="py-4 px-6">Penulis</th>
                                <th className="py-4 px-6">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-8 text-gray-400">
                                        📖 Tidak ada buku yang tersedia.
                                    </td>
                                </tr>
                            ) : (
                                books.map((book) => (
                                    <tr key={book.id} className="border-b border-gray-700 hover:bg-gray-700">
                                        <td className="py-4 px-6">{book.title}</td>
                                        <td className="py-4 px-6">{book.author}</td>
                                        <td className="py-4 px-6 flex gap-2">
                                            <Link href={`/books/${book.id}`}>
                                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition">
                                                    ✏️ Edit
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => deleteBook(book.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
                                            >
                                                🗑️ Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}