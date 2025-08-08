import { Shell } from 'lucide-react'
import React from 'react'

function Logo({size}) {
  return (
    <div className='flex items-center'>
        <Shell className='text-blue-400'size={size}/> 
           <span className='text-gray-800 text-lg font-semibold sm:text-2xl'>ZapChat.</span>
    </div>
  )
}

export default Logo
