// import { getCartProductFromLS } from "./getCartProducts.js";

// export const updateCartProductTotal = async() => {
//   let productSubTotal = document.querySelector(".productSubTotal");
//   let productFinalTotal = document.querySelector(".productFinalTotal");

//   axios({
//     method: "get",
//     url: "http://localhost:3000/addToCartApi",
//   }).then(function (response) {
//     // response = response.json()
//     const products = response.data.products;
   
    
//   let localCartProducts = products;
//   let initialValue = 0;
//   let totalProductPrice = localCartProducts.reduce((accum, curElem) => {
//     let productPrice = parseInt(curElem.price) || 0;
//     return accum + productPrice;
//   }, initialValue);
//   //   console.log(totalProductPrice);

//   productSubTotal.textContent = `Rs.${totalProductPrice}`;
//   productFinalTotal.textContent = `Rs.${totalProductPrice + 50}`;
//   console.log ("checkout button working",productFinalTotal)

//   const paymentBtn = document.querySelector(".payment");
// // paymentBtn.addEventListener("click", async () => {
// //   const stripe = await Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
// //   // console.log("Stripe loaded successfully",productFinalTotal.textContent);
// //   const body = {
// //     product:products,
// //   }
// //   const headers = {
// //     'Content-Type':'application/json'
// //   }
// //   const response = await fetch("http://localhost:3000/api/create-checkout-session",{
// //     method: "POST",
// //     headers:headers,
// //     body:JSON.stringify(body)
// //   });
// //   const session = await response.json();
// //   const result = await stripe.redirectToCheckout({sessionId:session.id})
// //   // Now you can use Stripe methods here
// //   if (result.error){
// //     console.log(result.error);
// //   }
// // });

// paymentBtn.addEventListener("click", async()=>{
//   const response = await axios.get("http://localhost:3000/addToCartApi");
//   const products = response.data.products;
//   const stripe = await Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
//     const body = {
//       product: products,
//     };
//     const headers = {
//       'Content-Type': 'application/json'
//     };
//     const fetchResponse = await fetch("http://localhost:3000/api/create-checkout-session", {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify(body)
//     });
//     const session = await fetchResponse.json();
//     const result = await stripe.redirectToCheckout({ sessionId: session.id });

//     if (result.error) {
//       console.log(result.error);
//     }
// })


// });

  

// }




//  gpt version
import { getCartProductFromLS } from "./getCartProducts.js";

export const updateCartProductTotal = async () => {
  let productSubTotal = document.querySelector(".productSubTotal");
  let productFinalTotal = document.querySelector(".productFinalTotal");

  try {
    const response = await axios.get("http://localhost:3000/addToCartApi");
    const products = response.data.products;

    let localCartProducts = products;
    let initialValue = 0;
    let totalProductPrice = localCartProducts.reduce((accum, curElem) => {
      let productPrice = parseInt(curElem.price) || 0;
      return accum + productPrice;
    }, initialValue);

    productSubTotal.textContent = `Rs.${totalProductPrice}`;
    productFinalTotal.textContent = `Rs.${totalProductPrice + 50}`;

    console.log("checkout button working", productFinalTotal);

    // Attach event listener to payment button outside this function to avoid multiple listeners
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Attach event listener to payment button
const paymentBtn = document.querySelector(".payment");
paymentBtn.addEventListener("click", async () => {
  try {
    const response = await axios.get("http://localhost:3000/addToCartApi");
    const products = response.data.products;

    const stripe = await Stripe('pk_test_51PCIkW01lbsQApCb6HzUGZeKwSYOkqTCD0xDOFk6sM99D1fInLjIy90fr89yNjRPmjRJ8RalGMytWnm8R06UAH6c00B4pF4v7g');
    const body = {
      product: products,
    };
    const headers = {
      'Content-Type': 'application/json'
    };
    const fetchResponse = await fetch("http://localhost:3000/api/create-checkout-session", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
    const session = await fetchResponse.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.log(result.error);
    }
  } catch (error) {
    console.error("Error handling payment:", error);
  }
});
