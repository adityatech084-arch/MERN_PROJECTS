import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {getUser, setOnlineUsers} from './store/authSlice.js'
import { connectSocket,  disconnectSocket } from './lib/socket';
import {  Loader} from 'lucide-react'
import Navbar from './components/Navbar.jsx';
import { Navigate, Routes ,Route} from 'react-router-dom';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import {ToastContainer} from 'react-toastify';
import Profile from './pages/Profile.js';
import Logo from './components/Logo.jsx';
function App() {
 const {authUser,isCheckingAuth} = useSelector((state)=>state.auth);
   const dispatch = useDispatch();

   useEffect(()=>{

    dispatch(getUser())
    
   },[getUser]);



   useEffect(()=>{
    if(authUser){
      const socket = connectSocket(authUser._id);
      socket.on('getOnlineUsers',(users)=>{
             dispatch(setOnlineUsers(users))
      })

      return ()=> disconnectSocket();
    }
   },[authUser]);


   if(isCheckingAuth && !authUser){
    return  (
     <div className=' z-50 flex items-center justify-center h-screen'>
      <Logo size={`${40}`} className="text-lg sm:text-2xl"/>
      <Loader className='size-10 animate-spin'/>
     </div>
     )
   }
  return (
    <>
    
    <Navbar/>

    <Routes>
      <Route path='/' element={authUser ? <Home/> : <Navigate to={'/login'}/>}/>
      <Route path='/signup'element={!authUser ? <Register/> : <Navigate to={'/'}/>}/>
      <Route path='/login'element={!authUser ? <Login/> : <Navigate to={'/'}/>}/>
      <Route path='/profile'element={authUser ? <Profile/> : <Navigate to={'/login'}/>}/>


    </Routes>
    <ToastContainer/>

  
    
    </>
  )
}

export default App
