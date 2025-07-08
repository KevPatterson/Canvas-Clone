import { useCanvasHook } from '@/context/CanvasContext';
import { Slider } from '@/components/ui/slider';
import React from 'react'

function Opacity() {
    const {canvasEditor} = useCanvasHook();

    const onOpacityChange = (value) => {
        const activeObject = canvasEditor.getActiveObject();
        
        // Verificar si hay un objeto activo antes de modificarlo
        if (activeObject) {
            activeObject.set({
                opacity: value
            })

            canvasEditor.renderAll();
        }
    }

    return (
        <div>
            <h2 className='text-sm font-medium my-2'>Actualizar Opacidad</h2>
            <Slider defaultValue={[1]} max={1} step={0.1}
                onValueChange={(v) => onOpacityChange(v[0])}
            />
        </div>
    )
}

export default Opacity