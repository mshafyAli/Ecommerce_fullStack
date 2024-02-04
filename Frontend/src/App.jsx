import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';
import baseUrl from './baseUrl.js';



import { LoginPage,SignupPage,ActivationPage } from './routes/Routes.js'


const App = () => {

  useEffect(()=>{
    axios.get(`${baseUrl}/user/get-user`,{withCredentials:true}).then((res)=>{

      console.log(res.data.message)
      toast.success(res.data.message)
    }).catch((error)=>{
      toast.error(error.response.data.message)
      console.log(error)
    })
  },)


  return (
    
<BrowserRouter>
<Routes>
    {/* <Route path='/' element={<LoginPage/>} /> */}
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/sign-up' element={<SignupPage/>}/>
    <Route path='/activation/:activation_token' element={<ActivationPage />}/>
</Routes>
<ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

</BrowserRouter>
    
  )
}

export default App