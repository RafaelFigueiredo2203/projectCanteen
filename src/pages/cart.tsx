import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/utils/context/useCart";
import { FormatCurrency } from "@/utils/functions/formatCurrency";
import { CircleArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "./components/header";
import { ProductCard } from "./components/product-card";




interface IFormInput {
  addres: string;
  paymentForm:string;
  obs: string;
  name:string;
  changeMoney:string;
}

export function Cart(){
  const {productsBuy, setProductsBuy} = useCart();
 
  const navigation = useNavigate();


  const PHONE_NUMBER = '5514996112228'

  const notify = () => toast.warn("Produto removido!", {position:'top-center'});
  const notifyFinally = () => toast.success("Pedido processado com sucesso!", {position:'top-center'});

  const total = FormatCurrency(productsBuy.reduce((total,product) => total + product.price ,0))

  const { register, handleSubmit, control,reset ,formState: { errors } } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const finallyProducts = productsBuy.map((product) => `\n-${product.title} - ${FormatCurrency(product.price)}`)
    .join("")
  
  const message = `
  *Novo Pedido* ✅😍\n
  Olá, meu nome é ${data.name} e gostaria de fazer um pedido.\n
  *Pedido:*
    ${finallyProducts}
  \n*Entregar em:* ${data.addres}\n
  *Forma de pagamento:* ${data.paymentForm}
  ${
    data.paymentForm === 'Dinheiro' ?
      `*Troco para:* ${data.changeMoney}\n`
      :
      "" 
  }
  *Observação:* ${data.obs}\n
  *Valor total:* ${total}
    `;
    
    const whatsappMessage = encodeURIComponent(message);
    window.location.href = `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${whatsappMessage}`
    setProductsBuy([]);
    localStorage.removeItem('cart');
    notifyFinally();
    reset();
    navigation('/');
  }
 

 useEffect(() => {
  const productsJSON = localStorage.getItem('cart');
  const products = productsJSON ? JSON.parse(productsJSON) : [];
  setProductsBuy(products)

}, [setProductsBuy]);

function handleProductRemove(id: string) {
  const productIndex = productsBuy.findIndex(product => product.id === id);

  if (productIndex !== -1) { // Verifica se o produto foi encontrado
    const filterProducts = [...productsBuy]; // Cria uma cópia do array de produtos
    filterProducts.splice(productIndex, 1); // Remove o produto do array

    setProductsBuy(filterProducts); // Atualiza o estado com o novo array de produtos

    localStorage.setItem('cart', JSON.stringify(filterProducts));
    notify() // Atualiza o armazenamento local
  }
}


  return(
    <div className="flex flex-col flex-1 pt-8 p-5 ">
      <Header title="Seu Carrinho" showCartIcon={false}/>
    
      {
        productsBuy.length > 0 ? (
          <div className="py-5 flex flex-1 flex-col max-h-64 overflow-y-auto lg:grid grid-cols-2 gap-3 xl:grid-cols-3">
        {
          productsBuy.map((product) => (
            <ProductCard key={product.id} 
            title={product.title}
            description={product.description}
            thumbnail={product.thumbnail}
            showRemoveButton
            onRemoveproduct={() => handleProductRemove(product.id)}
            />
          ))
        }
      </div>
        ) 
        : 
        (
        <span className="font-body text-slate-400 text-center my-8">
          Seu carrinho está vazio!
        </span>
        )
      }   
      <div className="flex flex-row gap-3  items-center mt-5 mb-4 border-t border-slate-700 pt-5 ">
          <span className="text-white text-xl font-subtitle  ">
            Total:
          </span>
          <span className="text-lime-400 text-2xl font-heading">
          {total}
          </span>
         
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="lg:grid grid-cols-2 gap-3 xl:grid-cols-3">

      <div>
      {errors.paymentForm && <span className="text-red-500">{errors.paymentForm.message}</span>}
      <label className="text-white font-inter" >Forma de pagamento:</label>
      <Controller
          name="paymentForm"
          control={control}
          defaultValue="Cartão - Débito"
          rules={{ required: 'Por favor, selecione a forma de pagamento.' }}
          render={({ field }) => (
      <Select 
      onValueChange={field.onChange}
      value={field.value}
      defaultValue={field.value} 
     
      >
        <SelectTrigger className="w-[190px] text-slate-200 font-inter font-medium">
          <SelectValue placeholder="Forma de pagamento" />
        </SelectTrigger>
        <SelectContent  >
          <SelectItem  value="Cartão - Débito"  >Cartão - Débito</SelectItem>
          <SelectItem value="Cartão - Crédito"  >Cartão - Crédito</SelectItem>
          <SelectItem value="Pix" >Pix</SelectItem>
          <SelectItem value="Dinheiro" >Dinheiro</SelectItem>
        </SelectContent>
      </Select>
   )}
   />
   </div>

      <div>
       <label className="text-white font-inter">Precisa de troco se for em dinheiro?</label>
       <input type="text" className="flex items-center w-full bg-slate-800 rounded-md h-10 pl-2 mb-3 text-slate-200 font-inter "
       placeholder="Ex:Troco para R$50"  {...register("changeMoney")} />
      </div>
      
      <div>
      {errors.addres && <span className="text-red-500">{errors.addres.message}</span>}
      <label className="text-white font-inter" >Endereço:</label>
      <input type="text" className="flex items-center w-full bg-slate-800 rounded-md h-10 pl-2 mb-3 text-slate-200 font-inter " 
      placeholder="Rua N°, bairro ,cidade" {...register("addres",{ required:'Por favor, informe seu endereço.'} )}  /> 
      </div>
      
      <div>
      {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      <label className="text-white font-inter ">Seu nome:</label>
      <input type="text" className="flex items-center w-full bg-slate-800 rounded-md h-10 pl-2 mb-3 text-slate-200 font-inter " 
        placeholder="Ex: Maria da Silva" {...register("name", { required:'Por favor, informe seu nome.'} )}/>
      </div>

      <div>
      <label className="text-white font-inter ">Alguma observação:</label>
      <input type="text" className="flex items-center w-full bg-slate-800 rounded-md h-10 pl-2 mb-3 text-slate-200 font-inter " 
        placeholder="Ex: meu lanche não pode bata palha..." {...register("obs",)}/>
      </div>
     
     </div>
      <div className="gap-5 p-5 flex flex-col items-center justify-center">
      <Button type="submit" className="w-full h-12 bg-lime-600  xl:w-96 " disabled={productsBuy.length <= 0}>          
            <span className="font-inter text-slate-200 text-lg mr-5">Enviar Pedido</span>
            <CircleArrowRight name="plus-circle " size={20}/>
     </Button>
     
     <Link className="flex items-center justify-center w-full h-12  mt-5 rounded-md xl:w-96"  to="/">
        <span className="font-inter text-slate-200 text-lg ">Voltar ao Cardápio</span>
      </Link>
      </div>
      </form>
    </div>
  )
}