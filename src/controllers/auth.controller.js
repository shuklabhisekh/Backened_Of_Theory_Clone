require("dotenv").config();

const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const newToken = (user) => {
  // console.log(process.env);
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

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

const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let newErrors;
      newErrors = errors.array().map((err) => {
        console.log("err", err);

        //   let status = "notok"
        return { key: err.param, message: err.msg };
      });
      return res.status(400).send({ errors: newErrors });
    }

    let user = await User.findOne({ email: req.body.email }).lean().exec();

    if (user) {
      return res.status(500).send({ message: "Email Already Exist" });
    }

    user = await User.create(req.body);

    const token = newToken(user);

    let status = "ok";

    //GENRATE RANDOM NUMBER
    let otp = "";
    for (var i = 0; i < 4; i++) {
      otp += (Math.floor(Math.random() * (10 - 0)) + 0).toString();
    }
    //SEND MAIL
    const accessToken = await oAuth2Client.getAccessToken();

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

    const mailOptions = {
      from: "vds9828#gmail.com>",
      to: `${user.email}`,
      subject: "Email Verification",
      // html: `<h3>Hello ${user.first_name},</h3><p>Thank you for choosing our Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p><p>OTP is <span style="background:blue;color:#fff">${otp}</span></p><p>Regards,</p>
      // <p>Theory clone</p>`,
      html: `<center>
      <table
        style="
          background: #ffffff;
          width: 600px;
          color: black;
          text-align: center;
        "
      >
        <tbody>
          <tr>
            <td>
              <span
                style="
                  display: block;
                  background: black;
                  color: white;
                  padding: 6px 0;
                  font-size: 16px;
                "
                >Complimentary shipping and returns on all U.S. orders</span
              >
              <h1 style="text-align: center">
                <a
                  style="border-style: none"
                  border="0"
                  href="https://www.theory.com/"
                  target="_blank"
                  data-saferedirecturl="https://www.google.com/url?q=https://www.theory.com/&amp;source=gmail&amp;ust=1645731568506000&amp;usg=AOvVaw05si0ogvw6jr0Clxmbk1Pa"
                >
                  <img
                    src="https://ci6.googleusercontent.com/proxy/UsnMD8e379OkOrfUa_4RnYQs_FxG9Mz6_ZR4M2YWdd0aoGWicdkA23sjiB8cKvMJJsBaGleEJ2jDcoBoIs7w4zS-JXWXQjyLEplZdYZCeOiNLTckI57xFVRv-tVVr47rt5yMx1IQ6qQ3kPVEgsAoYrd-p2_ppkc0qA=s0-d-e1-ft#https://www.theory.com/on/demandware.static/Sites-theory2_US-Site/-/default/dw7a395350/images/logo.jpg"
                    alt="Theory"
                    class="CToWUd"
                  />
                </a>
              </h1>
              <h1 class="m_-7373064222375084159greeting">
                Hello,&nbsp; ${user.first_name}
              </h1>
              <p>
                Your Newly registerted account <strong>OTP PIN</strong>: ${otp}.
              </p>
              <p>This otp is valid only for 30 Minutes.</p>
              <p>
                For questions, please visit our
                <a
                  href="https://www.theory.com/on/demandware.store/Sites-theory2_US-Site/default/Page-Show?cid=frequently-asked-questions"
                  target="_blank"
                  data-saferedirecturl="https://www.google.com/url?q=https://www.theory.com/on/demandware.store/Sites-theory2_US-Site/default/Page-Show?cid%3Dfrequently-asked-questions&amp;source=gmail&amp;ust=1645731568507000&amp;usg=AOvVaw0L6DAwBB0jj9qBmAg9VJ6g"
                  >FAQ page</a
                >
                or contact us at
                <a href="mailto:clientservice@theory.com" target="_blank"
                  >vds9828@gmail.com</a
                >.
              </p>
              <p>Sincerely,<br />The Theory Team</p>
            </td>
          </tr>
        </tbody>
      </table>
    </center>`,
    };

    const result = await transport.sendMail(mailOptions);
    console.log(result);
    if (result) {
      console.log("email sent..");
    } else {
      console.log("email not send..");
    }

    res.send({ user, token, status, otp });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const match = user.checkpassword(req.body.password);

    if (!match) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = newToken(user);

    let status = "ok";

    res.send({ user, token, status });
  } catch (e) {
    return res.status.send(e.message);
  }
};

module.exports = { register, login };
