import React, { useEffect, useState } from 'react'
import SettingsIcon from './icons/SettingsIcon'
import CheckBox from './CheckBox';
import SunIcon from './icons/SunIcon';
import Dropdown from './Dropdown';
import GridIcon from './icons/GridIcon';


function Settings({ handleClose }) {

    useEffect(() => {
        // this will disable the scroll if our back page was scrollable
        document.body.classList.add("overflow-hidden");
        // when you close the modal, remove this class 
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    const [darkMode, setDarkMode] = useState(true)
    const [itemViewStyle, setItemViewStyle] = useState(0)
    const itemViewOptions = ['List', 'Grid']


    function handleChangeItemViewStyle(index) {
        setItemViewStyle(index)
    }

    function toggleDarkMode() {
        setDarkMode(prevState => !prevState)
    }
    return (
        <div className='fixed inset-0 backdrop-blur-sm z-40'>
            <div className='fixed w-[80vw] max-w-[480px] flex flex-col top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-slate-800 shadow-md shadow-black'>

                <div className='flex flex-nowrap items-start gap-x-2 p-3 mt-2 text-white text-lg'>
                    <span className='w-5'>
                        <SettingsIcon />
                    </span>
                    <h2>Settings</h2>
                </div>
                <div className='mb-4 p-3'>
                    <ul className='flex flex-col gap-y-3 text-white text-base'>
                        <li className='flex justify-between items-center'>
                            <div className='flex gap-x-2'>
                                <span className='w-6'>
                                    <SunIcon />
                                </span>
                                <span>Light Theme</span>
                            </div>
                            <CheckBox handleToggle={toggleDarkMode} value={!darkMode} />
                        </li>
                        <li className='flex justify-between items-center'>
                            <div className='flex gap-x-2'>
                                <span className='fill-white w-6'>
                                    <GridIcon />
                                </span>
                                <span>Items View Style</span>
                            </div>
                            <span className=''>
                                <Dropdown options={itemViewOptions} value={itemViewStyle} handleChange={handleChangeItemViewStyle} />
                            </span>

                        </li>
                        <li className='mt-4'>
                            <button className='px-3 py-2 rounded-full bg-red-600 text-white font-bold text-sm capitalize'>delete account</button>
                        </li>
                    </ul>
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

export default Settings