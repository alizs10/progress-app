import React from 'react'

function ProgressImportance({ importance }) {


    return (
        <div className={`py-[1px] px-2 rounded-3xl pg-imp-${importance._id} text-[10px] text-white`}>{importance.short}</div>
    )
}

export default ProgressImportance