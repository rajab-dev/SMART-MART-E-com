import express, { json } from "express";
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
import userModel from "./users.model.js";
import productsModel from "./products.model.js";
import ordersModel from "./orders.model.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import upload from "./multer.js";
import session from "express-session";
import cartModel from "./cart.model.js";
import messageModel from "./message.model.js";
import bodyParser from 'body-parser';
// const stripe = require("stripe")("sk_test_51PCIkW01lbsQApCbHcOiNf9UbDLoXm05bQws3qpyWcptCwpV9ALbMDkyNqlXBRhsW5AvRHGd2ykG6jdMm3jGNnHj008GS1Xeu4")
import stripePackage from 'stripe';

const stripe = stripePackage("sk_test_51PCIkW01lbsQApCbHcOiNf9UbDLoXm05bQws3qpyWcptCwpV9ALbMDkyNqlXBRhsW5AvRHGd2ykG6jdMm3jGNnHj008GS1Xeu4");

app.use(bodyParser.json());

app.use(cookieParser());
// app.use(express.static("/stylesheets" + '/public'));
app.use(express.static("./public"));




app.get("/", async function (req, res) {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(
      token,
      "helliholgifyhcfcvbkj.kllm/n.kf,ufvbkjklknbkvldfgh.jooo"
    );
    const user = await userModel.findById({ _id: decoded._id });
    // console.log(user);
    const { username } = user;

    res.render("index", { user, username });
  }
  //   const {username,password,fullname} = req.user
  // res.render("index",{username,password,fullname});
  res.render("index");
});

// logic route

async function isAuthenticated(req, res, next) {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(
      token,
      "helliholgifyhcfcvbkj.kllm/n.kf,ufvbkjklknbkvldfgh.jooo"
    );
    req.user = await userModel.findById({ _id: decoded._id });
    next();
  } else {
    // res.redirect("/login");
    res.render("login",{errors:"login first to continue"})
  }
}

app.post("/register", async function (req, res) {
  try {
    let user = await userModel.findOne({ username: req.body.username });
    if (user) {
      // res.redirect("/login");
      res.render("register",{error:"user already exists"})
    } else {
      const { username, password, fullname } = req.body;
      const hashedpass = await bcrypt.hash(password, 10);
      user = await userModel.create({
        username,
        password: hashedpass,
        fullname,
      });
      const encryptedid = jwt.sign(
        { _id: user._id },
        "helliholgifyhcfcvbkj.kllm/n.kf,ufvbkjklknbkvldfgh.jooo"
      );
      res.cookie("token", encryptedid, { httpOnly: true });
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async function (req, res) {
  try {
    let user = await userModel.findOne({ username: req.body.username });
    // const decoded =  await bcrypt.compare(req.body.password,user.password)
    // console.log(decoded)

    if (!user) {
      // res.redirect("/register");
      res.render("login",{error:"user doesnot exists"})
    } else if (
      user &&
      (await bcrypt.compare(req.body.password, user.password))
    ) {
      // encrypt user ID
      const encryptedid = jwt.sign(
        { _id: user._id },
        "helliholgifyhcfcvbkj.kllm/n.kf,ufvbkjklknbkvldfgh.jooo"
      );
      // create cookie
      res.cookie("token", encryptedid, {
        httpOnly: true,
      });
      res.redirect("/");
    } else {
      // res.redirect("/login");
      res.render("login",{error:"wrong password"})
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/admin-panel", isAuthenticated, async function (req, res) {
  const { username, fullname } = req.user;
  if (username === "admin") {
    const user = await userModel.findOne({ username }).populate("products");
    const orders = await ordersModel.find({ user: user._id });
    const receivedOrders = user.receivedOrder;
    // const receivedOrderIds = receivedOrders.map(order => order._id)
    // const receivefindinmodel = await ordersModel.find({ id: {$in: receivedOrderIds}})

    const orderPrdIds = orders.map((order) => order.product);

    const receivedOrder = await ordersModel
      .find({ _id: receivedOrders })
      .populate("product");
    // const receivedOrderIds = orders.map(order => order.receivedOrder)
    const orderedProducts = await productsModel
      .find({ _id: { $in: orderPrdIds } })
      .populate("user");
    // console.log(receivedOrder);
    // const receivedOrder = await ordersModel.find({ _id: {$in: receivedOrderIds } } )
    // console.log(user.receivedOrder)

    const messages = await messageModel.find({})
    // console.log(messages) 

    res.render("Admin", { username, user, messages, orderedProducts, receivedOrder });
  } else {
    res.render("404page");
  }
});

 app.get("/my-orders",isAuthenticated,async function(req,res){
      const {username} = req.user;
      const user = await userModel.findOne({username});
      const orders = await ordersModel.find({user:user._id});
      const orderPrdIds = orders.map((order) => order.product);
      console.log(orderPrdIds)
      const orderedProducts = await productsModel
      .find({ _id: { $in: orderPrdIds } })
      .populate("user");
      res.render("myorders",{orderedProducts,username,orders});
      // res.json(orders)
 })

 app.get("/users",isAuthenticated,async function(req,res){
    const {username} = req.user;
      const user = await userModel.findOne({username})
      const cart = user.cart
      res.json({cart})
 })

app.post(
  "/admin-panel",
  isAuthenticated,
  upload.single("file"),
  async function (req, res) {
    const { name, price, stock, description, image, category, brand, desDtl } =
      req.body;
    //  console.log(name,price,stock,description,category,brand)
    // console.log(req.file.filename)

    const { username } = req.user;
    const user = await userModel.findOne({ username }).populate("products");
    const product = await productsModel.create({
      user: user._id,
      name,
      price,
      stock,
      description,
      category,
      brand,
      desDtl,
      image: req.file.filename,
    });
    user.products.push(product._id);
    await user.save();
    await product.save();
    res.redirect("/admin-panel");
  }
);

app.get("/api", isAuthenticated, async function (req, res) {
  const { username } = req.user;
  const user = await userModel.findOne({ username }).populate("products");
  res.json(user);

  // res.render("landing")
});

app.get("/allprd", async function (req, res) {
  const products = await productsModel.find({}).populate("user");
  res.json(products);
});

app.get("/all-products", function (req, res) {
  res.render("AllProducts");
});

app.get("/landing", isAuthenticated, async function (req, res) {
  res.render("landing");
});

app.get("/addToCart", isAuthenticated, async function (req, res) {
  const {username} = req.user;
  res.render("addToCart", { username, });
});

app.get("/addToCartApi",isAuthenticated,async function(req,res){
  const {username} = req.user;
  const user = await userModel.findOne({username});
  const cartProducts = await cartModel.find({user:user._id}).populate("product");
  const products = cartProducts.map(prod => {
    return prod.product
  })
  res.json({products});
  
})

app.get("/prdDetails", isAuthenticated, function (req, res) {
  const { username } = req.user;
  res.render("prdDetails", { username });
});

app.get("/logout", function (req, res) {
  const { token } = req.cookies;
  if (token) {
    res.render("logout");
  } else {
    res.redirect("/");
  }
});
app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/logout", function (req, res) {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/login");
});

app.get("/about", isAuthenticated,async function (req, res) {
  const {username} = req.user
  res.render("about",{username});
});

app.post("/logic", async function (req, res) {
  try {
    await userModel.create({
      username: req.body.name,
      password: req.body.password,
    });
    res.redirect("/show");
  } catch (error) {
    res.send(`error: ${error}`);
  }
});

app.get("/products-addtocart", isAuthenticated, async function (req, res) {
  const { username } = req.user;
  res.render("allProductsAddToCart", { username });
});

app.get("/contact-us", isAuthenticated, function (req, res) {
  const {username} = req.user;
  res.render("contact",{username});
});

app.get("/add-to-cart/:id/:price",isAuthenticated, async function (req, res) {
  const id = req.params.id;

       const {username} = req.user;

       const user = await userModel.findOne({username}).populate("cart");

       const cartprd = user.cart.map(cart =>{
          return cart.product?.toString()
       })
        console.log(cartprd)

       if(cartprd.includes(id)){
            res.redirect("/")

       }else{

       const cart = await cartModel.create({
        user:user._id,
        product:id,
       })

       user.cart.push(cart._id);

       await user.save();
       await cart.save();

    res.redirect("/");
      }
  });

  app.get("/addToCartCards",isAuthenticated, async function(req,res){
        const {username} = req.user;
        const user = await userModel.findOne({username});
        const cartProducts = await cartModel.find({user:user._id}).populate("product")
        res.json({cartProducts})

  })

  app.get("/order-success",isAuthenticated, async function(req,res){
       const {username} = req.user;
       res.render('orderSuccess',{username})
  })

app.post("/api/create-checkout-session", isAuthenticated, async function(req,res){
  const products = req.body.product;
  // console.log(products);
  const lineItems = products.map((product) => ({
      price_data:{
        currency:"pkr",
        product_data:{
          name:product.name
        },
        unit_amount:product.price*100,
      },
      // adjustable_quantity: {
      //   enabled: true,
      //   minimum: 1,
      //   maximum: 1,
      // },
      quantity: 1,
  }));
   const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:"http://localhost:3000/order-success",
      cancel_url:"http://localhost:3000/"
   }) 
   const { _id } = req.user;
   const user = await userModel.findOne({ _id:_id })
   console.log(user.cart)
   
   const userCart = await cartModel.deleteMany({user:_id})
   console.log(userCart);
   res.json({id:session.id})
 
  
});

  app.get("/removeFromCart/:id", isAuthenticated, async function(req,res){
       const prdId = req.params.id;
       console.log(prdId)
       const {username} = req.user;
       const user = await userModel.findOne({username}).populate("cart");
       let cart = await cartModel.find({user:user._id});
  
        // let index = user.cart.indexOf(prdId)
        cart =  cart.map(async prod => {
        //  return  
         cart = await cartModel.findOneAndDelete({product:prdId})
       });
       

      let userCartProduct = user.cart.map(cart =>{
        return cart.product.toString()
      })
      // console.log(userCartProduct)
      let index = userCartProduct.indexOf(prdId)
      user.cart.splice(index,1)
       await user.save();
       res.redirect("/addToCart")
      
  });

  app.post("/message",isAuthenticated, async function(req,res){
       const {username} = req.user;
       const user = await userModel.findOne({username}) 
       const {name,email,message} = req.body;
      //  console.log(name,email,message)
      const messages = await messageModel.create({user:user._id, name,email,message});
       user.message.push(messages._id)
       await user.save();
       await messages.save();
       res.render("messageSuccess",{username});
  });

app.post("/order/:id", isAuthenticated, async function (req, res) {
  const { username } = req.user;
  const senderUser = await userModel.findOne({ username }).populate("cart");
  const productid = req.params.id;
  const product = await productsModel
    .findOne({ _id: productid })
    .populate("user")
  const orderReceiverid = await product.user._id;
  const orderReceiver = await userModel.findOne({ _id: orderReceiverid });
  // console.log(orderReceiver.receivedOrder)
  const { name, email, phone, address, city, zip } = req.body;
  // console.log(loggeduserid,name,email,phone,address,city,zip)
  const neworder = await ordersModel.create({
    name,
    email,
    phone,
    address,
    city,
    zip,
    user: senderUser._id,
    product: productid,
  });

  senderUser.orders.push(neworder._id);
  orderReceiver.receivedOrder.push(neworder._id);
  await orderReceiver.save();
  await neworder.save();

  let cart = await cartModel.find({user:senderUser._id});
  
  // let index = user.cart.indexOf(prdId)
  cart =  cart.map(async prod => {
  //  return  
   cart = await cartModel.findOneAndDelete({product:productid})
 });
console.log(senderUser)
let userCartProduct = senderUser.cart.map(cart =>{
  return cart.product.toString()
})
console.log(userCartProduct)
let index = userCartProduct.indexOf(productid)
senderUser.cart.splice(index,1)
await senderUser.save();
  res.render("orderSuccess",{username});
});




app.get("/order/:id", isAuthenticated, function (req, res) {
  const productid = req.params.id;
  res.render("orders", { productid });
});

app.get("/delete-prod/:id", isAuthenticated, async function (req, res) {
  const id = req.params.id;
  const product = await productsModel.findOneAndDelete({ _id: id });
  const { username } = req.user;
  const user = await userModel.findOne({ username });
  let indexOfPrd = user.products.indexOf(id);
  //  console.log(indexOfPrd)
  user.products.splice(indexOfPrd, 1);
  await user.save();
  res.redirect("/admin-panel");
});

app.get("/show", async function (req, res) {
  try {
    const users = {};
    const user = await userModel.find(users);

    res.render("show", { user });
  } catch (error) {
    res.send("not working");
  }
});

app.listen(port, function () {
  console.log("server listening on port ", port);
});
