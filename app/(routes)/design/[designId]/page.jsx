'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import DesignHeader from '../_components/DesignHeader'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Sidebar from '../_components/Sidebar'
import CanvasEditor from '../_components/CanvasEditor'
import { CanvasContext } from '@/context/CanvasContext'

function DesignEditor() {
    
    const {designId} = useParams();
    const [canvasEditor,setCanvasEditor]=useState();
    const DesignInfoFromConvex = useQuery(api.designs.GetDesignRecord, {
        id:designId,
    }); 
    const [DesignInfo, setDesignInfo] = useState(null);

    useEffect(() => {
        if (DesignInfoFromConvex) {
            setDesignInfo(DesignInfoFromConvex);
        }
    }, [DesignInfoFromConvex]);

    return (
        <div>
            <CanvasContext.Provider value={{canvasEditor,setCanvasEditor}}>
                <DesignHeader DesignInfo={DesignInfo} setDesignInfo={setDesignInfo} />
                <div className='flex'>
                    <Sidebar />
                    <CanvasEditor DesignInfo={DesignInfo} />
                </div>
            </CanvasContext.Provider>
        </div>
    )
}

export default DesignEditor