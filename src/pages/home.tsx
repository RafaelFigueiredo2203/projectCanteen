
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { Key, useEffect } from "react";
import { useQuery } from "react-query";
import { Header } from "./components/header";
import { ProductCard } from "./components/product-card";


export function Home(){
  async function fetchData() {
    const res = await axios.get('https://raw.githubusercontent.com/RafaelFigueiredo2203/projectCanteen/main/src/utils/db.json');
    return res.data;
  }
  
  
    const { data, isLoading, isError, error,refetch } = useQuery('data', fetchData);
    const productsStringfy = JSON.stringify(data);


    useEffect(() => {
      // Chamada para buscar os dados
      fetchData();
      refetch();
      localStorage.setItem('dataProducts',productsStringfy);
    }, [productsStringfy, refetch]); // Certifique-se de adicionar dependências vazias para executar apenas uma vez
  
    

  if (isLoading) return (
    <>
    <Header title="Faça Seu Pedido" cartQuantityItems={0}/>
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
      <Header title="Faça Seu Pedido" cartQuantityItems={0}/>
      {data.map((category: { id: Key | null | undefined; title: string; data: any[]; }) => (
    <div key={category.title}>
        <p className="font-inter text-white text-xl mb-5 mt-5">{category.title}</p>
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
))}

  </div>
  )
}