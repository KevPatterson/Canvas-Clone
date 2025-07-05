'use client'
import React from 'react'
import { useParams } from 'next/navigation'

function DesignEditor() {
    
    const {designId}=useParams();
    console.log(designId);
    
    return (
        <div>DesignEditor</div>
    )
}

export default DesignEditor