import { create } from 'zustand'


const useAppStore = create((set) => ({

    userHints: false,
    closeHints: payload => set(() => ({ userHints: false })),

    rewardsVis: true,
    openRewards: payload => set(() => ({ rewardsVis: true })),
    closeRewards: payload => set(() => ({ rewardsVis: false })),



}))

export default useAppStore;