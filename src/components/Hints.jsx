import React, { useEffect } from 'react'
import LightBulbIcon from './icons/LightBulbIcon'
import useAppStore from '../../store/app-store'
import { motion } from 'framer-motion'
function Hints() {

    const { closeHints } = useAppStore()


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
            initial={{ backdropFilter: 'blur(4px) opacity(0)' }}
            animate={{ backdropFilter: 'blur(4px) opacity(1)' }}
            exit={{ backdropFilter: 'blur(4px) opacity(0)' }}
            transition={{ bounce: 'none', duration: '.3' }}
            className='fixed inset-0 z-[99999] backdrop-blur-sm'>
            <motion.div
                initial={{ scale: 0, x: '-50%', y: '-50%' }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ bounce: 'none', duration: '.3' }}
                className='fixed w-[80vw] max-w-[480px] flex flex-col top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-slate-800 shadow-md shadow-black'>

                <div className='flex flex-nowrap items-start gap-x-2 p-3 mt-2 text-yellow-200 text-lg'>
                    <span className='w-5'>
                        <LightBulbIcon />
                    </span>
                    <h2>Hints</h2>
                </div>
                <div className='mb-4 p-3'>
                    <ul className='list-decimal list-inside flex flex-col gap-y-1 text-white text-base'>
                        <li className=''>Swipe Right to step forward</li>
                        <li className=''>Swipe Left to step backward</li>
                        <li className=''>Long Press to see options</li>
                        <li className=''>Tap to open viewer</li>
                    </ul>
                </div>


                <button
                    onClick={closeHints}
                    className='mt-auto bg-emerald-600 text-white text-lg py-2'>
                    Ok
                </button>

            </motion.div>
        </motion.div>

    )
}

export default Hints