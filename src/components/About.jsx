import React, { useEffect, useState } from 'react'
import SettingsIcon from './icons/SettingsIcon'
import CheckBox from './CheckBox';
import SunIcon from './icons/SunIcon';
import Dropdown from './Dropdown';
import GridIcon from './icons/GridIcon';


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
        <div className='fixed inset-0 z-[999] backdrop-blur-sm'>
            <div className='fixed w-[80vw] max-w-[480px] flex flex-col top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-slate-800 shadow-md shadow-black'>
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

            </div>
        </div>

    )
}

export default About