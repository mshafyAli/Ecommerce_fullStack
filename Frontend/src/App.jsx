import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




import { LoginPage,SignupPage,ActivationPage } from './routes/Routes.js'


const App = () => {
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