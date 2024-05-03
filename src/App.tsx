import { QueryClientProvider } from "react-query";
import {
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Routes } from "./routes";
import { CartProvider } from "./utils/context/cart-context";
import { queryClient } from "./utils/query";

export function App() {

  return (
    <>
   
    <QueryClientProvider client={queryClient}>
    <CartProvider>
    <RouterProvider router={Routes}/>
    
    <ToastContainer />
    </CartProvider>

    </QueryClientProvider>
   
    </>
  )
}


