import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/component/sidebar";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/category")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);

    const deleteCategory = async (id) => {
        const confirmed = confirm("Yakin ingin menghapus kategori ini?");
        if (!confirmed) return;

        try {
            const res = await fetch(`/api/category/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                try {
                    await res.json();
                } catch (err) {}

                setCategories((prev) => prev.filter((cat) => cat.id !== id));
            } else {
                alert("Gagal menghapus kategori");
            }
        } catch (error) {
            console.error("Error saat menghapus:", error);
            alert("Terjadi kesalahan saat menghapus kategori");
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
                <h1 className="text-4xl font-extrabold mb-8">📂 Daftar Kategori</h1>

                <div className="mb-6">
                    <Link href="/category/add">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow transition">
                            ➕ Tambah Kategori
                        </button>
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg shadow-lg">
                    <table className="w-full bg-gray-800 text-white">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-700 to-gray-900 text-white text-left text-sm uppercase">
                                <th className="py-4 px-6">Nama Kategori</th>
                                <th className="py-4 px-6">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan="2" className="text-center py-8 text-gray-400">
                                        📂 Tidak ada kategori yang tersedia.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((cat) => (
                                    <tr key={cat.id} className="border-b border-gray-700 hover:bg-gray-700">
                                        <td className="py-4 px-6">{cat.name}</td>
                                        <td className="py-4 px-6 flex gap-2">
                                            <Link href={`/category/${cat.id}`}>
                                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition">
                                                    ✏️ Edit
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => deleteCategory(cat.id)}
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