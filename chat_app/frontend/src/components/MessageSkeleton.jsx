import React from 'react'

function MessageSkeleton() {
    const skelatonMessages = Array(6).fill(null);
  return (
    <div className='flex-1 overflow-y-auto p-4 space-y-4'>
      {
        skelatonMessages.map((_,idx)=>{
            return(
                <div key={idx} className={`flex items-start gap-3 ${
                    idx % 2 ===0 ?
                    "justify-start" 
                    : "justify-end flex-row-reverse"
                }`}>
                    {/* avatar */}
                    <div className='w-10 h-10 rounded-full bg-gray-300 animate-pulse'/>
                    {/* message bubble */}
                    <div>
                        <div className='h-4 w-16 bg-gray-300 rounded mb-2 animate-pulse'/>
                        <div className='w-[200px] h-16 bg-gray-300 rounded-lg animate-pulse'/> 
                    </div>

                </div>
            )
        })
      }
    </div>
  )
}

export default MessageSkeleton
