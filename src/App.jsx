import React from 'react'
import './App.css'
import { Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import AddPost from './pages/AddPost/AddPost'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import UserProfile from './pages/Profile/UserProfile'
import Sidebar from './components/Sidebar/Sidebar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import SearchUser from './pages/Search/Search'
import OtherUserProfile from './pages/Profile/OtherUserProfile'
import Notification from './pages/Notification/Notification'
import EditProfile from './pages/Profile/EditProfile'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import EditPost from './pages/EditPost/EditPost'


function App() {
  return (
    <>
      <Sidebar/>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route element={<ProtectedRoute/>}>
          <Route path='/' element={<Home/>} />
          <Route path='/notifications' element={<Notification/>}/>
          <Route path='/addPost' element={<AddPost/>} />
          <Route path='/user-profile' element={<UserProfile/>} />
          <Route path='/edit-profile' element={<EditProfile/>} />
          <Route path='/user-profile/:userId' element={<OtherUserProfile/>} />
          <Route path='/search' element={<SearchUser/>} />
          <Route path='/change-password' element={<ChangePassword/>} />
          <Route path='/edit-post/:postId' element={<EditPost/>} />
        </Route>
      </Routes>
      
    </>
  )
}

export default App
