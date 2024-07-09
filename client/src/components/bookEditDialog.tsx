import UpdateBookForm from "@/components/form/updateBookForm";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Book } from "@/stores/bookStore";
import { useParamStore } from "@/stores/paramStore";

export default function BookEditDialog({
    id,
    title: initialTitle,
    author: initialAuthor,
    year: initialYear,
}: Book) {
    const { updateBookDialogTrigger, setUpdateBookDialogTrigger } = useParamStore();

    return (
        <Dialog
            open={updateBookDialogTrigger}
            onOpenChange={(open) => {
                setUpdateBookDialogTrigger(open);
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[400px]">
                <DialogHeader>
                    <DialogTitle>Edit Book</DialogTitle>
                    <DialogDescription>
                        Book will be updated with the given data
                    </DialogDescription>
                </DialogHeader>
                <UpdateBookForm id={id} title={initialTitle} author={initialAuthor} year={initialYear} />
            </DialogContent>
        </Dialog>
    );
}