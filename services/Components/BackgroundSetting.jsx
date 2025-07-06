import React, { useState } from 'react'
import ColorPickerEditor from '../Sharable/ColorPickerEditor'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'


function BackgroundSetting() {
    const [bgColor,setBgColor]=useState('#fff');
    const {canvasEditor}=useCanvasHook();

    /**
     * Pata cambiar el color del Canvas
     * @param {*} v 
     */

    const onColorChange=(color)=>{
        setBgColor(color);
        canvasEditor?.set({
            backgroundColor: color,
            backgroundImage:null,
        });
        canvasEditor.renderAll();
    }
    return (
        <div>
            <ColorPickerEditor
                value={bgColor}
                onColorChange={(v)=>onColorChange(v)}
            />
        </div>
    )
}

export default BackgroundSetting