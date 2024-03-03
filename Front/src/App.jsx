import React from 'react';
import AccountTable from './components/AccountTable';
import AdminTable from './components/AdminTable';
import NavBar from './components/NavBar';
import Login from './components/Login'

import { Routes, Route, Outlet } from 'react-router-dom'

const App = () => {
  
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route
        element={
          <>
            <NavBar/>
            <Outlet/>
          </>
        }
      >
        <Route path="/account" element={<AccountTable/>}/>
        <Route path="/admin" element={<AdminTable/>}/>
      </Route>
    </Routes>
  )
}

export default App
