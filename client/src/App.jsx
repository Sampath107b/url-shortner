import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute.jsx';
import Navbar from './components/Navbar.jsx';
import {useAuth} from './context/authContext.jsx';

const App = () => {
  const {token}=useAuth();
  return (
    <BrowserRouter>
      <div className="bg-slate-100 min-h-screen text-slate-800">
      <Navbar />
       <main className="container mx-auto p-4 md:p-8">

       <Routes>
         <Route path='/' element={<HomePage />}/>
         <Route path='/login' element={<LoginPage />}/>
         <Route path='/register' element={<RegisterPage />}/>
         <Route path='/dashboard' element={
          <PrivateRoute>
             <DashboardPage />
          </PrivateRoute>}/>
       </Routes>
       </main> 
      </div>
    
    
    
    </BrowserRouter>
  )
}

export default App