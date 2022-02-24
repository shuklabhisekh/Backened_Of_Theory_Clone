const express = require("express");
const app = express();
const path = require("path");

const connect = require("./config/db");
app.use(express.json());

//CONNECT WITH STATIC FOLDERS
app.use(express.static(__dirname + "/public"));

//CONNECT WITH EJS
app.set("views", path.join(__dirname, "views/"));
app.set("view engine", "ejs");

//HOME PAGE
const homeController = require("./controllers/home.controller");
app.use("/", homeController);

//-------------------------------------------
//ACCESORIES PAGE
const accesoriesController = require("./controllers/accessories.controller");
app.use("/accesories", accesoriesController);

//--------------------------------------------
//WOMENPAGE PAGE
const womenpageController = require("./controllers/womenpage.controller");
app.use("/womenpage", womenpageController);

//----------------------------------------------------
//MEN PAGE
const menpageController = require("./controllers/menpage.controller");
app.use("/menpage", menpageController);

//----------------------------------------------------
//ABOUT PAGE
const aboutController = require("./controllers/about.controller");
app.use("/about", aboutController);

//------------------------------------------------------
//ADD CART PAGE
// app.get("/cart", async (req, res) => {
//   return res.render("ejs/AddCart");
// });

//--------------------------------------------------------
//LOGIN PAGE
app.get("/login", async (req, res) => {
  return res.render("ejs/signup");
});

//WOMEN PRODUCT CONTROLLER
const womenproductController = require("./controllers/Womenproducts.controller");
app.use("/womenproducts", womenproductController);

//MEN PRODUCT CONTROLLER
const menproductController = require("./controllers/Menproducts.controller");
app.use("/menproducts", menproductController);

//ACCESSORIES PRODUCT CONTROLLER
const accessoriesController = require("./controllers/accessoriesproducts.controller");
app.use("/accessoriesProducts", accessoriesController);

//SEARCH PRODUCT CONTROLLERS
const searchProdductController = require("./controllers/searchResult.controller");
app.use("/searchresult", searchProdductController);

//PRODUCT DETAILS CONTROLLERS
const detailController = require("./controllers/products.controller");
app.use("/productdetails", detailController);

//BAG CONTROLLERS
const bagController = require("./controllers/bag.controller");
app.use("/cart", bagController);

const start = async (req, res) => {
  await connect();
  app.listen(5000, () => {
    console.log("port..");
  });
};

start();
