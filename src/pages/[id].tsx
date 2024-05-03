import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FormatCurrency } from "@/utils/functions/formatCurrency";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  cover: string;
  thumbnail: string;
  ingredients: string[];
}

export default function ProductById() {

  const notify = () => toast.success("Adicionado ao carrinho!", {position:'top-center'});

  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const productsJSON = localStorage.getItem('dataProducts');
    const products = productsJSON ? JSON.parse(productsJSON) : [];

    // Iterar sobre os itens do array de produtos
    for (const item of products) {
      // Iterar sobre os produtos dentro de cada item
      for (const dataProduct of item.data) {
        if (dataProduct.id === id) {
          // Se encontrarmos o produto com o ID correspondente, atualizamos o estado do produto
          setProduct(dataProduct);
          return; // Sai da função após encontrar o produto
        }
      }
    }
  }, [id]);

 function handleBuyProduct(){
        const cartJSON = localStorage.getItem('cart');
        const cart = cartJSON ? JSON.parse(cartJSON) : [];
        const updatedCart = [...cart, product];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        notify();
 }

  return (
    <div className="flex-1">
      {product && (
        <>
          {!product.cover && <Skeleton className="w-full h-52 resize " color="white"/> }
          <img src={product.cover} className="w-full h-52 resize" />
          <div className="p-5 mt-8 flex flex-1 flex-col">
            <span className="text-xl font-heading text-white">{product.title}</span>
            <span className="text-lime-400 text-2xl font-heading my-2">{FormatCurrency(product.price)}</span>
            <span className="text-base text-slate-400 font-body leading-6 mb-6">{product.description}</span>
            {product.ingredients.map((ingredient, index) => (
              <span className="text-slate-400 font-body text-base leading-6" key={index}>
                {"\u2022"} {ingredient}
              </span>
            ))}
          </div>
          <div className="p-5 pb-8 gap-5 ">
          <Button onClick={handleBuyProduct}  className="w-full h-12 bg-lime-600 ">
            <CirclePlus name="plus-circle " size={20}/>
            <span className="font-inter text-slate-200 text-lg ml-5">Adicionar Pedido</span>
            </Button>

            <Link className="flex items-center justify-center w-full h-12  mt-5 rounded-md"  to="/">
              <span className="font-inter text-slate-200 text-lg ">Voltar ao Cardápio</span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}


