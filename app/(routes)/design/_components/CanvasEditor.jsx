import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from 'fabric'
import { useCanvasHook } from '../[designId]/page'

function CanvasEditor({DesignInfo}) {
  const canvasRef=useRef();
  const [canvas,setCanvas]=useState(null);
  const {canvasEditor,setCanvasEditor}=useCanvasHook();

  /**
   * Inicializar Canvas con ancho y alto x defecto
   */

  useEffect(()=>{
    if(canvasRef.current && DesignInfo)
      {
        const initCanvas=new Canvas(canvasRef.current,{
          width: DesignInfo?.width / 1.2,
          height: DesignInfo?.height / 1.2,
          backgroundColor: '#fff',
        });

        // Establecer Canvas en alta resoucion
        const scaleFactor=window.devicePixelRatio||1;
        initCanvas.set({
          width: DesignInfo?.width * scaleFactor,
          height: DesignInfo?.height * scaleFactor,
          zoom: 1,
        });

        initCanvas.renderAll();
        setCanvas(initCanvas);
        setCanvasEditor(initCanvas);

        return ()=>{
          initCanvas.dispose();
        }
      }
  },[DesignInfo]);

  return (
    <div className='w-full h-screen bg-secondary flex items-center justify-center
    flex-col relative'>
      <canvas id='canvas' ref={canvasRef}/>
    </div>
  )
}

export default CanvasEditor