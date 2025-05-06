import { create } from 'zustand';

interface Rocket_Store{
    showModal: boolean;
    modalIndex: number;
    toggleModal: () => void;
    setModalIndex: (index: number) => void;
}


export const useRocketStore = create<Rocket_Store>()((set) => ({
    showModal: false,
    modalIndex: 0,
    toggleModal: () => set((state) => ({ showModal: !state.showModal })),
    setModalIndex: (index: number) => set(() => ({ modalIndex: index }))
}));
