import React, { useEffect } from 'react'
import SettingsIcon from './icons/SettingsIcon'
import ListIcon from './icons/ListIcon'
import useProgressesStore from '../../store/progresses-store'
import { motion } from 'framer-motion'
import InfoIcon from './icons/InfoIcon'

function Menu({ handleOpenSettings, handleOpenAbout }) {

    const { showProgresses, selectedLabel, showProgressesType } = useProgressesStore()


    useEffect(() => {
        // this will disable the scroll if our back page was scrollable
        document.body.classList.add("overflow-hidden");
        // when you close the modal, remove this class 
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    return (
        <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0' }}
            exit={{ y: '100%' }}
            transition={{ bounce: 'none' }}
            className='fixed left-0 bottom-14 bg-gray-800 rounded-tr-xl overflow-hidden z-30'>
            <ul className='flex flex-col gap-0 text-base'>
                <li
                    onClick={() => showProgresses({ labelId: selectedLabel, pgType: 1 })}
                    className={`px-7 py-5 text-white cursor-pointer select-none flex gap-x-3 ${showProgressesType === 1 && 'bg-gray-700'}`}>
                    <span>
                        <ListIcon />
                    </span>
                    <span>All Progresses</span>
                </li>
                <li
                    onClick={handleOpenSettings}
                    className='px-7 py-5 text-white cursor-pointer select-none flex gap-x-3'>
                    <span>
                        <SettingsIcon />
                    </span>
                    <span>Settings</span>
                </li>
                <li
                    onClick={handleOpenAbout}
                    className='px-7 py-5 text-white cursor-pointer select-none flex gap-x-3'>
                    <span>
                        <InfoIcon />
                    </span>
                    <span>About</span>
                </li>
            </ul>
        </motion.div>
    )
}

export default Menu