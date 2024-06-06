import { getCartProductFromLS } from "./getCartProducts.js";
import { updateCartProductTotal } from "./updateCartProductTotal.js";

export const incrementDecrement = (event, id, stock, price) => {
  const currentCardElement = document.querySelector(`#card${id}`);
  const productQuantity = currentCardElement.querySelector(".productQuantity");
  const productPrice = currentCardElement.querySelector(".productPrice");

  let quantity = 1;
  let localStoragePrice = 0;

  //   ----------------------------------------
  //   Get the data from localStorage
  //   ----------------------------------------


  axios({
    method: "get",
    url: "http://localhost:3000/addToCartApi",
  }).then(function (response) {
    // response = response.json()
    const products = response.data.products;


    // let localCartProducts = products;
    // let products = localCartProducts.find((curProd) => curProd.id === id);
  
    if (products) {
      quantity = products.quantity;
      localStoragePrice = products.price;
    } else {
      localStoragePrice = price;
      price = price;
    }
  
    if (event.target.className === "cartIncrement") {
      if (quantity < stock) {
        quantity += 1;
      } else if (quantity === stock) {
        quantity = stock;
        localStoragePrice = price * stock;
      }
    }
  
    if (event.target.className === "cartDecrement") {
      if (quantity > 1) {
        quantity -= 1;
      }
    }
  
  
    localStoragePrice = price * quantity;
    localStoragePrice = Number(localStoragePrice.toFixed(2));
  
    let updatedCart = { id, quantity, price: localStoragePrice };
  
    updatedCart = localCartProducts.map((curProd) => {
      return curProd.id === id ? updatedCart : curProd;
    });
    //   console.log(updatedCart);
    localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));
  
    
    productQuantity.innerText = quantity;
    productPrice.innerText = localStoragePrice;
  
  
    updateCartProductTotal();
  
  
  


  })

}
