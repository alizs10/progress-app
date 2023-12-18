import React from 'react'
import CheckIcon from '../icons/CheckIcon'
import { AnimatePresence, motion } from 'framer-motion'

function CheckboxInput({ value, handleToggle }) {

    return (
        <div onClick={handleToggle} className={`rounded-md border-2 border-blue-600 w-5 h-5 relative`}>
            <AnimatePresence>

                {value && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1] }}
                        exit={{ scale: 0 }}
                        transition={{ duration: .1 }}
                        className="absolute inset-0 bg-blue-600"></motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {value && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.25] }}
                        exit={{ scale: 0 }}
                        transition={{ duration: .1 }}
                        className='absolute bottom-[5%] left-[2%]'>
                        <div className='w-5 rotate-[10deg] text-white'><CheckIcon /></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CheckboxInput