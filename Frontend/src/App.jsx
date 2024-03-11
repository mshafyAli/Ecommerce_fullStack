import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store.js";
import { LoadUser } from "./redux/actions/user.js";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  ShopLoginPage,
  SellerActivationPage,
} from "./routes/Routes.js";
const App = () => {

  useEffect(() => {
    Store.dispatch(LoadUser());
  }, []);

  
  return (
    <>
 <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/sign-up' element={<SignupPage/>}/>
          <Route path='/activation/:activation_token' element={<ActivationPage />}/>
          <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />}/>
          <Route path='/products' element={<ProductPage/>}/>
          <Route path='/product/:name' element={<ProductDetailsPage />}/>
          <Route path='/best-selling' element={<BestSellingPage/>}/>
          <Route path='/events' element={<EventsPage/>}/>
          <Route path='/faq' element={<FAQPage/>}/>
          <Route path='/profile' element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }/>
          <Route path='/shop-create' element={<ShopCreatePage/>}/>
          <Route path='/shop-login' element={<ShopLoginPage/>}/>
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


</>
  )
};

export default App;
