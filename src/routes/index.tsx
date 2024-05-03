import ProductById from "@/pages/[id]";
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
]);