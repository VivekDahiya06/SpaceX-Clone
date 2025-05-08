import { create } from 'zustand';

interface Crew_Store{
    filterOpen: boolean,
    filterType: string,
    filterValue: string,
    toggleFilter: () => void,
    setType: (type: string) => void,
    setValue: (value: string) => void
}


export const useCrewStore = create<Crew_Store>()((set) => ({
    filterOpen: false,
    filterType: '',
    filterValue: '',
    toggleFilter: () => set((state) => ({filterOpen: !state.filterOpen})),
    setType: (type: string) => set(() => ({filterType: type})),
    setValue: (value: string) => set(() => ({filterValue: value}))
}));