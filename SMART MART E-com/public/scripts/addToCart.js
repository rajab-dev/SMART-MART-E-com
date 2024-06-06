import { getCartProductFromLS } from "./getCartProducts.js";
import { updateCartValue } from "./updateCartValue.js";
getCartProductFromLS();
export const addToCart=(event,id,stock)=>{
    let arrlocalStorageProduct=getCartProductFromLS();
    const curProdElement=document.querySelector(`#card${id}`);
    // console.log(curProdElement);
  let quantity=curProdElement.querySelector(".productQuantity").innerText;
  let price=curProdElement.querySelector(".productPrice").innerText;
//   console.log(quantity,price);  
  price=price.replace("Rs.","");
  let existingProduct=arrlocalStorageProduct.find((curProd)=>curProd.id===id);

  if(existingProduct && quantity>1){
    quantity= Number(existingProduct.quantity)+ Number(quantity);
  price= Number(quantity*price);
  let updatedCart={id,quantity,price};
     updatedCart= arrlocalStorageProduct.map((curProd)=>{
    return curProd.id===id ? updatedCart : curProd;
  });
  localStorage.setItem("cartProductLS",JSON.stringify(updatedCart));
  }

    if(existingProduct){
        return false;
    }
  price= Number(quantity*price);
  quantity=Number(quantity);
//   console.log(price);
  arrlocalStorageProduct.push({id,quantity,price});
  localStorage.setItem("cartProductLS",JSON.stringify(arrlocalStorageProduct));
  updateCartValue(arrlocalStorageProduct);
};