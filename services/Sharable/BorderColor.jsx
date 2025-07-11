import React, { useState } from 'react'
import ColorPickerEditor from './ColorPickerEditor'
import { useCanvasHook } from '@/context/CanvasContext';

function BorderColor() {
    const [color, setColor] = useState('#000')
    const {canvasEditor} = useCanvasHook();

    const onColorChange = (color) => {
        setColor(color)
        const activeObject = canvasEditor.getActiveObject();
        
        // Verificar si hay un objeto activo antes de modificarlo
        if (activeObject) {
            activeObject.set({
                stroke: color
            })
            //canvasEditor.add(activeObject);
            canvasEditor.renderAll();
        }
    }

    return (
        <div>
            <ColorPickerEditor onColorChange={(v) => onColorChange(v)}
                value={color}
            />
        </div>
    )
}

export default BorderColor