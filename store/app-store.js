import { create } from 'zustand'


const useAppStore = create((set) => ({

    userHints: true,
    closeHints: payload => set(() => ({ userHints: false })),




}))

export default useAppStore;