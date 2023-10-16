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
    return (

        <section className='relative'>

            <div className={`absolute inset-0 z-0 rounded-xl ${optionsVis && 'rounded-b-none'} transition-all duration-400 bg-gray-700`}></div>
            <ul className='relative flex flex-col gap-0'>
                <li
                    onClick={toggleDropdown}
                    className='px-3 py-2 flex gap-x-2 items-center z-10'>
                    <span className='text-sm'>{options[value]}</span>
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
                            className='absolute overflow-hidden h-0 top-full z-0 left-0 right-0 flex flex-col gap-0 bg-gray-700 rounded-b-xl'
                        >
                            {options.map((op, index) => <span onClick={() => handleClickOnOption(index)} key={index} className={`cursor-pointer px-3 py-2 text-xs ${index === value ? 'text-emerald-600' : 'text-white'}`}>{op}</span>)}
                        </motion.li>
                    )}
                </AnimatePresence>


            </ul>
        </section>
    )
}

export default Dropdown