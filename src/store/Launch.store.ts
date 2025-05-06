import { create } from 'zustand';

interface Launch_Store{
    showModal: boolean;
    modalIndex: number;
    toggleModal: () => void;
    setModalIndex: (index: number) => void;
}


export const useLaunchStore = create<Launch_Store>()((set) => ({
    showModal: false,
    modalIndex: 0,
    toggleModal: () => set((state) => ({ showModal: !state.showModal })),
    setModalIndex: (index: number) => set(() => ({ modalIndex: index }))
}));