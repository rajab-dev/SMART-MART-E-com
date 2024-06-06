import { addToCart } from "./addToCart.js";
import { homeQuantityToggle } from "./homeQuantityToggle.js";

const productContainer=document.querySelector("#productContainer");
const productTemplate=document.querySelector("#productTemplate");
const body=document.querySelector("body")
export const showProductContainer=(products)=>{
     if(!products){
        return false;
     }
     
     products.forEach(curProd => {


       const {_id,name,category,stock,price,description,image,desDtl,brand,user}=curProd;
         const productClone=document.importNode(productTemplate.content,true);
         productClone.querySelector("#cardValue").setAttribute("id",`card${_id}`);
         productClone.querySelector(".productName").textContent=name;
         productClone.querySelector(".productImage").src += image;
         productClone.querySelector(".productImage").alt=name;
     //     console.log(user.username)
         productClone.querySelector(".userdetail").innerHTML=`<strong>Vender: </strong> ${user.username? user.username:" you"}`
         productClone.querySelector(".productDescription").textContent=description;
         productClone.querySelector(".productStock").textContent=stock;
         productClone.querySelector(".productPrice").textContent=`Rs.${price}`;
         productClone.querySelector(".category").textContent=category;
         productClone.querySelector(".productActualPrice").textContent=`Rs.${4*price}`;

         productClone.querySelector(".stockElement").addEventListener("click",(event)=>{
              homeQuantityToggle(event,_id,stock);
         });
         
     //     productClone.querySelector(".add-to-cart-button")
     //     .addEventListener("click",(event)=>{
     //      addToCart(event,_id,stock);
     // });
     

              productClone.querySelector(".cart").action +=`/${_id}/${price}`
          
     


     //     console.log(_id)
         const viewDtl = productClone.querySelector(".view");
         viewDtl.addEventListener("click",()=>{
          const productDetailsURL=`/prdDetails?name=${name}&description=${description}&image=${image}&stock=${stock}&price=${price}&detail=${desDtl}&brand=${brand}&_id=${_id}`
          window.open(productDetailsURL,"_blank");
         });
         productContainer.append(productClone);

     });


     let input = document.querySelector(".searchinput")

input.addEventListener("keypress",(e)=>{
     if(e.key==="Enter"){

          // console.log("Enter key pressed")
          // console.log(input.value)
          // console.log(products)

      let product = products .filter(prod => {
               return prod.name.toLowerCase().includes(input.value.toLowerCase())
          })
           if(product.length < 1){

          productContainer.innerHTML=`<h2>No Product found for <br> <strong style="color:slategray"> "${input.value}"</strong></h2>`
          }else{

           productContainer.innerHTML=``
           input.value =  ``
          
           product.forEach(prod => {
               const {_id,name,category,stock,price,description,image,desDtl,brand,user}=prod;
         const productClone=document.importNode(productTemplate.content,true);
         productClone.querySelector("#cardValue").setAttribute("id",`card${_id}`);
         productClone.querySelector(".productName").textContent=name;
         productClone.querySelector(".productImage").src += image;
         productClone.querySelector(".productImage").alt=name;
         productClone.querySelector(".userdetail").innerHTML=`<strong>Vender: </strong> ${user.username? user.username:" you"}`
         productClone.querySelector(".productDescription").textContent=description;
         productClone.querySelector(".productStock").textContent=stock;
         productClone.querySelector(".productPrice").textContent=`Rs.${price}`;
         productClone.querySelector(".category").textContent=category;
         productClone.querySelector(".productActualPrice").textContent=`Rs.${4*price}`;

         productClone.querySelector(".stockElement").addEventListener("click",(event)=>{
              homeQuantityToggle(event,_id,stock);
         });
         
     //     productClone.querySelector(".add-to-cart-button").addEventListener("click",(event)=>{
     //      addToCart(event,_id,stock);
     //     });

     productClone.querySelector(".cart").action +=`/${_id}/${price}`


         const viewDtl =productClone.querySelector(".view");
         viewDtl.addEventListener("click",()=>{
          const productDetailsURL=`/prdDetails?name=${name}&description=${description}&image=${image}&stock=${stock}&price=${price}&detail=${desDtl}&brand=${brand}&_id=${_id}`
          window.open(productDetailsURL,"_blank");
         });


         productContainer.append(productClone);

           })
     //     console.log(product)

     }
}
})

let filterContainer = document.querySelector(".filter-btn-container")
filterContainer.addEventListener("click",(e)=> {

     let valueToBeFiltered = e.target.innerText.toLowerCase() 
     if(valueToBeFiltered !== "all"){
   let filteredProducts =  products.filter(prod => {

      let productCategories = prod.category.toLowerCase()
      return productCategories.includes(valueToBeFiltered)
          
     });
     //  console.log(filteredProducts)
     productContainer.innerHTML=``;
      filteredProducts.forEach(prod => {
          
                
          const {_id,name,category,stock,price,description,image,desDtl,brand,user}=prod;
          const productClone=document.importNode(productTemplate.content,true);
          productClone.querySelector("#cardValue").setAttribute("id",`card${_id}`);
          productClone.querySelector(".productName").textContent=name;
          productClone.querySelector(".productImage").src += image;
          productClone.querySelector(".productImage").alt=name;
          productClone.querySelector(".userdetail").innerHTML=`<strong>Vender: </strong> ${user.username? user.username:" you"}`
          productClone.querySelector(".productDescription").textContent=description;
          productClone.querySelector(".productStock").textContent=stock;
          productClone.querySelector(".productPrice").textContent=`Rs.${price}`;
          productClone.querySelector(".category").textContent=category;
          productClone.querySelector(".productActualPrice").textContent=`Rs.${4*price}`;
 
          productClone.querySelector(".stockElement").addEventListener("click",(event)=>{
               homeQuantityToggle(event,_id,stock);
          });
          
          // productClone.querySelector(".add-to-cart-button").addEventListener("click",(event)=>{
          //  addToCart(event,_id,stock);
          // });
 

          productClone.querySelector(".cart").action +=`/${_id}/${price}`

          const viewDtl = productClone.querySelector(".view");
          viewDtl.addEventListener("click",()=>{
               const productDetailsURL=`/prdDetails?name=${name}&description=${description}&image=${image}&stock=${stock}&price=${price}&detail=${desDtl}&brand=${brand}&_id=${_id}`
           window.open(productDetailsURL,"_blank");
          });
 
 
          productContainer.append(productClone);
      });


     }else if(valueToBeFiltered ==="all") {
          // console.log("in else lader", valueToBeFiltered)
          console.log(products)
          productContainer.innerHTML=``;

          products.forEach(prod => {
                     
               const {_id,name,category,stock,price,description,image,desDtl,brand,user}=prod;
               const productClone=document.importNode(productTemplate.content,true);
               productClone.querySelector("#cardValue").setAttribute("id",`card${_id}`);
               productClone.querySelector(".productName").textContent=name;
               productClone.querySelector(".productImage").src += image;
               productClone.querySelector(".productImage").alt=name;
               productClone.querySelector(".userdetail").innerHTML=`<strong>Vender: </strong> ${user.username? user.username:" you"}`
               productClone.querySelector(".productDescription").textContent=description;
               productClone.querySelector(".productStock").textContent=stock;
               productClone.querySelector(".productPrice").textContent=`Rs.${price}`;
               productClone.querySelector(".category").textContent=category;
               productClone.querySelector(".productActualPrice").textContent=`Rs.${4*price}`;
      
               productClone.querySelector(".stockElement").addEventListener("click",(event)=>{
                    homeQuantityToggle(event,_id,stock);
               });
               
               // productClone.querySelector(".add-to-cart-button").addEventListener("click",(event)=>{
               //  addToCart(event,_id,stock);
               // });
              productClone.querySelector(".cart").action +=`/${_id}/${price}`

      
               const viewDtl = productClone.querySelector(".view");
               viewDtl.addEventListener("click",()=>{
                    const productDetailsURL=`/prdDetails?name=${name}&description=${description}&image=${image}&stock=${stock}&price=${price}&detail=${desDtl}&brand=${brand}&_id=${_id}`
                window.open(productDetailsURL,"_blank");
               });
      
      
               productContainer.append(productClone);
           });
           
     }

})



};

