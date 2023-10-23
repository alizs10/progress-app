import React, { useState } from 'react'
import PinIcon from './icons/PinIcon'
import EditIcon from './icons/EditIcon'
import TrashIcon from './icons/TrashIcon'
import useProgressesStore from '../../store/progresses-store'
import PinSlash from './icons/PinSlash'
import { useNotificationsStore } from '../../store/notification-store'
import { motion } from 'framer-motion'

function ProgressOptions({ progress, progressIndex }) {

    const { addNotification, removeNotification } = useNotificationsStore()
    const { viewMode, setDeleteConfirmationVis, setProgressInFocus, setFocusMode, setEditingProgress, setEditingProgressVis, updateProgress } = useProgressesStore()

    function handleTogglePin() {
        let updatableProgress = {
            _id: progress._id,
            pin: !progress.pin
        }

        updateProgress(updatableProgress)
        setProgressInFocus(null)

        let message = updatableProgress.pin ? 'progress pinned' : 'progress unpinned';

        let newNotify = {
            _id: Date.now(),
            index: 0,
            message,
            status: 3
        }
        addNotification(newNotify)
        setTimeout(() => {
            removeNotification(newNotify._id)
        }, 3000)
    }

    function handleDeleteBtn() {
        setDeleteConfirmationVis(true)
    }

    function handleEditProgress() {
        setEditingProgress(progress)
        setEditingProgressVis(true)
        setFocusMode(false)
        setProgressInFocus(null)
    }

    return (

        <div

            className={`absolute ${viewMode === 0 ? ('bottom-0 translate-y-[120%] left-1/2 -translate-x-1/2') : (progressIndex % 2 === 0 ? 'flex-col bottom-2 right-0 translate-x-[120%]' : 'flex-col bottom-2 left-0 -translate-x-[120%]')} z-[9999] flex  gap-2`}>
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ bounce: 'none', duration: '.3' }}
                onClick={handleTogglePin}
                className='w-fit p-3 flex gap-x-2 items-center rounded-full bg-gray-300 fill-gray-700 text-lg text-center'>
                <div className='w-6'>
                    {progress.pin ? (<PinSlash />) : (<PinIcon />)}
                </div>
            </motion.button>
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ bounce: 'none', duration: '.3' }}
                onClick={handleEditProgress}
                className='w-fit p-3 flex gap-x-2 items-center rounded-full bg-yellow-100 text-yellow-600 text-lg text-center'>
                <div className='w-6'>
                    <EditIcon />
                </div>
            </motion.button>
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ bounce: 'none', duration: '.3' }}
                onClick={handleDeleteBtn}
                className='w-fit p-3 flex gap-x-2 items-center rounded-full bg-red-100 text-red-600 text-lg text-center'>
                <div className='w-6'>
                    <TrashIcon />
                </div>
            </motion.button>
        </div>
    )
}

export default ProgressOptions