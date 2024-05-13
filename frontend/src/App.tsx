import "./styles/App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Contact from "./pages/Contact";
import LandingPage from "./pages/LandingPage";
import Chatbot from "./pages/Chatbot";
import Codegen from "./pages/Codegen";
import Notification from "../src/pages/Notification"; // Import the Notification component

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/codegen" element={<Codegen />} />
        </Routes>
      </BrowserRouter>
      <Notification /> {/* Render the Notification component */}
    </>
  );
}
