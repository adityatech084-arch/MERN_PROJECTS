import React from 'react'
import {MessageSquare} from 'lucide-react'
import Lottie from 'lottie-react';

import animationData from '../assets/Live Chating.json';
function NoChatSelected() {
  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center p-16 bg-white'>
      <div className='max-w-md text-center space-y-6'>
        {/* icon display */}
      <div className='flex justify-center gap-4 mb-4'>
        <div className=' relative'>
          <div className='w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center animate-pulse'>
            {/* <MessageSquare className='w-8 h-8 text-blue-600'/> */}
                  <Lottie animationData={animationData} loop={true} />

          </div>
        </div>
      </div>
  {/* welcome text */}
  <h2 className='text-2xl font-bold text-gray-800 mb-0'>Welcome to Talke</h2>
<p className='text-gray-500'>
  select a conversation from the side bar to start the conversation
</p>
      </div>
    </div>
  )
}

export default NoChatSelected
