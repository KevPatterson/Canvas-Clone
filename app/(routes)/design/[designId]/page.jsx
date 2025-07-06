'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import DesignHeader from '../_components/DesignHeader'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Sidebar from '../_components/Sidebar'
import CanvasEditor from '../_components/CanvasEditor'

function DesignEditor() {
    
    const {designId}=useParams();
    const DesignInfo=useQuery(api.designs.GetDesignRecord,{
        id:designId,
    }); 

    return (
        <div>
            <DesignHeader DesignInfo={DesignInfo} />
            <div>
                <Sidebar />
                <CanvasEditor />
            </div>
        </div>
    )
}

export default DesignEditor