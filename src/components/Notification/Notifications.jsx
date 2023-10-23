import React from 'react';
import { AnimatePresence } from "framer-motion";
import Notification from "./Notification";
import { useNotificationsStore } from "../../../store/notification-store";

function Notifications() {

    const { notifications } = useNotificationsStore()

    return (
        <AnimatePresence>
            {notifications.map((notification) => <Notification key={notification._id} notification={notification} />)}
        </AnimatePresence>
    );
}

export default Notifications;