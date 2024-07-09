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

import { useBookStore } from "@/stores/bookStore";
import { useParamStore } from '@/stores/paramStore';

export default function AddBookForm() {
    const addBookValidationSchema = z.object({
        title: z.string().min(1).max(255),
        author: z.string().min(1).max(50),
        year: z.number().min(1),
    });

    const form = useForm<z.infer<typeof addBookValidationSchema>>({
        resolver: zodResolver(addBookValidationSchema),
    });

    const { toast } = useToast();
    const { addBook } = useBookStore();
    const { setAddBookDialogTrigger } = useParamStore();

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [year, setYear] = useState<number>(0);

    const handleSave = async () => {
        const book = {
            title,
            author,
            year
        }

        try {
            const response = await axios.post(import.meta.env.VITE_SERVER_URL + "/books", book);
            const id = response.data.id;
            if (!id) {
                throw new Error("Failed to create the book.");
            }

            addBook({ id, ...book });

            toast({
                title: "Book created",
                description: "The book has been created successfully."
            });

            setTitle("");
            setAuthor("");
            setYear(0);
        } catch (err) {
            toast({
                title: "Failed to create book",
                description: "An error occurred while creating the book."
            });
            console.error(err);
        }
        setAddBookDialogTrigger(false);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSave)}
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
                    Save
                </Button>
            </form>
        </Form>
    );
}