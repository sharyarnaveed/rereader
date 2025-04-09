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
      }
      ]
    }
  ]
)


ReactDOM.createRoot(document.getElementById("root")).render(

  <RouterProvider router={router}  />

)