import React from 'react'

function SideBarSettings({selectedOption}) {
  return (
    <div className='p-5 w-[280px] border-r h-screen border-r mpt-2'>
        <h2 className='text-lg font-bold'>
        {selectedOption?.name}
        </h2>
        <p className='text-sm text-gray-500'>{selectedOption?.desc}</p>
    </div>
  )
}

export default SideBarSettings