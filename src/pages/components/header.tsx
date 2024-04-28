import { ShoppingBagOpen } from "@phosphor-icons/react";

type HeaderProps = {
  title: string;
  cartQuantityItems?: number;
};

export function Header({ title, cartQuantityItems = 0 }: HeaderProps){
 return (
  <div className="flex flex-row items-center border-b border-slate-700 pb-5 mx-5 mt-5">
  <div className="flex-1">
    <img
    className="h-6 w-32" 
    src="https://github.com/RafaelFigueiredo2203/nlw-expert-react-native/blob/main/src/assets/logo.png?raw=true"/>
    <span className="text-white text-xl font-heading mt-2 font-inter">{title}</span>
  </div>


  
    <button >
      <div className="relative bg-lime-300 w-4 h-4 rounded-full flex items-center justify-center top-3 z-10 -right-5">
        <span className="text-slate-900 font-bold text-xs ">{cartQuantityItems}</span>
      </div>

      <ShoppingBagOpen size={32} color="white" />
    </button>
   
</div>
)}