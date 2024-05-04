import { ShoppingBagOpen } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.jpg';

type HeaderProps = {
  title: string;
  showCartIcon: boolean;
};

export function Header({ title, showCartIcon }: HeaderProps){
  const productsJSON = localStorage.getItem('cart');
  const products = productsJSON ? JSON.parse(productsJSON) : [];


 return (
  <div className="flex flex-row items-center border-b border-slate-700 pb-5  ">
  <div className="flex-1">
    <img
    className="h-24 rounded-full mb-2" 
    src={logo}/>
    <span className="text-white text-xl font-heading mt-2 font-inter">{title}</span>
  </div>


    {showCartIcon &&(
     <Link to="/cart" >
     <div className="relative bg-lime-300 w-4 h-4 rounded-full flex items-center justify-center top-3 z-10 -right-5">
       <span className="text-slate-900 font-bold text-xs ">{products.length}</span>
     </div>

     <ShoppingBagOpen size={32} color="white" />
   </Link>)
    }
   
   
</div>
)}