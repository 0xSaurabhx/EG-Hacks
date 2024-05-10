
import Form from "@/components/Form"
import {Quote} from "@/components/Quote"
import { Navigate } from 'react-router-dom';
const Signin = () => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  console.log(isAuthenticated)
  if (isAuthenticated) {
    return <Navigate to="/codegen" replace />;
  }
  return (
    <div>
      <div className="grid grid-cols-1: lg:grid-cols-2  ">
      <div className="flex justify-center items-center my-20 ">
        <Form type="signin"/>
        </div>
        <div className="hiddden lg:block">
        <Quote/>
        </div>
       
      </div>
    </div>
  )
}

export default Signin
