import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/component/sidebar";

export default function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/books")
            .then((res) => res.json())
            .then((data) => setBooks(data));
    }, []);

    const deleteBook = async (id) => {
        const confirmed = confirm("Yakin ingin menghapus buku ini?");
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/books/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                try {
                    await res.json();
                } catch (err) {}
                setBooks((prev) => prev.filter((books) => books.id !== id));
            } else {
                alert("Gagal menghapus buku");
            }
        } catch (error) {
            console.error("Error saat menghapus:", error);
            alert("Terjadi kesalahan saat menghapus buku");
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
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
                                books.map((books) => (
                                    <tr key={books.id} className="border-b border-gray-700 hover:bg-gray-700">
                                        <td className="py-4 px-6">{books.title}</td>
                                        <td className="py-4 px-6">{books.author}</td>
                                        <td className="py-4 px-6 flex gap-2">
                                            <Link href={`/books/${books.id}`}>
                                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition">
                                                    ✏️ Edit
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => deleteBook(books.id)}
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