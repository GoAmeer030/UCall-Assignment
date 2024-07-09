import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from "react";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Book, useBookStore } from "@/stores/bookStore";
import { useParamStore } from '@/stores/paramStore';

export default function UpdateBookForm({
    id,
    title: initialTitle,
    author: initialAuthor,
    year: initialYear,
}: Book) {
    const updateBookValidationSchema = z.object({
        title: z.string().min(1).max(255),
        author: z.string().min(1).max(50),
        year: z.number().min(1),
    });

    const form = useForm<z.infer<typeof updateBookValidationSchema>>({
        resolver: zodResolver(updateBookValidationSchema),
        defaultValues: {
            title: initialTitle,
            author: initialAuthor,
            year: initialYear,
        }
    });

    const { toast } = useToast();
    const { updateBook } = useBookStore();
    const { setUpdateBookDialogTrigger } = useParamStore();

    const [title, setTitle] = useState<string>(initialTitle);
    const [author, setAuthor] = useState<string>(initialAuthor);
    const [year, setYear] = useState<number>(initialYear);

    const handleUpdate = async () => {
        const book = {
            title,
            author,
            year
        }

        try {
            const response = await axios.put(import.meta.env.VITE_SERVER_URL + "/books/" + id, book);
            if (response.status !== 200) {
                throw new Error("Failed to update the book.");
            }

            updateBook({ id, ...book });

            toast({
                title: "Book updated",
                description: "The book has been updated successfully."
            });

            setTitle("");
            setAuthor("");
            setYear(0);

            setUpdateBookDialogTrigger(false);
        } catch (err) {
            toast({
                title: "Update failed",
                description: "Failed to update the book."
            });
            console.error(err);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleUpdate)}
                className="flex flex-col gap-3 mt-4"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Atomic Habits"
                                    {...field}
                                    value={title}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                        setTitle(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage className="ml-1 text-[0.7rem]" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="James Clear"
                                    {...field}
                                    value={author}
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                        setAuthor(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage className="ml-1 text-[0.7rem]" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="2018"
                                    {...field}
                                    value={year}
                                    onChange={(e) => {
                                        field.onChange(Number(e.target.value));
                                        setYear(Number(e.target.value));
                                    }}
                                />
                            </FormControl>
                            <FormMessage className="ml-1 text-[0.7rem]" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full mt-3">
                    Update
                </Button>
            </form>
        </Form>
    );
}