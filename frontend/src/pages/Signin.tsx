// Signin.tsx
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from "@/components/Form";
import { Quote } from "@/components/Quote";
import {Spinner} from '../components/Spinner'; // Import the Spinner component

const Signin = () => {
  const [loading, setLoading] = useState(false); // State to manage the loading state

  const handleSignIn = async () => {
    setLoading(true); // Show spinner
    try {
      const isAuthenticated = localStorage.getItem('user') !== null;
      if (isAuthenticated) {
        toast.success('Authentication successful');
        setLoading(false); // Hide spinner
        return <Navigate to="/codegen" replace />;
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      toast.error((error as Error).message);
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center items-center my-20">
          {loading ? <Spinner /> : <Form type="signin" onSubmit={handleSignIn} />} {/* Show spinner or form */}
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};

export default Signin;
