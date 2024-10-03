import React from 'react'
import UserProfileIcon from './icons/UserProfileIcon'
import { motion } from 'framer-motion'

function ProfilePopup() {
    return (
        <motion.div
            initial={{ x: '100%', scale: 0 }}
            animate={{ x: '0', scale: 1 }}
            exit={{ x: '100%', scale: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            onClick={e => e.stopPropagation()}
            className='absolute top-16 right-3 p-3 flex flex-col gap-y-4 rounded-xl bg-slate-800 shadow-md shadow-black'>
            <div className="flex gap-x-10 items-start">
                <div className="flex flex-col gap-y-1 my-1">
                    <h1 className='text-xs text-white'>ali.text77@gmail.com</h1>
                    <span className="text-emerald-600 text-[10px] font-bold">Active</span>
                </div>
                <div className="rounded-full flex justify-center shadow-sm shadow-black items-center bg-slate-700">
                    <div className="w-10 h-10 text-white">
                        <UserProfileIcon />
                    </div>
                </div>

            </div>

            <button className='text-white text-xs bg-red-600 py-1 rounded-md'>
                Logout
            </button>
        </motion.div>
    )
}

export default ProfilePopup