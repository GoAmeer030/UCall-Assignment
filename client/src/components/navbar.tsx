import { ModeToggle } from "@/components/theme-toggle";
import AddBookButton from "@/components/addBookButton";

export default function Navbar() {
    return (
        <div className="bg-[rgba(255,255,255,0.5)]">
            <nav className="h-[4rem] w-[90%] lg:w-[75%] md:w-[90%] m-auto flex justify-around border mt-8 fixed top-0 left-0 right-0 z-2 bg-foreground rounded-md">
                <div className="w-[50%] h-full flex items-center justify-start pl-3">
                    <p className="text-[1.25rem] font-bold tracking-wider text-background">UCall - BOOKs</p>
                </div>

                <div className="w-[50%] h-full flex gap-2 items-center justify-end pr-3">
                    <AddBookButton />
                    <ModeToggle />
                </div>
            </nav>
        </div>
    );
}