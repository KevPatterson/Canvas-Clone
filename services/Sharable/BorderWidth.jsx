import React from 'react'
import { Slider } from "@/components/ui/slider"
import { useCanvasHook } from '@/context/CanvasContext';

function BorderWidth() {

    const {canvasEditor} = useCanvasHook();

    const onBorderWidthChange = (value) => {
        const activeObject = canvasEditor.getActiveObject();
        
        // Verificar si hay un objeto activo antes de modificarlo
        if (activeObject) {
            activeObject.set({
                strokeWidth: value
            })
            canvasEditor.add(activeObject);
            canvasEditor.renderAll();
        }
    }

    return (
        <div>
            <h2 className='text-sm font-medium'>BorderWidth</h2>
            <Slider defaultValue={[33]} max={100} step={1}
                onValueChange={(v) => onBorderWidthChange(v[0])}
            />
        </div>
    )
}

export default BorderWidth