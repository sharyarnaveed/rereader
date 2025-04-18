import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import './index.css'
import Home from "./Home/Home.jsx";
import Constactus from "./Contact/Constactus.jsx";
import Products from "./Products/Products.jsx";
import ProductDetail from "./Products/ProductDetail.jsx";
import PriacyPolicy from "./Privacypolicy/PriacyPolicy.jsx";
import Signup from "./Auth/Signup.jsx";
import Signin from "./Auth/Signin.jsx";
import ForgotPassword from "./Auth/ForgotPassword.jsx";
import OtpVerification from "./Auth/Otpverification.jsx";
import DashboardHome from "./Dashboard/DashboardHome.jsx";
import UploadProduct from "./Dashboard/UploadProduct.jsx";
import { Toaster } from "react-hot-toast"


const router=createBrowserRouter(
  [
    {
      path:"/",
      element:<App/>,
      children:[
      {
        path:"/",
        element:<Home/>
      }
      ,{
        path:"/contact",
        element:<Constactus/>
      },{
        path:"/product",
        element:<Products/>
      },
      {
        path:"/product-detail/:id",
        element:<ProductDetail/>
      },
      {
        path:"/policy",
        element:<PriacyPolicy/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:"/signin",
        element:<Signin/>
      },{
        path:"/forgotpassword",
        element:<ForgotPassword/>
      },
      {
        path:"/otpverification/:id",
        element:<OtpVerification/>
      },
      {
path:"/userdashboard",
children:[
  {
    path:"/userdashboard",
    element:<DashboardHome/>
    },
  {
    path:"/userdashboard/upload",
    element:<UploadProduct/>
    }]
      }
   
      ]
    }
  ]
)


ReactDOM.createRoot(document.getElementById("root")).render(
<>
  <RouterProvider router={router}  />
<Toaster position="top-right" reverseOrder={false} />
</>
)