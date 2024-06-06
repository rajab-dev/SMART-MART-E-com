import { getCartProductFromLS } from "./getCartProducts.js";
import { updateCartProductTotal } from "./updateCartProductTotal.js";
import { updateCartValue } from "./updateCartValue.js";

export const removeProdFromCart=(id)=>{
let cartProducts=getCartProductFromLS();
   cartProducts=cartProducts.filter((curProd)=>{
       return curProd.id!==id;
   });
  localStorage.setItem("cartProductLS",JSON.stringify(cartProducts));
  let removeDiv=document.querySelector(`#card${id}`)
  if (removeDiv){
    removeDiv.remove();
  };
  updateCartValue(cartProducts);
  updateCartProductTotal()
};