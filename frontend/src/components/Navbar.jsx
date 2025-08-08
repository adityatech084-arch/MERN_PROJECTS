import React from 'react'
import { Link } from 'react-router-dom'  // ✅ Correct import
import { LogOut, MessageSquare, Settings, Shell, User } from 'lucide-react'
import { useSelector ,useDispatch} from 'react-redux';
import { logout } from '../store/authSlice.js';

function Navbar() {
 const {authUser} = useSelector((state)=>state.auth);
const dispatch =useDispatch();




 function handleLogout(){
   dispatch(logout())
 }
  return (
    <header className=' sticky z-50 top-0 w-full bg-white/80 backdrop-blur-lg border border-gray-200 shadow-sm'>
      <div className='max-w-screen-2xl mx-auto px-4 h-16'>
        <div className='flex items-center justify-between h-full'>
          <div className='flex items-center gap-8'>
            <Link to="/" className='flex items-center gap-2.5 hover:opacity-80 transition'>
              <div className='w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center'>
                <Shell className='w-5 h-5 text-blue-600' />
              </div>
              <h1 className='text-lg font-bold text-gray-800'>ZapChat</h1>
            </Link>
          </div>

    {/* right action */}
    <div className='flex items-center gap-2'>
        {authUser && (
            <>
            <Link to={"/profile"}
            className='inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-100 transition sm:text-md'>
                <User className='w-5 h-5'/>
                <span className='hidden sm:inline'>Profile</span>
            </Link>

            <button 
            onClick={handleLogout}
            className='inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-red-700 hover:bg-red-100 transition'>
                <LogOut className='w-5 h-5'/>
                <span className='hidden sm:inline'>Logout</span>
            </button>
            </>
        )}
    </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar
