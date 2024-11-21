
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/utils/context/useCart";
import axios from "axios";
import { Key, useEffect } from "react";
import { useQuery } from "react-query";
import { Header } from "./components/header";
import { ProductCard } from "./components/product-card";


export function Home(){
  const {setProductsBuy} = useCart()

  const productsJSON = localStorage.getItem('cart');
  const products = productsJSON ? JSON.parse(productsJSON) : [];



  async function fetchData() {
    const res = await axios.get('https://raw.githubusercontent.com/RafaelFigueiredo2203/projectCanteen/main/src/utils/db.json');
    return res.data;
  }
  
  
    const { data, isLoading, refetch } = useQuery('data', fetchData);
    const productsStringfy = JSON.stringify(data);


    useEffect(() => {
      // Chamada para buscar os dados
      fetchData();
      refetch();
      localStorage.setItem('dataProducts',productsStringfy);
      
    }, [productsStringfy, refetch]); // Certifique-se de adicionar dependências vazias para executar apenas uma vez

    useEffect(() => {
      const productsJSON = localStorage.getItem('cart');
      const products = productsJSON ? JSON.parse(productsJSON) : [];
      setProductsBuy(products)
    
    }, [setProductsBuy]);

  if (isLoading) return (
    <>
    <Header title="Faça Seu Pedido"  showCartIcon/>
    <div className="flex flex-col  mt-5 p-5">
    <Skeleton  className="w-full h-20 rounded-md mt-5"  />
    <Skeleton className="w-full h-20 rounded-md mt-5"/>
    <Skeleton className="w-full h-20 rounded-md mt-5"/>
    <Skeleton className="w-full h-20 rounded-md mt-5"/>
    <Skeleton className="w-full h-20 rounded-md mt-5"/>
    </div>
    </>
  )

  return(
    <div className="p-5 w-full ">
      <Header title="Faça Seu Pedido"  showCartIcon={products.length > 0 ? true : false}/>
      {data.map((category: { id: Key | null | undefined; title: string; data: any[]; }) => (
    <div key={category.title} className="border-b border-slate-700" >
        <p className="font-inter text-white text-xl mb-5 mt-5">{category.title}</p>
        <div className="lg:grid grid-cols-2 gap-3 xl:grid-cols-3">
        {category.data.map((product: { id: Key | null | undefined; title: string; description: string; thumbnail: string; }) => (
            
            <ProductCard 
                key={`${category.title}_${product.id}`}
                title={product.title}
                description={product.description}
                thumbnail={product.thumbnail}
                hreference={`/product/${product.id}`}
             
            />
            
        ))}
       
        </div>
       
    </div>
))}

  </div>
  )
}