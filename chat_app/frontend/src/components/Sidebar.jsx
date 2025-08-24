// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import {getUsers, setSelectedUser} from '../store/chatSlice.js';
// import { User } from 'lucide-react';
// import userImg from "../assets/user.jpg"
// import SidebarSkeleton from './SidebarSkeleton.jsx';
// function Sidebar() {
//     const[showOnlineOnly,setShowOnlineOnly]=useState(false);
//     const {users,selectedUser,isUserLoading} = useSelector((state)=>state.chat);
//     const {onlineusers} = useSelector((state)=>state.auth);

// const dispatch = useDispatch();
// useEffect(()=>{
// dispatch(getUsers())
// },[dispatch]);

// const filteredUsers = showOnlineOnly ? users?.filter((user)=>onlineusers.includes(user._id)) : users;


// if(isUserLoading) return <SidebarSkeleton/>

//   return (
//     <aside className='h-full w-20 lg:w-72 border-r border-r-gray-300 flex flex-col transition-all duration-200 bg-white'>
//       <div className='border-b border-gray-200 2-fill p-5'>
//         <div className='flex items-center gap-2'>
//             <User className='w-6 h-6 text-gray-700'/>
//             <span className='font-medium lg:black text-gray-800'>Contacts</span>
//         </div>

//      <div className='mt-3 hidden lg:flex items-center gap-2'>
//         <label
//          className=' cursor-pointer flex items-center gap-2 text-sm text-gray-700'>
//             <input type='checkbox' checked={showOnlineOnly} onChange={(e)=> setShowOnlineOnly(e.target.checked)} className='w-4 h-4 border-gray-700 text-blue-600 focus:ring-blue-500'/>
//             show Online only
//          </label>
//          <span className='text-xs text-gray-500'>
//             ({onlineusers.length -1} online)
//          </span>
//      </div>

//       </div>
     

//     {/* user list */}
//     <div className='overflow-y-auto w-full py-3'>
//         {

//         filteredUsers?.length > 0 && filteredUsers.map(user =>{  
//             return (
                
//             <button key={user._id} onClick={()=>dispatch(setSelectedUser(user))}
//             className={`w-full p-3 flex items-center gap-3 transition-colors rounded ${
//                 selectedUser?._id == user._id? "bg-gray-200 ring-gray-200" : "hover:bg-gray-200"
//             }`}>
//         {/* avatar */}
//         <div className=' relative mx-auto lg:mx-0'>
//             <img src={user?.avatar?.url || userImg}
//             alt={userImg}
//             className='w-12 h-12 object-cover rounded-full'/>
//             {onlineusers.includes(user._id) && (
//                 <span className=' absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white'/>
//             )}
//         </div>
//         {/* user info */}
//         <div className='hidden lg:block text-left min-w-0'>

//             <div className='font-medium text-gray-800 truncate'>
//                 {user.fullName}
//             </div>
//             <div className='text-sm text-gray-500'>
//                 {onlineusers.includes
//                 (user._id) ? "online" : "offline"}
//             </div>
//         </div>

//             </button>

//             )
//                     })}
//             {
//                 filteredUsers?.length === 0 &&(
//                     <div className='text-center text-gray-500 py-4'>
//                         No online Users
//                         </div>
//                 )
//             }
//     </div>

//     </aside>
//   )
// }

// export default Sidebar

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, setSelectedUser } from '../store/chatSlice.js';
import { User, Menu, X } from 'lucide-react';
import userImg from "../assets/user.jpg";
import SidebarSkeleton from './SidebarSkeleton.jsx';
import { getSocket } from '../lib/socket.js';

function Sidebar() {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile toggle
  const { users, selectedUser, isUserLoading } = useSelector((state) => state.chat);
  const { onlineusers } = useSelector((state) => state.auth);
   console.log(onlineusers);
  const dispatch = useDispatch();
 useEffect(() => {
    const socket = getSocket();

    dispatch(getUsers());

    
    socket.on('new-user-added', () => {
      dispatch(getUsers());
    });

    // Cleanup to avoid memory leaks
    return () => {
      socket.off('new-user-added');
    };
  }, [onlineusers,dispatch]);

  const filteredUsers = showOnlineOnly
    ? users?.filter((user) => onlineusers.includes(user._id))
    : users;

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="w-6 h-6 text-gray-800" />
      </button>

      {/* Overlay on small screen */}
      {/* {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )} */}

      {/* Sidebar */}
      <aside
        className={`fixed z-20 top-0 left-0 h-full w-64 bg-white border-r border-gray-300 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0 z-50" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-72`}
      >
        <div className="border-b border-gray-200 p-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-gray-700" />
            <span className="font-medium text-gray-800">Contacts</span>
          </div>
          {/* Close icon only on mobile */}
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Online toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2 px-5">
          <label className="cursor-pointer flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="w-4 h-4 border-gray-700 text-blue-600 focus:ring-blue-500"
            />
            Show Online only
          </label>
          <span className="text-xs text-gray-500">({onlineusers.length - 1} online)</span>
        </div>

        {/* User list */}
        <div className="overflow-y-auto h-[calc(100%-100px)] py-3 px-1">
          {filteredUsers?.length > 0 &&
            filteredUsers.map((user) => {
              return (
                <button
                  key={user._id}
                  onClick={() => {
                    dispatch(setSelectedUser(user));
                    setIsSidebarOpen(false); // close on mobile
                  }}
                  className={`w-full p-3 flex items-center gap-3 transition-colors  ${
                    selectedUser?._id === user._id
                      ? "bg-gray-200 ring-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative  lg:mx-0">
                    <img
                      src={user?.avatar?.url || userImg}
                      alt={user.fullName}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    {onlineusers.includes(user._id) && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                    )}
                  </div>
                  {/* Info */}
                  <div className=" lg:block text-left min-w-0">
                    <div className="font-medium text-gray-800 truncate">
                      {user.fullName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {onlineusers.includes(user._id) ? "online" : "offline"}
                    </div>
                  </div>
                </button>
              );
            })}
          {filteredUsers?.length === 0 && (
            <div className="text-center text-gray-500 py-4">No online users</div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
