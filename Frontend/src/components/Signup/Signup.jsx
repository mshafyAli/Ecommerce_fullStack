import {React,useState} from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import styles from "../../styles/styles.js"
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import baseUrl from "../../baseUrl.js"
import { toast } from "react-toastify";



const Signup = () => {
const [email,setEmail]= useState("");
const [name,setName]= useState("");
const [password,setPassword]= useState("");
const [visible,setVisible]= useState(false);
const [avatar, setAvatar] = useState(null);

const handleFileInputChange = (e)=>{
  const file = e.target.files[0];
  setAvatar(file);

} 
const handleSubmit = async(e)=>{
  e.preventDefault();
 try{
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', name);
  formData.append('password', password);
  formData.append('file', avatar);
  // console.log(formData);
 await axios.post(`${baseUrl}/user/create-user`, formData,config).then((res)=>{
  toast.success(res.data.message);
    setEmail("");
    setName("");
    setPassword("");
    setAvatar();
    console.log(res);
    
  })

 }catch(error) {
  if (error.response && error.response.status === 400) {
    // Handle specific error scenario (user already exists)
    toast.error("User already exists. Please use a different email.");
  } else {
    // Generic error handling
    toast.error("An error occurred. Please try again later.");
    console.error(error);
  }
}
}

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="full-name">Full Name</label>
                <div className="mt-1">
                  <input type="text" name="full-name" autoComplete="name" required value={name} 
                  onChange={(e)=>setName(e.target.value) } className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <div className="mt-1">
                  <input type="email" name="email" autoComplete="email" required value={email} 
                  onChange={(e)=>setEmail(e.target.value) } className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className="mt-1 relative">
                  <input type={visible ? "text" :"password" } name="password" autoComplete="current-password" required value={password} 
                  onChange={(e)=>setPassword(e.target.value) } className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    {visible ? (<AiOutlineEye className="absolute right-2 top-2 cursor-pointer" size={22} onClick={()=>setVisible(false)}/>
                    ):
                    (
                        <AiOutlineEyeInvisible className="absolute right-2 top-2 cursor-pointer" size={22} onClick={()=>setVisible(true)}/>
                    )}   
                    
                </div>
              </div>
                <div>
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700"></label>
                    <div className="mt-2 flex items-center">
                        <span className="inline-bloack h-8 w-8 rounded-full overflow-hidden">
                            {avatar ? (<img src={avatar} alt="avatar" className="h-full w-full object-cover rounded-full" />):(<RxAvatar className="h-8 w-8" />)}
                        </span>
                        <label htmlFor="file-input" className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"><span>
                            Upload a file
                        </span>
                        <input type="file" name="avatar" id="file-input" accept=".jpg,.jpeg,.png"
                        onChange={handleFileInputChange} className="sr-only" />

                        </label>
                    </div>
                </div>


              
              <div>
                <button type="submit" className=" w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">Submit</button>
              </div>

              <div className={`${styles.noramlFlex}`}>
                <h4>Already have an Account?</h4>
                <Link to="/login" className="text-blue-600 pl-2">Sign In</Link>
              </div>

            </form>
          </div>
        </div>
      
    </div>
  );
};

export default Signup;
