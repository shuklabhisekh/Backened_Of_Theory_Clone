const express = require("express");
const app = express();
const path = require("path");

const { body, validationResult } = require("express-validator");
const { register, login } = require("./controllers/auth.controller");
const cors = require("cors");
const connect = require("./config/db");

const checksum_lib = require("../paytm/checksum");
const config = require("../paytm/config");
app.use(express.json());
app.use(cors());
//CONNECT WITH STATIC FOLDERS
app.use(express.static(__dirname + "/public"));

//CONNECT WITH EJS
app.set("views", path.join(__dirname, "views/"));
app.set("view engine", "ejs");

//LOGIN AND RESIGITER
app.post(
  "/register",

  body("first_name")
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("First name should be 3 to 20 characters long"),

  body("last_name")
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage("Last name should be 3 to 20 characters long"),
  body("email").isEmail().withMessage("Please enter a valid E-Mail address"),

  body("password")
    .isLength({ min: 8, max: 20 })
    .custom((value) => {
      let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (pattern.test(value)) {
        return true;
      }
      throw new Error(
        "Your password must contain at least 8 characters, one uppercase letter, one number, and one special character."
      );
    }),

  register
);

app.post("/login", login);

const signController = require("./controllers/sign.controller");
app.use("/users", signController);

const adminController = require("./controllers/admin.controller");
app.use("/admin", adminController);

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

//--------------------------------------------------------
//LOGIN PAGE CONTROLLER
const userController = require("./controllers/user.controller");
app.use("/login", userController);

//OPT CONTROLLER
const optController = require("./controllers/otp.controller");
app.use("/otp", optController);

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
const detailController = require("./controllers/productdetail.controller");
app.use("/productdetails", detailController);

//PRODUCT CONTROLLERS
const productController = require("./controllers/products.controller");
app.use("/products", productController);

//BAG CONTROLLERS
const bagController = require("./controllers/bag.controller");
app.use("/cart", bagController);

//USER BAG CONTROLLER
const userbagController = require("./controllers/userbag.controller");
app.use("/userbag", userbagController);
//CHECKOUT
const checkController = require("./controllers/checkout.controller");
app.use("/checkout", checkController);

//PAYTM GETWAY
const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });
app.post("/paynow", [parseUrl, parseJson], (req, res) => {
  // Route for making payment
  // var addr = req.body.address;
  var paymentDetails = {
    amount: req.body.amount,
    customerId: req.body.name,
    customerEmail: req.body.email,
    customerPhone: req.body.phone,
    customerAddress: req.body.address,
  };
  getItem(paymentDetails);
  if (
    !paymentDetails.amount ||
    !paymentDetails.customerId ||
    !paymentDetails.customerEmail ||
    !paymentDetails.customerPhone
  ) {
    res.status(400).send("Payment failed");
  } else {
    var params = {};
    params["MID"] = config.PaytmConfig.mid;
    params["WEBSITE"] = config.PaytmConfig.website;
    params["CHANNEL_ID"] = "WEB";
    params["INDUSTRY_TYPE_ID"] = "Retail";
    params["ORDER_ID"] = "TEST_" + new Date().getTime();
    params["CUST_ID"] = paymentDetails.customerId;
    params["TXN_AMOUNT"] = paymentDetails.amount;
    params["CALLBACK_URL"] = "http://localhost:5000/review";
    params["EMAIL"] = paymentDetails.customerEmail;
    params["MOBILE_NO"] = paymentDetails.customerPhone;

    checksum_lib.genchecksum(
      params,
      config.PaytmConfig.key,
      function (err, checksum) {
        var txn_url =
          "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
        // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

        var form_fields = "";
        for (var x in params) {
          form_fields +=
            "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
        }
        form_fields +=
          "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(
          '<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' +
            txn_url +
            '" name="f1">' +
            form_fields +
            '</form><script type="text/javascript">document.f1.submit();</script></body></html>'
        );
        res.end();
      }
    );
  }
});

function getItem(data) {
  return data;
}

const reviewController = require("./controllers/review.controller");
app.use("/review", reviewController);

const start = async (req, res) => {
  await connect();
  app.listen(5000, () => {
    console.log("port..");
  });
};

start();
