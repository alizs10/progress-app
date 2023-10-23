import React, { useEffect } from 'react'
import useProgressesStore from '../../store/progresses-store'
import { motion } from 'framer-motion'

function FocusMode() {

    useEffect(() => {
        // this will disable the scroll if our back page was scrollable
        document.body.classList.add("overflow-hidden");
        // when you close the modal, remove this class 
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const { setFocusMode } = useProgressesStore()

    function handleLooseFocus() {
        setFocusMode(false)
    }

    return (
        <motion.div
            initial={{ backdropFilter: 'blur(4px) opacity(0)' }}
            animate={{ backdropFilter: 'blur(4px) opacity(1)' }}
            exit={{ backdropFilter: 'blur(4px) opacity(0)' }}
            transition={{ bounce: 'none', duration: '.3' }}
            onClick={handleLooseFocus}
            className='fixed inset-0 w-full max-w-[600px] left-1/2 -translate-x-1/2 z-[99998]'>
        </motion.div>
    )
}

export default FocusMode