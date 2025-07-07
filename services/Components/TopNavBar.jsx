import React, { useEffect, useState } from 'react'
import ShapeSettings from '../Sharable/ShapeSettings'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';

function TopNavBar() {

    const {canvasEditor} = useCanvasHook();
    const [showShapeSettings, setShowShapeSettings] = useState(false);

    useEffect(() => {
        if (canvasEditor) {
            const activeObject = canvasEditor.getActiveObject();
            console.log(activeObject, canvasEditor);
        }
    }, [canvasEditor]);

    if (canvasEditor) {
        canvasEditor.on('selection:created', function(e) {
            //console.log('Elemento Seleccionado', e);
            const activeObject = canvasEditor.getActiveObject();
            if (e.selected[0]?.cornerStyle == 'rect') {
                setShowShapeSettings(true);
            }
        });

        canvasEditor.on('selection:cleared', function() {
            setShowShapeSettings(false);
        });
    }

    return (
        <div className='p-3 bg-white'>
            {showShapeSettings && <ShapeSettings />}
        </div>
    )
}

export default TopNavBar