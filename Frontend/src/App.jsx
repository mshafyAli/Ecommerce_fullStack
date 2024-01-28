import { BrowserRouter,Routes,Route } from 'react-router-dom'

import LoginPage from './pages/Login/LoginPage.jsx';
import SignupPage from './pages/Signup/SignupPage.jsx';


const App = () => {
  return (
    
<BrowserRouter>
<Routes>
    <Route path='/' element={<LoginPage/>} />
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/sign-up' element={<SignupPage/>}/>
</Routes>

</BrowserRouter>
    
  )
}

export default App