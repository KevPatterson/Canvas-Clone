import { UserButton } from '@stackframe/stack'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

function DesignHeader({DesignInfo}) {
  const [designName, setDesignName] = useState('');

  useEffect(() => {
    if (DesignInfo?.name) {
      setDesignName(DesignInfo.name);
    }
  }, [DesignInfo?.name]);

  const handleNameChange = (e) => {
    setDesignName(e.target.value);
    // TODO: Add mutation to update design name in database
  };

  return (
    <div className='flex justify-between p-3 bg-gradient-to-r w-full from-sky-500 via-blue-400 to-purple-600'>
        <Image src='/logo.png' alt='logo' width={100} height={60} />
        <input 
          type="text" 
          placeholder='Nombre del diseño' 
          className='text-white border-none outline-none bg-transparent' 
          value={designName} 
          onChange={handleNameChange}
        />
        <UserButton />

    </div>
  )
}

export default DesignHeader