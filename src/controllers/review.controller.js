const express = require("express");
const https = require("https");
const qs = require("querystring");
const checksum_lib = require("../../paytm/checksum");
const config = require("../../paytm/config");
const router = express.Router();
var fs = require("fs");
var ejs = require("ejs");
const Bag = require("../models/bag.model");
//OTP CONGIFFF
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// These id's and secrets should come from .env file.
const CLIENT_ID =
  "1072830461860-nklj7g00qksjp3v1uht5r28fdklcbkin.apps.googleusercontent.com";
const CLEINT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04pPVx5WeVdOTCgYIARAAGAQSNwF-L9Ired3RdIKLq8Lni9x3AOfez8HtZBpbeXF8UH4TEpYhhjzR5tzP9XNvP_QkIR4PMjPqjZw";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

router.get("/", async (req, res) => {
  try {
    const bags = await Bag.find().populate("productId").lean().exec();
    return res.render("ejs/review", { bags });
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  // Route for verifiying payment
  // console.log("req body", req.body);
  let email = req.query.email;
  const bags = await Bag.find().populate("productId").lean().exec();
  var sum = 0;
  bags.map((bag) => {
    sum += +bag.productId.price.slice(1).replace(",", "") * bag.quantity;
  });
  var body = "";

  req.on("data", function (data) {
    body += data;
  });

  req.on("end", function () {
    var html = "";
    var post_data = qs.parse(body);

    // received params in callback
    console.log("Callback Response: ", post_data, "\n");

    // verify the checksum
    var checksumhash = post_data.CHECKSUMHASH;
    // delete post_data.CHECKSUMHASH;
    var result = checksum_lib.verifychecksum(
      post_data,
      config.PaytmConfig.key,
      checksumhash
    );
    console.log("Checksum Result => ", result, "\n");

    // Send Server-to-Server request to verify Order Status
    var params = { MID: config.PaytmConfig.mid, ORDERID: post_data.ORDERID };
    checksum_lib.genchecksum(
      params,
      config.PaytmConfig.key,
      function (err, checksum) {
        params.CHECKSUMHASH = checksum;
        post_data = "JsonData=" + JSON.stringify(params);

        var options = {
          hostname: "securegw-stage.paytm.in", // for staging
          // hostname: 'securegw.paytm.in', // for production
          port: 443,
          path: "/merchant-status/getTxnStatus",
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": post_data.length,
          },
        };

        // Set up the request
        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            console.log("S2S Response: ", response, "\n");

            var _result = JSON.parse(response);
            if (_result.STATUS == "TXN_SUCCESS") {
              //send mail
              sendmail(_result, email);
              return res.render("ejs/review", { bags, sum, _result });
            } else {
              res.send("payment failed");
            }
          });
        });

        // post the data
        post_req.write(post_data);
        post_req.end();
      }
    );
  });
});

async function sendmail(_result, email) {
  const accessToken = await oAuth2Client.getAccessToken();
  const bags = await Bag.find().populate("productId").lean().exec();
  var sum = 0;
  bags.map((bag) => {
    sum += +bag.productId.price.slice(1).replace(",", "") * bag.quantity;
  });
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "vds9828@gmail.com",
      clientId: CLIENT_ID,
      clientSecret: CLEINT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const data = await ejs.renderFile("./src/views/ejs/mail.ejs", {
    bags,
    sum,
    _result,
  });

  const mailOptions = {
    from: "vds9828@gmail.com>",
    to: `${email}`,
    subject: "order placed",
    html: data,
  };

  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
}

module.exports = router;
