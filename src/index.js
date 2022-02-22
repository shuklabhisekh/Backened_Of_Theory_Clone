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
app.get("/", async (req, res) => {
  return res.render("ejs/home");
});

//-------------------------------------------
//ACCESORIES PAGE
app.get("/accesories", async (req, res) => {
  return res.render("ejs/accesories");
});

//ACCESORIES PRODUCT PAGE
app.get("/accessoriesProducts", async (req, res) => {
  return res.render("ejs/accessoriesProducts");
});

//--------------------------------------------
//WOMENPAGE PAGE
app.get("/womenpage", async (req, res) => {
  return res.render("ejs/womenpage");
});

//----------------------------------------------------
//MEN PAGE
app.get("/manpage", async (req, res) => {
  return res.render("ejs/manPagr");
});

//----------------------------------------------------
//ABOUT PAGE
app.get("/about", async (req, res) => {
  return res.render("ejs/about");
});

//------------------------------------------------------
//ADD CART PAGE
app.get("/cart", async (req, res) => {
  return res.render("ejs/AddCart");
});

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

const start = async (req, res) => {
  await connect();
  app.listen(5000, () => {
    console.log("port..");
  });
};

start();
