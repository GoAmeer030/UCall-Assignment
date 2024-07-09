import { Card } from "@/components/ui/card"

import { useParamStore } from "@/stores/paramStore";

export default function AddBookButton() {
    const { setAddBookDialogTrigger } = useParamStore();

    return (
        <Card
            className="relative h-[2.5rem] max-w-fit cursor-pointer z-30 flex items-center justify-center rounded-md bg-background hover:bg-secondary"
            onClick={() => setAddBookDialogTrigger(true)}
        >
            <div className="flex gap-2 items-center z-10 ml-2 mr-2 sm:mr-3">
                <span className="text-lg">
                    &nbsp;+&nbsp;
                </span>

                <div className="hidden sm:flex flex-col h-full justify-center">
                    <p className="font-semibold">
                        Add Book
                    </p>
                </div>
            </div>
        </Card>
    );
}