import React, { useState, useEffect } from 'react'
import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic, Underline } from "lucide-react"
import { useCanvasHook } from '@/context/CanvasContext';

function FontStyles() {
    
    const {canvasEditor} = useCanvasHook();
    const [activeObject, setActiveObject] = useState(null);

    useEffect(() => {
        if (canvasEditor) {
            const updateActiveObject = () => {
                const obj = canvasEditor.getActiveObject();
                setActiveObject(obj);
            };

            // Update active object when selection changes
            canvasEditor.on('selection:created', updateActiveObject);
            canvasEditor.on('selection:updated', updateActiveObject);
            canvasEditor.on('selection:cleared', () => setActiveObject(null));

            // Initial check
            updateActiveObject();

            return () => {
                canvasEditor.off('selection:created', updateActiveObject);
                canvasEditor.off('selection:updated', updateActiveObject);
                canvasEditor.off('selection:cleared', updateActiveObject);
            };
        }
    }, [canvasEditor]);

    const onSettingClick=(type)=>{
        const currentActiveObject = canvasEditor.getActiveObject();
        if (currentActiveObject) {
            if (type == 'bold') {
                currentActiveObject.set({
                    fontWeight: currentActiveObject?.fontWeight === 'bold' ? 'normal' : 'bold'
                })
            } else if (type == 'italic') {
                currentActiveObject.set({
                    fontStyle: currentActiveObject?.fontStyle === 'italic' ? 'normal' : 'italic'
                })
            } else if (type == 'underline') {
                currentActiveObject.set({
                    underline: currentActiveObject?.underline ? false : true
                })
            }
            canvasEditor.add(currentActiveObject);
            canvasEditor.renderAll();
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