import { create } from 'zustand';

interface ParamState {
    addBookDialogTrigger: boolean;
    setAddBookDialogTrigger: (trigger: boolean) => void;

    updateBookDialogTrigger: boolean;
    setUpdateBookDialogTrigger: (trigger: boolean) => void;
}

export const useParamStore = create<ParamState>((set) => ({
    addBookDialogTrigger: false,
    setAddBookDialogTrigger: (trigger) => set({ addBookDialogTrigger: trigger }),

    updateBookDialogTrigger: false,
    setUpdateBookDialogTrigger: (trigger) => set({ updateBookDialogTrigger: trigger }),
}));