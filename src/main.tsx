import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminLogin } from './pages/AdminLogin.tsx'
import { AdminHome } from './pages/AdminHome.tsx'
import { UserLogin } from './pages/UserLogin.tsx'
import { UserHome } from './pages/UserHome.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/user' element={<UserHome />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)