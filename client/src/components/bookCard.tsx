import { Book, useBookStore } from "@/stores/bookStore";
import axios from "axios";
import BookEditDialog from "@/components/bookEditDialog";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function BookCard(book: Book) {
    const { toast } = useToast();
    const deleteBook = useBookStore((state) => state.deleteBook);

    const handleDelete = async (bookId: number) => {
        try {
            const response = await axios.delete(import.meta.env.VITE_SERVER_URL + "/books/" + book.id);
            if (response.status === 200) {
                deleteBook(bookId);

                toast({
                    title: "Delete Successful",
                    description: "The book has been deleted successfully."
                });
            } else {
                toast({
                    title: "Delete Failed",
                    description: "Failed to delete the book from the API."
                });
                console.error("Failed to delete the book from the API.");
            }
        } catch (error) {
            console.error("Error deleting the book:", error);
        }
    };

    return (
        <Card className="w-fit h-fit">
            <CardHeader>
                <CardTitle className="text-center">{book.title}</CardTitle>
                <CardDescription className="text-center">by <strong>{book.author}</strong> at <strong>{book.year}</strong></CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-between gap-4">
                <BookEditDialog {...book} />
                <Button size="sm" variant="destructive" onClick={() => handleDelete(book.id)}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}