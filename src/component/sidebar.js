import React from "react";
import { Book, List } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
    const router = useRouter();

    return (
        <aside className="w-72 bg-gradient-to-b from-gray-900 to-black text-white shadow-lg h-screen flex flex-col">
            <div className="text-4xl font-extrabold mb-8 p-8 flex items-center gap-3">
                <Book size={35} className="text-yellow-400" />
                <span className="tracking-wide">MyLibrary</span>
            </div>
            <nav className="flex-1">
                <SidebarItem
                    icon={<List size={24} />}
                    label="Daftar Buku"
                    href="/"
                    active={router.pathname === "/"}
                />
                <SidebarItem
                    icon={<Book size={24} />}
                    label="Kategori"
                    href="/category"
                    active={router.pathname === "/category"}
                />
            </nav>
        </aside>
    );
}

function SidebarItem({ icon, label, href, active }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-4 px-8 py-4 text-lg font-semibold rounded-lg transition 
                ${active ? "bg-yellow-400 text-blue-900" : "hover:bg-gray-700 hover:text-yellow-300"}`}
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
}