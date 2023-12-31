import React from 'react'
import useProgressesStore from '../../store/progresses-store'
import { useNotificationsStore } from '../../store/notification-store'
import { motion } from 'framer-motion'

function DeleteProgressConfirmationWindow() {

    const { addNotification, removeNotification } = useNotificationsStore()
    const { setDeleteConfirmationVis, progressInFocus, editingProgress, editingProgressVis, setFocusMode, deleteProgress, setEditingProgressVis } = useProgressesStore()

    let progress = editingProgressVis ? editingProgress : progressInFocus

    function handleConfirm() {
        deleteProgress(progress._id)
        if (editingProgress) {
            setEditingProgressVis(false)
        }
        setDeleteConfirmationVis(false)
        setFocusMode(false)

        let newNotify = {
            _id: Date.now(),
            index: 0,
            message: 'progress deleted permanently!',
            status: 1
        }
        addNotification(newNotify)
        setTimeout(() => {
            removeNotification(newNotify._id)
        }, 3000)
    }

    function handleCancel() {
        setDeleteConfirmationVis(false)
    }

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ bounce: 'none', duration: '.3' }}
            onClick={handleCancel}
            className='fixed inset-0 flex justify-center items-center z-[9999999]'>

            <div
                onClick={e => e.stopPropagation()}
                className='p-5 w-[70vw] max-w-[420px] bg-slate-800 shadow-md shadow-black rounded-xl flex flex-col gap-4'>
                <h1 className='text-xl text-white font-bold'>Delete "{progress.title}"?</h1>
                <div className='grid grid-cols-2 gap-x-2'>
                    <button
                        onClick={handleConfirm}
                        className='col-span-1 text-center py-2 text-base text-white font-bold bg-red-600 rounded-full'>Delete</button>
                    <button
                        onClick={handleCancel}
                        className='col-span-1 text-center py-2 text-base text-white font-bold bg-gray-500 rounded-full'>Cancel</button>
                </div>
            </div>
        </motion.div>
    )
}

export default DeleteProgressConfirmationWindow