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
                    fontWeight: 'bold'
                })
            } else if (type == 'italic') {
                activeObject.set({
                    fontStyle: 'italic'
                })
            } else if (type == 'underline') {
                activeObject.set({
                    underline: true
                })
            }
            canvasEditor.renderAll();
        }
    }

    return (
        <div>
            <Toggle aria-label="Toggle italic">
                <Bold className="h-4 w-4" size={'lg'} />
            </Toggle>
            <Toggle aria-label="Toggle italic">
                <Italic className="h-4 w-4" size={'lg'} />
            </Toggle>
            <Toggle aria-label="Toggle italic">
                <Underline className="h-4 w-4" size={'lg'} />
            </Toggle>
        </div>
    )
}

export default FontStyles