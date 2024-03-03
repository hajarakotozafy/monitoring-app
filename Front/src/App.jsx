import React from 'react';
import AccountTable from './components/AccountTable';
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
        <Route path="/admin" element={<h1 style={{marginTop: '200px'}}>ADMIN</h1>}/>
      </Route>
    </Routes>
  )
}

export default App
