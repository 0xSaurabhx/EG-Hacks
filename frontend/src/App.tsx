import "./App.css"

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup  from './pages/Signup'
import  Signin  from './pages/Signin'

import LandingPage from "./pages/LandingPage"

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
       
      </Routes>
    </BrowserRouter>

  </>
  
  )
}