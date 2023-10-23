import React from 'react';
import { motion } from 'framer-motion'
import InfoIcon from '../icons/InfoIcon';

function Notification({ notification }) {


    function notificationStatus(status, part) {

        if (part === 0) {

            switch (status) {
                case 0:
                    return 'notification-style-part0-1'
                    break;
                case 1:
                    return 'notification-style-part0-2'
                    break;
                case 2:
                    return 'notification-style-part0-3'
                    break;
                case 3:
                    return 'notification-style-part0-4'
                    break;

                default:
                    return 'notification-style-part0-4'
                    break;
            }
        }
        else {

            switch (status) {
                case 0:
                    return 'notification-style-1'
                    break;
                case 1:
                    return 'notification-style-2'
                    break;
                case 2:
                    return 'notification-style-3'
                    break;
                case 3:
                    return 'notification-style-4'
                    break;

                default:
                    return 'notification-style-4'
                    break;
            }
        }
    }


    let h = 0 + (notification.index) * 50;
    let startY = (notification.index + 1) * 250;

    return (
        <motion.div
            initial={{ y: -startY, left: '50%', x: '-50%' }}
            animate={{ y: h }}
            exit={{ opacity: [1, 0], scale: [1, 0] }}
            transition={{ duration: '.3', delay: '0.1' }}
            className={`${notificationStatus(notification.status, 1)} select-none fixed overflow-hidden whitespace-nowrap flex items-center top-5 z-[99999999] text-white text-md font-bold rounded-full shadow-lg dark:shadow-gray-900 shadow-gray-200`}>
            <div className={`py-2 pl-3 pr-2 ${notificationStatus(notification.status, 0)}`}>
                <div className='w-6'>
                    <InfoIcon />
                </div>
            </div>
            <span className="py-2 pr-3 pl-2">
                {notification.message}
            </span>
        </motion.div>
    )
}

export default Notification;