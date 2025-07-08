import React, { useEffect, useState } from 'react'
import ShapeSettings from '../Sharable/ShapeSettings'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import TextSettingsNavBar from './TextSettingsNavBar';

function TopNavBar() {

    const {canvasEditor} = useCanvasHook();
    const [showShapeSettings, setShowShapeSettings] = useState(false);
    const [showTextSettingsList, setShowTextSettingsList] = useState(false);

    useEffect(() => {
        if (canvasEditor) {
            const activeObject = canvasEditor.getActiveObject();
            console.log(activeObject, canvasEditor);
        }
    }, [canvasEditor]);

    if (canvasEditor) {
        canvasEditor.on('selection:created', function(e) {
            const selectedObjects = canvasEditor.getActiveObjects();
            //console.log('Elemento Seleccionado', e);
            const activeObject = canvasEditor.getActiveObject();
            if (!activeObject.text) {
                setShowShapeSettings(true);
                setShowTextSettingsList(false);
            }
            if (activeObject.text) {
                setShowShapeSettings(false);
                setShowTextSettingsList(true);
            }
        });

        canvasEditor.on('selection:updated', function() {
            setShowShapeSettings(false);
            setShowTextSettingsList(false);
        });

        canvasEditor.on('selection:cleared', function() {
            setShowShapeSettings(false);
            setShowTextSettingsList(false);
        });
    }

    return (
        <div className='p-3 bg-white'>
            {showShapeSettings && <ShapeSettings />}
            {showTextSettingsList && <TextSettingsNavBar/>}
        </div>
    )
}

export default TopNavBar