import React from 'react'
import CheckIcon from './icons/CheckIcon'

function ThemeSelector({ themes, progressTheme, handleSelectTheme }) {
    return (
        <div
            onClick={e => e.stopPropagation()}
            className='p-5 fixed w-[70vw] max-w-[420px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-slate-800 z-[999] shadow-md shadow-black rounded-xl flex flex-col gap-2'>
            <h2 className='text-lg text-white'>Select Theme</h2>
            <div className='grid grid-cols-6 gap-2'>
                {themes.map(theme => <div
                    key={theme}
                    onClick={() => handleSelectTheme(theme)}
                    className={`col-span-1 aspect-square flex justify-center items-center border-2 border-gray-500 pg-bar-theme-${theme} rounded-full`}>
                    {theme === progressTheme && (<div className='w-5'>
                        <CheckIcon />
                    </div>)}
                </div>)}
            </div>
        </div>
    )
}

export default ThemeSelector