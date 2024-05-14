import "./styles/App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Contact from "./pages/Contact";
import LandingPage from "./pages/LandingPage";
import Chatbot from "./pages/Chatbot";
import Codegen from "./pages/Codegen";
import ConversionHistory from "./pages/ConversionHistory";
import Notification from "../src/pages/Notification";
import Ask from "./pages/Ask";


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
          <Route path="/convert/:id" element={<ConversionHistory />} />
          <Route path="/convert/:id" element={<ConversionHistory />} />
          <Route path="/ask" element={<Ask/>} />
        </Routes>
      </BrowserRouter>
      <Notification /> {/* Render the Notification component */}
    </>
  );
}
