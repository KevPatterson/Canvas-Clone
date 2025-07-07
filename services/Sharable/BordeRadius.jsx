import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { Slider } from '@/components/ui/slider';
import React from 'react'

function BordeRadius() {
    const {canvasEditor} = useCanvasHook();

    const onRadiusChange = (value) => {
        const activeObject = canvasEditor.getActiveObject();
        
        // Verificar si hay un objeto activo antes de modificarlo
        if (activeObject) {
            activeObject.set({
                rx: value,
                ry: value
            })

            canvasEditor.renderAll();
        }
    }

    return (
        <div>
            <h2 className='text-sm font-medium'>Border Radius</h2>
            <Slider defaultValue={[0]} max={100} step={1}
                onValueChange={(v) => onRadiusChange(v[0])}
            />
        </div>
    )
}

export default BordeRadius