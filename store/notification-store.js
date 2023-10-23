import { create } from 'zustand'

export const useNotificationsStore = create((set) => ({


    notificationVis: true,
    setNotificationVis: (payload) => set(() => ({ notificationVis: payload })),

    notifications: [],
    setNotifications: (payload) => set(() => ({ notifications: payload })),
    addNotification: (payload) => set((state) => {

        let newNotify = payload

        let newNotifications = state.notifications.map(notify => ({ ...notify, index: notify.index + 1 }))

        return { notifications: [...newNotifications, newNotify] }
    }),
    removeNotification: (payload) => set((state) => {

        let noId = payload;
        let noIns = [...state.notifications]
        let filteredNotifications = noIns.filter(n => n._id !== noId)

        return { notifications: filteredNotifications }

    }),

}))