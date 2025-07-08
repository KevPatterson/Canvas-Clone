import { useCanvasHook } from '@/context/CanvasContext'
import { IText } from 'fabric';
import React from 'react'

function TextSettings() {

    const {canvasEditor} = useCanvasHook();

    const onAddTextClick = (type) => {
        if (canvasEditor) {
            if (type === 'Heading') {
                const textRef = new IText('Add Heading', {
                    fontSize: 30,
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                    fill: 'black',
                    left: 100,
                    top: 100
                });

                canvasEditor.add(textRef);

            } else if (type === 'Subheading') {
                const textRef = new IText('Add Subheading', {
                    fontSize: 20,
                    fontWeight: '400',
                    fontFamily: 'Arial',
                    fill: 'black',
                    left: 100,
                    top: 100
                });

                canvasEditor.add(textRef);

            } else if (type === 'Para') {
                const textRef = new IText('Add Paragraph', {
                    fontSize: 13,
                    fontWeight: 'normal',
                    fontFamily: 'Arial',
                    fill: 'black',
                    left: 100,
                    top: 100
                });
                
                canvasEditor.add(textRef);
            }
        }
    }

    return (
        <div className='flex flex-col gap-5'>
            <h2 className='font-bold text-3xl  p-3 b-secondary rounded-xl cursor-pointer'
                onClick={() => onAddTextClick('Heading')}
            >Agregar Texto</h2>
            <h2 className='font-bold text-xl  p-3 b-secondary rounded-xl cursor-pointer'
                onClick={() => onAddTextClick('Subheading')}
            >Agregar Subtexto</h2>
            <h2 className='text-md  p-3 b-secondary rounded-xl cursor-pointer'
                onClick={() => onAddTextClick('Para')}
            >Parrafo</h2>
        </div>
    )
}

export default TextSettings