import React from 'react'
import { FontFamilyList } from '../Options';
import { useCanvasHook } from '@/context/CanvasContext';

function FontFamily() {

    const {canvasEditor} = useCanvasHook();

    const onFontFamilyChange = (value) => {
        const activeObject = canvasEditor.getActiveObject();
        
        // Verificar si hay un objeto activo antes de modificarlo
        if (activeObject) {
            activeObject.set({
                fontFamily: value
            })

            canvasEditor.renderAll();
        }
    }

    return (
        <div className='h-[200px] overflow-auto'>
            {FontFamilyList.map((font, index) => (
                <h2 key={index} className='text-lg p-2 hover:scale-105 transition-all rounded-lg cursor-pointer'
                    style={{
                        fontFamily: font
                    }}
                    onClick={() => onFontFamilyChange(font)}
                >{font}
                </h2>
            ))}
        </div>
    )
}

export default FontFamily