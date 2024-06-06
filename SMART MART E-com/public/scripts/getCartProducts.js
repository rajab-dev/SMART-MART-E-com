import { updateCartValue } from "./updateCartValue.js";

export const getCartProductFromLS=()=>{
   // let cartProducts=localStorage.getItem("cartProductLS");

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
    

   

};

