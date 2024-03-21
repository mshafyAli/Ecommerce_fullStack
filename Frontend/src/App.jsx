import { Navigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store.js";
import { LoadUser } from "./redux/actions/user.js";
import { LoadSeller }  from "./redux/actions/user.js";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import SellerProtectedRoute from './routes/SellerProtectdedRoute.jsx';

import { ShopHomePage } from "./ShopRoutes";
import { ShopDashBoardPage,ShopCreateProduct,ShopAllProducts } from "./routes/ShopRoutes";

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
    Store.dispatch(LoadSeller());

    

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

          {/* Shop Route */}

          <Route path='/shop-create' element={<ShopCreatePage/>}/>
          <Route path='/shop-login' element={<ShopLoginPage/>}/>
          <Route path='/shop/:id' element={
            <SellerProtectedRoute >
              <ShopHomePage/>
            </SellerProtectedRoute>
          }/>
          <Route path='/dashboard' element={
            <SellerProtectedRoute >
              <ShopDashBoardPage/>
            </SellerProtectedRoute>
          }/>
          <Route path='/dashboard-create-product' element={
            <SellerProtectedRoute >
              <ShopCreateProduct/>
            </SellerProtectedRoute>
          }/>
          <Route path='/dashboard-products' element={
            <SellerProtectedRoute >
              <ShopAllProducts/>
            </SellerProtectedRoute>
          }/>
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
