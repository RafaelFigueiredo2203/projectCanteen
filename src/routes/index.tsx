import ProductById from "@/pages/[id]";
import { Cart } from "@/pages/cart";
import { Home } from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/product/:id",
    element: <ProductById/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
  },
]);