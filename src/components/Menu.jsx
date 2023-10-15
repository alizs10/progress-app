import React from 'react'
import SettingsIcon from './icons/SettingsIcon'
import ListIcon from './icons/ListIcon'
import useProgressesStore from '../../store/progresses'
import { motion } from 'framer-motion'

function Menu() {

    const { showAllProgresses, showProgressesType } = useProgressesStore()

    return (
        <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0' }}
            exit={{ y: '100%' }}
            transition={{ bounce: 'none' }}
            className='fixed left-0 bottom-14 bg-gray-800 rounded-tr-xl overflow-hidden z-30'>
            <ul className='flex flex-col gap-0 text-base'>
                <li
                    onClick={showAllProgresses}
                    className={`px-7 py-5 text-white cursor-pointer select-none flex gap-x-3 ${showProgressesType === 1 && 'bg-gray-700'}`}>
                    <span>
                        <ListIcon />
                    </span>
                    <span>All Progresses</span>
                </li>
                <li className='px-7 py-5 text-white cursor-pointer select-none flex gap-x-3'>
                    <span>
                        <SettingsIcon />
                    </span>
                    <span>Settings</span>
                </li>
            </ul>
        </motion.div>
    )
}

export default Menu