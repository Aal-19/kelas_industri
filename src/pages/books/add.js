import { useRouter } from "next/router";
import BookForm  from "../../component/BookForm";

export default function BookAdd() {
    const router = useRouter();
    const Addbook = async (book) => {
        const res = await fetch("http://localhost:3000/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        });
        if (res.ok) {
            router.push("/books");
        }
    }

    return (
        <div>
            <BookForm book={{}} onSubmit={Addbook} />
        </div>
    );
}