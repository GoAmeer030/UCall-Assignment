import { useEffect } from "react";
import { useBookStore } from "@/stores/bookStore";
import BookCard from "@/components/bookCard";

export default function BooksSection() {
    const { books, fetchBooks } = useBookStore();

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <div className="flex items-center justify-center w-full mt-32">
            <div className="flex flex-wrap gap-6 justify-center items-start max-w-max">
                {books.map((book) => (
                    <BookCard {...book} key={book.id} />
                ))}
            </div>
        </div>
    );
}