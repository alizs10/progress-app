import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

function About({ handleClose }) {

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
            onClick={handleClose}
            className='fixed inset-0 z-[99999] backdrop-blur-sm'>
            <motion.div
                initial={{ scale: 0, x: '-50%', y: '-50%' }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ bounce: 'none', duration: '.3' }}
                onClick={e => e.stopPropagation()}
                className='fixed w-[80vw] max-w-[480px] flex flex-col top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-slate-800 shadow-md shadow-black'>
                <div className='p-5 flex flex-col gap-y-4'>
                    <h1 className='text-2xl text-white'>About App</h1>
                    <p className='text-lg text-gray-200'>
                        Developed by @alizs10 in october 2023
                        version: 1.0.0
                    </p>

                </div>

                <button
                    onClick={handleClose}
                    className='mt-auto bg-red-600 text-white text-lg py-2'>
                    Close
                </button>

            </motion.div>
        </motion.div>

    )
}

export default About