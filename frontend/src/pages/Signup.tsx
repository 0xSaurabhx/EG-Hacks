
import Form from "../components/Form"
import {Quote2} from "../components/Quote2";
const Signup = () => {
  return (
    <div>
      <div className="grid grid-cols-1: lg:grid-cols-2  ">
      <div className="flex justify-center my-20 ">
        <Form type="signup"/>
        </div>
        <div className="hiddden lg:block">
        <Quote2/>
        </div>
       
      </div>
    </div>
  )
}

export default Signup
