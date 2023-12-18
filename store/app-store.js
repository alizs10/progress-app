import { create } from 'zustand'


const useAppStore = create((set) => ({

    userHints: false,
    closeHints: payload => set(() => ({ userHints: false })),

    rewardsVis: true,



}))

export default useAppStore;