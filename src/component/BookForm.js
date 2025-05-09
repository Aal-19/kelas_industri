'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/component/sidebar";

export default function BookForm() {
    const router = useRouter();
    const params = useParams();
    const isEdit = Boolean(params?.id);

    const [form, setForm] = useState({
        title: "",
        author: "",
    });

    useEffect(() => {
        if (isEdit) {
            fetch(`/api/books/${params.id}`)
                .then((res) => res.json())
                .then((data) => setForm({ title: data.title, author: data.author }))
                .catch(() => alert("Gagal mengambil data buku"));
        }
    }, [isEdit, params.id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = isEdit ? "PUT" : "POST";
        const url = isEdit ? `/api/books/${params.id}` : "/api/books";

        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            router.push("/"); // Redirect ke dashboard
        } else {
            alert(isEdit ? "Gagal mengedit buku" : "Gagal menambahkan buku");
        }
    };

    return (
        <div className="flex bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
            <Sidebar />
            <div className="flex-1 p-8">
                <h1 className="text-4xl font-extrabold mb-8">
                    {isEdit ? "✏️ Edit Buku" : "➕ Tambah Buku"}
                </h1>
                <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2 text-gray-300">Judul Buku</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-600 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold mb-2 text-gray-300">Penulis</label>
                        <input
                            type="text"
                            name="author"
                            value={form.author}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-600 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-lg shadow-md transition"
                    >
                        {isEdit ? "Update" : "Simpan"}
                    </button>
                </form>
            </div>
        </div>
    );
}