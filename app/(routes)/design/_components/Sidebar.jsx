import React, { useState } from 'react'
import { sideBarMenu } from '@/services/Options'
import SideBarSettings from './SideBarSettings'

function Sidebar() {

    const [selectedOption, setSelectedOption]=useState(null);

    return (
        <div className='flex'>
            <div className='p-2 w-[120px] border-r h-screen'>
            {sideBarMenu.map(( menu, index ) =>(
                <div key={index} className={`flex items-center gap-4 p-2 hover:bg-secondary rounded-xl flex-col mb-3
                cursor-pointer shadow-sm ${menu.name == selectedOption?.name && 'bg-secondary'}`}
                onClick={()=>setSelectedOption(menu)}>
                    <menu.icon strokeWidth={1.5} />
                    <h2 className='font-medium mt-1'>{menu.name}</h2>
                </div>
            ))}
            </div>
            <SideBarSettings selectedOption={selectedOption} />
        </div>
    )
}

export default Sidebar