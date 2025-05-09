import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CategoryForm from '../../component/CategoryForm'; // Formulir kategori

export default function EditCategory() {
    const router = useRouter();
    const { id } = router.query; // Ambil id kategori dari URL
    const [category, setCategory] = useState(null);

    // Fungsi untuk mengambil data kategori berdasarkan id
    const _getCategoryById = async () => {
        if (id) {
            const res = await fetch(`/api/category/${id}`);
            if (res.ok) {
                const data = await res.json();
                setCategory(data);
            } else {
                alert("Kategori tidak ditemukan!");
                router.push('/category'); // Kembali ke daftar kategori jika kategori tidak ditemukan
            }
        }
    };

    useEffect(() => {
        _getCategoryById();
    }, [id]);

    // Fungsi untuk memperbarui kategori
    const updateCategory = async (data) => {
        const res = await fetch(`/api/category/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            router.push('/category'); // Arahkan ke halaman daftar kategori setelah berhasil
        } else {
            alert("Gagal memperbarui kategori");
        }
    };

    // Menampilkan pesan loading jika data kategori belum diambil
    if (!category) return <p>Loading...</p>;

    return <CategoryForm category={category} onSubmit={updateCategory} />;
}
