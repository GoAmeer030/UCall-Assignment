import AddBookForm from '@/components/form/addBookForm';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { useParamStore } from '@/stores/paramStore';

export default function AddBookDialog() {
    const { addBookDialogTrigger, setAddBookDialogTrigger } = useParamStore();

    return (
        <Dialog
            open={addBookDialogTrigger}
            onOpenChange={(open) => {
                setAddBookDialogTrigger(open);
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Book</DialogTitle>
                    <DialogDescription>
                        Add Book by entering the details. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <AddBookForm />
            </DialogContent>
        </Dialog>
    );
}