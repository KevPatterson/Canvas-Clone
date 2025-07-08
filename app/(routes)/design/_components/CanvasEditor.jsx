import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from 'fabric'
import { useCanvasHook } from '@/context/CanvasContext'
import TopNavBar from '@/services/Components/TopNavBar'

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
          preserveObjectStacking: true,
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

  /**
   * Eliminar objetos del Canvas
   */

  useEffect(()=>{
    const handleKeyDown=(event) => {
      if(event.key=='Delete' ){
        if(canvasEditor)
        {
          const activeObject=canvasEditor.getActiveObject();
          if(activeObject){
            canvasEditor.remove(activeObject);
            canvasEditor.renderAll();
          }
        }
      }
    }
    
    document.addEventListener('keydown',handleKeyDown);

    return ()=>{
      document.removeEventListener('keydown',handleKeyDown);
    }

  },[canvasEditor]);

  return (

    <div className='bg-secondary w-full h-screen mt-10'>
      <TopNavBar />
      <div className='flex items-center justify-center
        flex-col relative h-full'>
        
        <canvas id='canvas' ref={canvasRef}/>
      </div>
    </div>
  )
}

export default CanvasEditor