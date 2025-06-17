import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BookForm from "@/component/BookForm"; // Pastikan path sesuai

// Fungsi untuk mengambil data buku berdasarkan id
async function getBook(id) {
    const res = await fetch(`/api/books/${id}`);
    if (!res.ok) throw new Error("Gagal mengambil data buku");
    return await res.json();
}

export default function EditBook() {
    const router = useRouter();
    const { id } = router.query;

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        async function fetchBook() {
            setLoading(true);
            try {
                const data = await getBook(id);
                setTitle(data.title || '');
                setAuthor(data.author || '');
            } catch (error) {
                setError("Gagal Memuat Data Buku");
            } finally {
                setLoading(false);
            }
        }
        fetchBook();
    }, [id]);

    const updateBook = async (data) => {
        setSaving(true);
        try {
            await fetch(`/api/books/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            router.push('/books');
        } catch (err) {
            setError("Gagal menyimpan perubahan");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    const book = { title, author };

    return <BookForm book={book} onSubmit={updateBook} error={error} saving={saving} />;
}