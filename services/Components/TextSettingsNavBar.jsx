import React, { useState } from 'react'
import { TextSettingsList } from '../Options'
import { Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import { useCanvasHook } from '@/context/CanvasContext';
import { Trash } from 'lucide-react';
import FontStyles from '../Sharable/FontStyles' 

function TextSettingsNavBar() {

    const {canvasEditor} = useCanvasHook();
    const [show, setShow] = useState(false);
    
    const onDelete = () => {
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject) {
            canvasEditor.remove(activeObject);
        }
    }
    
    return (
        <div className='flex gap-6'>
            {TextSettingsList.map((shape, index) => (
                <div key={index} className='hover:scale-105 transition-all rounded-xl cursor-pointer'>

                    <Popover>
                        <PopoverTrigger asChild>
                            <shape.icon className='w-6 h-6' />
                        </PopoverTrigger>
                        <PopoverContent>
                            {shape.component}
                        </PopoverContent>
                    </Popover>
                </div>
            ))}

            <FontStyles />

            <Trash onClick={onDelete} className='hover:scale-105 transition-all rounded-xl cursor-pointer' />
        </div>
    )
}

export default TextSettingsNavBar