import React from 'react'
import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic, Underline } from "lucide-react"
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';

function FontStyles() {
    
    const {canvasEditor} = useCanvasHook();
    const onSettingClick=(type)=>{
        const activeObject = canvasEditor.getActiveObject();
        if (activeObject) {
            if (type == 'bold') {
                activeObject.set({
                    fontWeight: activeObject?.fontWeight === 'bold' ? 'normal' : 'bold'
                })
            } else if (type == 'italic') {
                activeObject.set({
                    fontStyle: activeObject?.fontStyle === 'italic' ? 'normal' : 'italic'
                })
            } else if (type == 'underline') {
                activeObject.set({
                    underline: activeObject?.underline ? false : true
                })
            }
            canvasEditor.add(activeObject);
        }
    }

    return (
        <div>
            <Toggle aria-label="Toggle bold" 
                defaultPressed={activeObject?.fontWeight === 'bold'}
                onClick={()=>onSettingClick('bold')}>
                <Bold className="h-4 w-4" size={'lg'} />
            </Toggle>
            <Toggle aria-label="Toggle italic" 
                defaultPressed={activeObject?.fontStyle === 'italic'}
                onClick={()=>onSettingClick('italic')}>
                <Italic className="h-4 w-4" size={'lg'} />
            </Toggle>
            <Toggle aria-label="Toggle underline" 
                defaultPressed={activeObject?.underline}
                onClick={()=>onSettingClick('underline')}>
                <Underline className="h-4 w-4" size={'lg'} />
            </Toggle>
        </div>
    )
}

export default FontStyles