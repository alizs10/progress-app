import React, { useState } from 'react'
import ChevronDownIcon from './icons/ChevronDownIcon'
import { AnimatePresence, motion } from 'framer-motion'

function Dropdown({ options, value = 0, handleChange }) {

    const [optionsVis, setOptionsVis] = useState(false)

    function toggleDropdown() {
        setOptionsVis(prevState => !prevState)
    }

    function handleClickOnOption(choice) {
        handleChange(choice)
        toggleDropdown()
    }

    let selectedOption = options.filter(op => op.value === value)[0]


    return (

        <section className='relative w-full'>

            <div className={`absolute inset-0 z-0 rounded-xl ${optionsVis && 'rounded-b-none'} transition-all duration-400 bg-gray-700`}></div>
            <ul className='relative flex flex-col gap-0'>
                <li
                    onClick={toggleDropdown}
                    className='px-3 py-2 flex justify-between items-center z-10 text-white'>
                    <span className='text-sm'>{selectedOption.name}</span>
                    <span className='w-4'>
                        <ChevronDownIcon />
                    </span>
                </li>


                <AnimatePresence mode='wait'>
                    {optionsVis && (
                        <motion.li
                            initial={{ height: '0' }}
                            animate={{ height: 'auto' }}
                            exit={{ height: '0' }}
                            transition={{ bounce: 'none', duration: '.05' }}
                            className='absolute overflow-hidden top-full h-0 overflow-y-scroll z-[9999] left-0 right-0 flex flex-col gap-0 bg-gray-700 rounded-b-xl'
                        >
                            {options.map((op) => <span onClick={() => handleClickOnOption(op.value)} key={op.value} className={`cursor-pointer min-h-fit line-clamp-1 px-3 py-3 text-xs ${op.value === value ? 'text-emerald-600' : 'text-white'}`}>{op.name}</span>)}
                        </motion.li>
                    )}
                </AnimatePresence>


            </ul>
        </section>
    )
}

export default Dropdown