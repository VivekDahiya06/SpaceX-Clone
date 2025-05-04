import { create } from 'zustand';

interface Counter_Store{
    count: number;
    increment: () => void;
    decrement: () => void;
}


export const useCounterStore = create<Counter_Store>()((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
}))
