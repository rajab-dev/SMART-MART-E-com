// import './style.css'
// import products from "../api/products.js"
import { showProductContainer } from './homeProductCards.js';
// import axios from "../../node_modules/axios/dist/axios.min.js"
// call the function to display all the products;



axios({
  method: "get",
  url: "http://localhost:3000/allprd",
}).then(function (response) {
  // response = response.json()
  const products = response.data;
  // console.log(products)
  showProductContainer(products);
});

