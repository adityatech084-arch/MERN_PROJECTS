// import React, { useState } from 'react';
// import { Smartphone, Sparkles } from 'lucide-react';
// import Signup from "./Singup.js"; 
// import Login from "./Login.js";

// const AuthPage = () => {
//   const [mode, setMode] = useState('login');

//   return (
//     <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-x-hidden relative bg-[#0a110c] font-['Space_Grotesk',sans-serif] selection:bg-[#13ec5b]/30 text-white">
//       {/* Google Font Import */}
//       <style>
//         {`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');`}
//       </style>

//       {/* --- CUSTOM RADIAL BACKGROUND --- */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="absolute top-[10%] lg:top-[20%] left-[10%] w-[80%] lg:w-[60%] h-[60%] rounded-full bg-[#13ec5b]/10 blur-[80px] lg:blur-[120px]" />
//         <div className="absolute bottom-[10%] lg:bottom-[20%] right-[5%] w-[60%] lg:w-[40%] h-[40%] rounded-full bg-[#13ec5b]/05 blur-[80px] lg:blur-[100px]" />
//       </div>

//       {/* --- LEFT SECTION: HERO --- */}
//       {/* Hidden on mobile, shown on large screens */}
//       <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 relative overflow-hidden border-r border-white/5 z-10">
//         <div className="flex items-center gap-4">
//           <div className="size-12 flex items-center justify-center rounded-xl bg-[#13ec5b] text-[#0a110c]">
//             <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
//               <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
//             </svg>
//           </div>
//           <h2 className="text-white text-2xl font-bold tracking-tight">FuturisticChat AI</h2>
//         </div>

//         <div className="relative max-w-lg">
//           <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13ec5b]/10 border border-[#13ec5b]/20 text-[#13ec5b] text-[10px] font-bold tracking-widest uppercase">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#13ec5b] opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-[#13ec5b]"></span>
//             </span>
//             Next-Gen Neural Messaging
//           </div>
//           <h1 className="text-white text-6xl font-black leading-[1.05] mb-8">
//             Welcome back to the future.
//           </h1>
//           <p className="text-[#92c9a4] text-xl leading-relaxed mb-10 opacity-80">
//             Experience AI-powered messaging with end-to-end security and premium neural aesthetics.
//           </p>
          
//           <div className="flex items-center gap-5">
//             <div className="flex -space-x-3 overflow-hidden">
//               {[1, 2, 3, 4].map((i) => (
//                 <img key={i} className="inline-block h-12 w-12 rounded-full ring-2 ring-[#0a110c]" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="User" />
//               ))}
//             </div>
//             <div className="text-sm">
//               <p className="text-white font-bold text-base">10k+ innovators</p>
//               <p className="text-[#13ec5b] font-medium">Beta access active</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-8 text-sm text-[#92c9a4]/60">
//           <a className="hover:text-[#13ec5b] transition-colors" href="#">Privacy Policy</a>
//           <a className="hover:text-[#13ec5b] transition-colors" href="#">Terms of Service</a>
//         </div>
//       </div>

//       {/* --- RIGHT SECTION: AUTH CARD --- */}
//       <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 z-10">
        
//         {/* Mobile-only Logo Header */}
//         <div className="lg:hidden flex flex-col items-center mb-8 gap-3">
//             <div className="size-12 flex items-center justify-center  bg-[#13ec5b] text-[#0a110c]">
//                 <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
//                 </svg>
//             </div>
//             <h2 className="text-white text-xl font-bold tracking-tight">FuturisticChat AI</h2>
//         </div>

//         <div className="w-full max-w-[460px]">
//           <div className="  p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl ">
//             <div className="mb-6 lg:mb-8">
//               <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-2">
//                 {mode === 'login' ? 'Welcome back' : 'Create account'}
//               </h2>
//               <p className="text-[#92c9a4] text-xs sm:text-sm">
//                 {mode === 'login' ? 'Enter your neural credentials to continue.' : 'Start your journey into the future of messaging.'}
//               </p>
//             </div>

//             {/* Switcher Tabs */}
//             <div className="flex p-1 bg-black/40 rounded-xl lg:rounded-2xl mb-6 lg:mb-8 border border-white/5">
//               <button 
//                 onClick={() => setMode('login')}
//                 className={`flex-1 py-2 lg:py-2 text-xs lg:text-sm font-bold rounded-lg lg:rounded-xl transition-all ${mode === 'login' ? 'bg-[#13ec5b] text-[#0a110c]' : 'text-[#92c9a4] hover:text-white'}`}
//               >
//                 Login
//               </button>
//               <button 
//                 onClick={() => setMode('signup')}
//                 className={`flex-1 py-2 lg:py-2 text-xs lg:text-sm font-bold rounded-lg lg:rounded-xl transition-all ${mode === 'signup' ? 'bg-[#13ec5b] text-[#0a110c]' : 'text-[#92c9a4] hover:text-white'}`}
//               >
//                 Sign Up
//               </button>
//             </div>

//             {/* Render component based on mode */}
//             <div className="min-h-[300px]">
//                 {mode === 'login' ? <Login /> : <Signup />}
//             </div>

//             <div className="relative my-4 lg:my-4">
//               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
//               <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
//                 <span className="bg-[#112217] px-4 text-[#92c9a4]/40">Social Gateway</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
//               <button type="button" className="flex items-center justify-center gap-3 px-4 py-3 border border-white/10 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-all font-bold text-sm">
//                 <Smartphone size={18} className="text-[#13ec5b]" />
//                 Google
//               </button>
//               <button type="button" className="flex items-center justify-center gap-3 px-4 py-3 border border-white/10 bg-white/5 rounded-xl text-white hover:bg-white/10 transition-all font-bold text-sm">
//                 <Sparkles size={18} className="text-[#13ec5b]" />
//                 Apple
//               </button>
//             </div>

//             <div className="mt-8 lg:mt-10 text-center">
//               <p className="text-[#92c9a4] text-xs sm:text-sm">
//                 {mode === 'login' ? "New to the future?" : "Already an innovator?"} 
//                 <button 
//                   onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
//                   className="text-[#13ec5b] font-black ml-2 hover:underline tracking-tight"
//                 >
//                   {mode === 'login' ? 'Join Beta Now' : 'Access Vault'}
//                 </button>
//               </p>
//             </div>
//           </div>
          
//           {/* Footer links for mobile */}
//           <div className="flex justify-center gap-6 mt-8 text-[10px] font-bold uppercase tracking-widest text-[#92c9a4]/30">
//             <span>© 2026</span>
//             <a className="hover:text-[#13ec5b] transition-colors" href="#">Support</a>
//             <a className="hover:text-[#13ec5b] transition-colors" href="#">Legal</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;





















// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMessages, addMessage, incrementUnread, resetUnreadCountLocal } from '../features/chat/chatSlice';
// import { getGroupMessages, addGroupMessage, resetGroupUnread } from '../features/group/groupSlice';
// import MessageInput from './MessageInput';
// import { getSocket } from '../utils/socket.js';
// import useTypingIndicator from '../hook/useTypingIndicator.jsx';
// import TypingIndicator from './bitsComponents/TypingIndecator.jsx';
// import { LuInfo, LuMenu, LuPhone, LuVideo } from 'react-icons/lu';

// const ChatArea = () => {
//   const dispatch = useDispatch();
//   const scrollRef = useRef(null);
//   const { authUser } = useSelector((state) => state.auth);
//   const { selectedUser, messages } = useSelector((state) => state.chat);
//   const { selectedGroup, groupmessages } = useSelector((state) => state.group);
//   // const [isTyping, setIsTyping] = useState(false);
//   const socket = getSocket();
//   const isTyping = useTypingIndicator(socket, selectedUser?._id);


//   // Determine active chat & messages
//   const activeChat = selectedGroup || selectedUser;
//   const chatMessages = selectedGroup ? groupmessages : messages;

//   // Fetch messages when selection changes
//   // console.log(selectedGroup.groupId._id)
// useEffect(() => {
//   if (!socket) return;

//   // If a user is selected (1:1 chat)
//   if (selectedUser?._id) {
//     dispatch(fetchMessages(selectedUser._id)).then(() => {
//       // ✅ Reset unread count locally
//       // dispatch(resetUnreadCountLocal(selectedUser._id));

//       socket.emit("mark-as-read", { senderId: selectedUser?._id });
//     });
//   }

//   // If a group is selected
//   if (selectedGroup?._id) {
//     dispatch(getGroupMessages(selectedGroup._id)).then(() => {
//       // dispatch(resetGroupUnread(selectedGroup._id));
//       socket.emit("mark-group-read", { groupId: selectedGroup._id });
//     });
//   }
// }, [selectedUser?._id, selectedGroup?._id, dispatch, socket]);


//   // Join selected group & leave on unmount
//   useEffect(() => {
//     if (!selectedGroup?._id) return;

//     socket.emit("join-group", selectedGroup._id);
//     console.log("Joined group:", selectedGroup._id);

//     return () => {
//       socket.emit("leave-group", selectedGroup._id);
//       console.log("Left group:", selectedGroup._id);
//     };
//   }, [socket, selectedGroup?._id]);

//   // Socket listener for incoming messages
// // useEffect(() => {
// //   if (!socket) return;

// //   const handleIncomingMessage = (msg) => {
// //     console.log(msg)
// //     const selectedUserId = selectedUser?._id;
// //     // const msgSenderId = msg.sender; // sender of the message
// //     const msgGroupId = msg.group || msg.groupId;
// //     if (msgGroupId) {
// //       // Group message
// //       const isCurrentGroupOpen = selectedGroup?._id === msgGroupId;
// //       dispatch(addGroupMessage({ groupId: msgGroupId, message: msg, isActive: isCurrentGroupOpen }));

// //       if (isCurrentGroupOpen) {
// //         socket.emit("mark-group-read", { groupId: msgGroupId });
// //         dispatch(resetGroupUnread(msgGroupId));
// //       }
// //     } else {
// //   const msgSenderId = msg.sender?._id || msg.sender; // ensures string ID

// //     const isCurrentChatOpen = selectedUserId && msgSenderId === selectedUserId;

// //     if (isCurrentChatOpen) {
// //       // Chat is open → add message, reset unread locally, tell backend
// //       // dispatch(addMessage(msg));
// //       dispatch(resetUnreadCountLocal(msgSenderId));
// //       socket.emit("mark-as-read", { senderId: msg.sender });
// //     } else {
// //       // Chat not open → increment unread, still add to store for preview
// //       dispatch(addMessage(msg));
// //       dispatch(incrementUnread(msgSenderId));
// //     }
  

// //     }
// //   };

// //   socket.on("newMessage", handleIncomingMessage);
// //   socket.on("group-message-received", handleIncomingMessage);

// //   return () => {
// //     socket.off("newMessage", handleIncomingMessage);
// //     socket.off("group-message-received", handleIncomingMessage);
// //   };
// // }, [socket, selectedUser, selectedGroup, dispatch]);



// // Socket listener for incoming messages
// // useEffect(() => {
// //   if (!socket) return;

// //   const handleIncomingMessage = (msg) => {
// //     const selectedUserId = selectedUser?._id;
// //     const msgSenderId = msg.sender?._id || msg.sender;
// //     const msgGroupId = msg.group || msg.groupId;

// //     if (msgGroupId) {
// //       // Group message
// //       const isCurrentGroupOpen = selectedGroup?._id === msgGroupId;
// //       dispatch(addGroupMessage({ groupId: msgGroupId, message: msg, isActive: isCurrentGroupOpen }));

// //       if (isCurrentGroupOpen) {
// //         socket.emit("mark-group-read", { groupId: msgGroupId });
// //         dispatch(resetGroupUnread(msgGroupId));
// //       }
// //     } else {
// //   const msgSenderId = msg.sender?._id || msg.sender;
// //   const isCurrentChatOpen = selectedUser?._id === msgSenderId;

// //   dispatch(addMessage(msg)); // always add message

// //   if (isCurrentChatOpen) {
// //     // ✅ Chat is open → reset unread locally + tell backend
// //     dispatch(resetUnreadCountLocal(msgSenderId));
// //     socket.emit("mark-as-read", { senderId: msgSenderId });
// //   } else {
// //     // Chat not open → increment unread
// //     dispatch(incrementUnread(msgSenderId));
// //   }
// //   }
// // }

// //   socket.on("newMessage", handleIncomingMessage);
// //   socket.on("group-message-received", handleIncomingMessage);

// //   return () => {
// //     socket.off("newMessage", handleIncomingMessage);
// //     socket.off("group-message-received", handleIncomingMessage);
// //   };
// // }, [socket, selectedUser, selectedGroup, dispatch]);



// useEffect(() => {
//   if (!socket) return;

//   const handleIncomingMessage = (msg) => {
//     const selectedUserId = selectedUser?._id;
//     const msgSenderId = msg.sender?._id || msg.sender;
//     const msgGroupId = msg.group || msg.groupId;

//     if (msgGroupId) {
//       // Group message
//       const isCurrentGroupOpen = selectedGroup?._id === msgGroupId;
//       dispatch(addGroupMessage({ groupId: msgGroupId, message: msg, isActive: isCurrentGroupOpen }));

//       if (isCurrentGroupOpen) {
//         socket.emit("mark-group-read", { groupId: msgGroupId });
//         dispatch(resetGroupUnread(msgGroupId));
//       }
//     } else {
//       // 1:1 chat
//       console.log(msg)
//       const isCurrentChatOpen = selectedUserId === msgSenderId;
//       dispatch(addMessage(msg)); // always add message

//       if (isCurrentChatOpen) {
//         // Chat is open → tell backend to mark as read
//         socket.emit("mark-as-read", { senderId: selectedUserId });
//       } else {
//         // Chat not open → increment unread
//         dispatch(incrementUnread(msgSenderId));
//       }
//     }
//   };


//   socket.on("newMessage", handleIncomingMessage);
//   socket.on("group-message-received", handleIncomingMessage);

//   return () => {
//     socket.off("newMessage", handleIncomingMessage);
//     socket.off("group-message-received", handleIncomingMessage);
//   };
// }, [socket, selectedUser, selectedGroup, dispatch]);


//   // Auto-scroll to bottom
//   useEffect(() => {
//     if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "auto" });
//   }, [chatMessages, isTyping]);

//   // const formatTime = (dateString) =>
//   //   new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   const formatTime = (dateString) =>
//   new Date(dateString).toLocaleString([], {
//     // day: "2-digit",
//     // month: "short",
//     // year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });


//   return (
//     <>




// <header className="h-18 z-10 absolute top-0 w-full bg-white dark:bg-[#0e0d0d] md:relative flex items-center justify-between px-4 md:px-6 border-b border-slate-200 dark:border-white/10 shrink-0">
//   <div className="flex items-center gap-3">
//     {/* Sidebar toggle on mobile */}
//     <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 -ml-2 text-slate-600">
//       <LuMenu size={24} />
//     </button>

//     {/* User / Group info */}
//     <div className="flex items-center gap-2 truncate">
//       <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-slate-200 shrink-0 overflow-hidden">
//         <img
//           src={
//             selectedUser
//               ?   `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser._id}`
//               : selectedGroup
//               ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedGroup._id}`
//               : ""
//           }
//           alt=""
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div className="flex flex-col flex-1 truncate">
//         <h2 className="font-bold text-md dark:text-gray-500 leading-tight truncate">
//           {selectedUser
//             ? selectedUser.fullName
//             : selectedGroup
//             ? selectedGroup.name
//             : "Select a Chat"}
//         </h2>

//         {selectedUser && (
//           <span
//             className={`text-[11px] transition-all duration-300 ${
//               isTyping ? "text-indigo-600 font-medium animate-pulse" : "text-slate-400"
//             }`}
//           >
//             {isTyping ? "typing..." : selectedUser.online ? "Online" : "Offline"}
//           </span>
//         )}

//         {/* Optional: show group members count */}
//         {selectedGroup && (
//           <span className="text-[11px] text-slate-400">
//             {selectedGroup.members?.length || 0} members
//           </span>
//         )}
//       </div>
//     </div>
//   </div>

//   {/* {selectedUser && ( */}
//     <div className="flex items-center gap-1 md:gap-3">
//       <HeaderBtn icon={<LuPhone size={18} />} />
//       <HeaderBtn icon={<LuVideo size={18} />} />
//       <HeaderBtn icon={<LuInfo size={18} className="hidden sm:block" />} />
//     </div>
//   {/* )} */}
// </header>







//     <main className="flex-1 flex flex-col min-w-0  h-full max-h-screen overflow-hidden">
//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 scrollbar-thin scrollbar-thumb-slate-200    relative flex-1 overflow-y-auto px-4 md:px-6 py-6
//           bg-cover bg-center bg-no-repeat"
//             style={{ backgroundImage: "url('')" }}
//           >
//         <div className="space-y-4">
//           {chatMessages?.map((msg, idx) => {
//             const isSender = msg.sender?._id === authUser._id || msg.sender === authUser._id;

//             return (
//               <div key={msg._id || idx} className={`flex w-full ${isSender ? "justify-end" : "justify-start"}` }>
//                 <div className={`flex gap-4 max-w-[80%] md:max-w-[70%] ${isSender ? "flex-row-reverse" : ""}` }>
//                   {/* Avatar */}
//                   {/* <div
//                     className="size-8 rounded-lg bg-cover bg-center shrink-0 shadow-sm mt-auto"
//                     style={{ backgroundImage: `url(${isSender ? authUser.profilePic : msg.sender?.profilePic })` }}
//                   /> */}

//                   {/* Bubble */}
//                   <div className={`flex  flex-col ${isSender ? "items-end" : "items-start"}`}>
//                     <div className={`rounded-lg px-3.5 py-1.5 text-sm leading-relaxed ${isSender ? "bg-green-500 text-white rounded-br-none" : "bg-slate-100 dark:bg-gray-900 dark:text-white  text-slate-900 rounded-bl-none"}`}>
                      
//                       {/* Show sender name for group messages */}
//                       {selectedGroup && !isSender && msg.sender?.fullName && (
//                         <span className="block text-[10px] font-semibold text-indigo-200 mb-1">
//                           {msg.sender.fullName}
//                         </span>
//                       )}
                      
//                  <div className="flex flex-col">
//   <span className="text-[13px]">{msg.text}</span>
//   <div className={`flex mt-0.2 text-[10px] font-medium text-white`}>
//     {isSender ? (
//       // Sent message: time on left
//       <span className="mr-auto text-[9px] text-white">{formatTime(msg.createdAt || new Date())}</span>
//     ) : (
//       // Received message: time on right
//       <span className="ml-auto text-[9px] text-slate-600">{formatTime(msg.createdAt || new Date())}</span>
//     )}
//   </div>
// </div>

//                     </div>


                    
                    
//                   </div>
//                 </div>
//               </div>
//             );
//           })}

//           {/* Typing indicator */}
//           {/* {isTyping && activeChat && (
//             <div className="flex justify-start">
//               <div className="bg-slate-100 text-slate-500 text-xs px-4 py-2 rounded-2xl rounded-bl-none">
//                 {activeChat?.fullName || "Someone"} is typing...
//               </div>
//             </div>
//           )} */}

// {activeChat && (
//   <TypingIndicator
//     user={activeChat}
//     isVisible={isTyping}
//   />
// )}


//           <div ref={scrollRef} />
//         </div>
//       </div>

//       {/* Message input */}
//       <div className="shrink-0  border-t border-slate-200 dark:border-white/10  p-4">
//         <div className="max-w-4xl mx-auto">
//           <MessageInput
//             isGroup={!!selectedGroup}
//             chatId={selectedGroup?._id || selectedUser?._id} // ✅ always use _id
//           />
//         </div>
//       </div>
//     </main>
//     </>
//   );
// };

// export default ChatArea;


// const HeaderBtn = ({ icon }) => (
//   <button className="p-2 hover:bg-gray-100 rounded-lg text-slate-500 transition-colors">{icon}</button>
// );