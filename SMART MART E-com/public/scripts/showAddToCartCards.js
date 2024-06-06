// import  products from "../api/products.js"
// import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS.js";
import { getCartProductFromLS } from "./getCartProducts.js"
import { incrementDecrement } from "./incrementDecrement.js";
import { removeProdFromCart } from "./removeProdFromCart.js";
import { updateCartProductTotal } from "./updateCartProductTotal.js";
import { updateCartValue } from "./updateCartValue.js";




axios({
  method: "get",
  url: "http://localhost:3000/addToCartApi",
}).then(function (response) {
  // response = response.json()
  const products = response.data.products;
   
 


  axios({
    method: "get",
    url: "http://localhost:3000/users",
  }).then(function (response) {
    // response = response.json()
    const products = response.data.cart;
      console.log(products)
    if(!products){
  return [];
 }
updateCartValue(products);
 return products;
    
  });


// let cartProducts=getCartProductFromLS();
// let filterProducts=products.filter((curProd)=>{
//   return cartProducts.some((curElem)=>curElem.id===curProd._id);   
// });
// console.log(filterProducts);
updateCartProductTotal()
// to update cart page 
const cartElement=document.querySelector("#productCartContainer");
const templateContainer=document.querySelector("#productCartTemplate");

const showCartProduct=()=>{


        products.forEach(curProd => {
        const {category,_id,name,image,stock,price}=curProd;
        let productClone=document.importNode(templateContainer.content,true);
        // const lsActualData=fetchQuantityFromCartLS(_id,price);
        productClone.querySelector(".removefrom").href += _id
        productClone.querySelector("#cardValue").setAttribute("id",`card${_id}`)
        productClone.querySelector(".category").textContent=category;
        productClone.querySelector(".productName").textContent=name;
        productClone.querySelector(".productImage").src+=image;
        productClone.querySelector(".productPrice").textContent=price;
        // productClone.querySelector(".productQuantity").textContent=lsActualData.quantity;
        // productClone.querySelector(".remove-to-cart-button").addEventListener("click",()=>removeProdFromCart(_id));
        productClone.querySelector(".orderbtn").href+=_id
        productClone.querySelector(".stockElement").addEventListener("click",(event)=>{
            incrementDecrement(event,_id,stock,price);
           });
        
        
          
         cartElement.append(productClone);
    });

}
showCartProduct();
});

