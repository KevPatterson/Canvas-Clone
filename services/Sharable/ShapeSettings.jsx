import React from 'react'
import { shapesSettingsList } from '../Options'
import { Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"

function ShapeSettings() {
    return (
        <div className='flex gap-6'>
            {shapesSettingsList.map((shape, index) => (
                <div key={index} className='hover:scale-105 transition-all rounded-xl cursor-pointer'>

                    <Popover>
                        <PopoverTrigger asChild>
                            <shape.icon className='w-6 h-6' />
                        </PopoverTrigger>
                        <PopoverContent>Place content for the popover here.</PopoverContent>
                    </Popover>
                </div>
            ))}
        </div>
    )
}

export default ShapeSettings