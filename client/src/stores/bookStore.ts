import axios from "axios";
import { create } from "zustand";

export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
}

interface BookState {
    books: Book[];
    addBook: (book: Book) => void;
    deleteBook: (id: number) => void;
    updateBook: (updatedBook: Book) => void;
    fetchBooks: () => void;
}

export const useBookStore = create<BookState>((set) => ({
    books: [],
    addBook: (book) => set((state) => ({ books: [...state.books, book] })),
    deleteBook: (id) =>
        set((state) => ({ books: state.books.filter((book) => book.id !== id) })),
    updateBook: (updatedBook) =>
        set((state) => ({
            books: state.books.map((book) =>
                book.id === updatedBook.id ? updatedBook : book
            ),
        })),
    fetchBooks: async () => {
        const response = await axios.get(import.meta.env.VITE_SERVER_URL + "/books");
        const books = response.data;
        set({ books });
    },
}));