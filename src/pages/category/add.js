import { useRouter } from "next/router";
import CategoryForm from "@/component/CategoryForm";

export default function CategoryAdd() {
    const router = useRouter();

    // Fungsi untuk menangani submit form kategori
    const addCategory = async (category) => {
        const res = await fetch("http://localhost:3000/api/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        });

        // Cek apakah permintaan berhasil
        if (res.ok) {
            router.push("/category"); // Redirect ke halaman daftar kategori
        } else {
            alert("Gagal menambahkan kategori");
        }
    };

    return (
        <div>
            <CategoryForm category={{}} onSubmit={addCategory} />
        </div>
    );
}
