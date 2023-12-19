import React from 'react'
import { motion } from 'framer-motion'
import StarIcon from '../icons/StarIcon'


function PrizeCongratsWindow({ handleClose, prize }) {


    return (
        <motion.div
            initial={{ backdropFilter: 'blur(4px) opacity(0)' }}
            animate={{ backdropFilter: 'blur(4px) opacity(1)' }}
            exit={{ backdropFilter: 'blur(4px) opacity(0)' }}
            transition={{ bounce: 'none', duration: '.3' }}
            onClick={handleClose}
            className='fixed inset-0 z-[999999] backdrop-blur-sm'>
            <motion.div
                initial={{ scale: 0, x: "-50%", y: '-50%' }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ bounce: 'none', duration: '.3' }}

                className="relative flex flex-col items-center p-5 gap-y-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

                <div
                    onClick={e => e.stopPropagation()}
                    className='flex flex-col p-5 rounded-xl overflow-hidden shadow-md shadow-black w-fit bg-slate-800 max-w-[480px]'>


                    <div className="p-3 w-fit self-center flex justify-center items-center rounded-full bg-yellow-400 m-3">
                        <div className="w-10 text-black">
                            <StarIcon />
                        </div>

                    </div>

                    <div className="flex-col gap-y-2">
                        <h1 className='text-2xl text-yellow-400 capitalize'>congratulations!</h1>
                        <h1 className='text-center text-2xl text-yellow-400 capitalize'>you've won</h1>
                        <h1 className='px-2 py-1 bg-yellow-400 font-bold text-gray-700 uppercase rounded-full w-fit mx-auto mt-2'>{prize}</h1>
                    </div>


                </div>
                <button onClick={handleClose} className="shadow-md shadow-black rounded-full px-3 py-1 bg-emerald-600 text-white text-md">
                    Awesome
                </button>
            </motion.div>

        </motion.div >
    )
}

export default PrizeCongratsWindow