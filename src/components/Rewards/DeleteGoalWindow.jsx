import React from 'react'
import { motion } from 'framer-motion'

function DeleteGoalWindow({ goal, handleCancel, handleConfirm }) {




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
                <h1 className='text-xl text-white font-bold'>Delete "{goal.title}"? achieved prize will remove too!</h1>
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

export default DeleteGoalWindow