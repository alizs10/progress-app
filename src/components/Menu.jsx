import React, { useEffect } from 'react'
import SettingsIcon from './icons/SettingsIcon'
import useProgressesStore from '../../store/progresses-store'
import { motion } from 'framer-motion'
import InfoIcon from './icons/InfoIcon'
import MoonIcon from './icons/MoonIcon'

function Menu({ handleOpenSettings, handleOpenAbout }) {

    const { showProgresses, selectedLabel } = useProgressesStore()


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
            onClick={e => e.stopPropagation()}
            className='fixed inset-0 top-auto px-10 pb-10 bg-gray-800 rounded-t-3xl overflow-hidden z-[99999999999]'>
            <div className="mt-2 mb-10 w-1/5 h-1 bg-gray-600 rounded-full self-center mx-auto"></div>
            <ul className='grid grid-cols-2 gap-2 text-base'>

                <li
                    onClick={handleOpenSettings}
                    className='col-span-1 flex-col justify-center items-center text-xl rounded-xl gap-y-2 px-7 py-5 text-white cursor-pointer select-none flex gap-x-3  hover:bg-gray-700 transition-all duration-300'>
                    <div className='w-10'>
                        <SettingsIcon />
                    </div>
                    <span>Settings</span>
                </li>
                <li
                    onClick={handleOpenAbout}
                    className='col-span-1 flex-col justify-center items-center text-xl rounded-xl gap-y-2 px-7 py-5 text-white cursor-pointer select-none flex gap-x-3  hover:bg-gray-700 transition-all duration-300'>
                    <div className='w-10'>
                        <InfoIcon />
                    </div>
                    <span>About</span>
                </li>
                <li
                    onClick={() => showProgresses({ labelId: selectedLabel, pgType: 1 })}
                    className={`col-span-2 justify-center items-center border-2 border-gray-700 text-xl rounded-xl gap-y-2 px-7 py-5 text-white cursor-pointer select-none flex gap-x-3 hover:bg-gray-700 transition-all duration-300`}>
                    <div className='w-7'>
                        <MoonIcon />
                    </div>
                    <span>Lights off</span>
                </li>

                <li className='text-gray-600 text-xs col-span-2 mt-10 text-center'>
                    <p>Designed by @alizs10 - version: 1.0.0</p>
                </li>
            </ul>
        </motion.div>
    )
}

export default Menu