import React, { useEffect } from 'react'
import useProgressesStore from '../../store/progresses-store'

function FocusMode() {

    useEffect(() => {
        // this will disable the scroll if our back page was scrollable
        document.body.classList.add("overflow-hidden");
        // when you close the modal, remove this class 
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const { setProgressInFocus } = useProgressesStore()

    function handleLooseFocus() {
        setProgressInFocus(null)
    }

    return (
        <div
            onClick={handleLooseFocus}
            className='fixed inset-0 w-full max-w-[600px] left-1/2 -translate-x-1/2 backdrop-blur-sm z-[9999]'>
        </div>
    )
}

export default FocusMode