import React from 'react'
import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'
import { useSelector } from 'react-redux'
function Home() {
    const {selectedUser} = useSelector((state)=>state.chat)
  return (
<>

<div className="bg-gray-100  overflow-hidden">
  <div className="flex items-center justify-center h-[calc(100vh-4.5rem)] py-3.5 px-2">
    <div className="bg-white shadow-md w-full max-w-screen-2xl h-full overflow-hidden">
      <div className="flex h-full rounded-lg overflow-hidden">
        <Sidebar />
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  </div>
</div>

</>
  )
}

export default Home
