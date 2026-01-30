import React from 'react'
import ChatApp from './pages/ChatApp'
import LoadingScreen from './components/LoadingScreen'
// import AuthPage from './authPages/authPage'
import { Route, Routes } from 'react-router-dom'
import { AuthProtector } from './protector/protect'

function App() {
  // new version add on kara hai v1
  return (
    <>
<Routes>
  <Route path='/auth'element={<AuthPage/>}/>
  <Route element={<AuthProtector/>}>
  <Route path='/'element={<ChatApp/>}/>
  </Route>
</Routes>
    </>
  )
}

export default App;


         




     