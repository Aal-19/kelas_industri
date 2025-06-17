import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
    const [form, setForm] = useState({ username: "", password: "" });
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (res.ok) {
            alert("Registrasi berhasil! Silakan login.");
            router.push("/login");
        } else {
            alert("Registrasi gagal!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-lg">
                <h1 className="text-2xl mb-4">Register</h1>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    className="mb-4 w-full px-4 py-2 rounded bg-gray-700"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="mb-4 w-full px-4 py-2 rounded bg-gray-700"
                    required
                />
                <button type="submit" className="bg-green-600 px-4 py-2 rounded w-full">Register</button>
            </form>
        </div>
    );
}