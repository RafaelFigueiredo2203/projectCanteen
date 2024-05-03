import { useState } from "react";
import { useNavigation } from "react-router-dom";
import { Header } from "./components/header";
import { ProductCard } from "./components/product-card";

export function Cart(){
  const navigation = useNavigation();
  const [addres, setAddres] = useState('');
  const PHONE_NUMBER = '5514996112228'
 // const total = FormatCurrency(cartStore.products.reduce((total,product) => total + product.price * product.quantity,0))



  return(
    <View className="flex-1 pt-8">
      <Header title="Seu Carrinho"/>
      <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      extraHeight={100}
      >
    
      {
        cartStore.products.length > 0 ? (
          <div className="p-5 flex-1">
        {
          cartStore.products.map((product) => (
            <ProductCard key={product.id} data={product} 
            onPress={() => handleProductRemove(product)}/>
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
      
      </KeyboardAwareScrollView>
      <View className="flex-row gap-3  items-center mt-5 mb-4 border-t border-slate-700 mx-4">
          <Text className="text-white text-xl font-subtitle ">
            Total:
          </Text>
          <Text className="text-lime-400 text-2xl font-heading">
            {total}
          </Text>
      </View>

      <InputInformations 
      
      blurOnSubmit={true}
      onChangeText={setAddres}
      placeholder="Informe o endereço de entrega, rua , bairro , número e complem."/>

      <View className="gap-5 p-5">
        <Button onPress={handleOrder}>
        <Button.Text>
          Enviar Pedido
        </Button.Text>
        <Button.Icon>
          <Feather name="arrow-right-circle" size={20}/>
        </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápido" href="/"/>
      </View>
    </View>
  )
}