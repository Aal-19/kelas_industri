import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BookForm from '../../component/BookForm';
import { books } from '../../../data';

export default function EditBook() {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState(null);

    const _getBookById = async () => {
        if (id) {
            const res = await fetch(`/api/books/${id}`);
            const data = await res.json();
            setBook(data);
        }
    };

    useEffect(() => {
        _getBookById();
    }, [id]);

    const updateBook = async (data) => {
        await fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        router.push('/books');
    };

    if (!books) return <p>Loading...</p>;
    return <BookForm book={books} onSubmit={updateBook} />;
}
