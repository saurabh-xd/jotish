import './App.css'
import {  Route, Routes } from 'react-router-dom'
import Login from "./pages/Login";
import List from "./pages/List";
import Details from "./pages/Details";
import PhotoResult from "./pages/PhotoResult";
import Chart from "./pages/Chart";
import { Toaster } from 'sonner';

function App() {
 

  return (
  <div className="min-h-screen bg-gray-50 text-gray-900 antialiased selection:bg-gray-200">
    <Toaster richColors />
   <Routes>
    <Route path="/" element={<Login />} />
        <Route path="/list" element={<List />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/photo" element={<PhotoResult />} />
        <Route path="/chart" element={<Chart />} />
    </Routes> 
    </div>
  )
}

export default App
