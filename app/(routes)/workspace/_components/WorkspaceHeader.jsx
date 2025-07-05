import React from 'react'
import Image from 'next/image'
import { UserButton } from '@stackframe/stack'

function WorkspaceHeader() {
  return (
    <div className='p-4 px-5 flex justify-between items-center shadow-sm'>
        <Image src={'/logo.png'} alt='logo' width={100} height={100}
            className='w-[120px] h-[120px]' 
        />
        <UserButton />
    </div>
  )
} 

export default WorkspaceHeader