const express = require("express");
let router = express.Router();
let User = require("../../models/user");
const Checkout = require('../../models/checkout'); 
const Product = require('../../models/ProductModel');
const about = require('../../models/about');
router.get("/register", (req, res) => {
  //   return res.send(req.query);
  res.render("auth/register");
});
router.get("/login", (req, res) => {
  //   return res.send(req.query);
  // req.session.flash = { type: "success", message: "whoala" };
  res.render("auth/login");
});
router.get("/logout", (req, res) => {
  //   return res.send(req.query);
  req.session.user = null;
  req.session.flash = { type: "info", message: "Logged Out" };
  res.redirect("/login");
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return res.redirect("/register");
  const bcrypt = require("bcryptjs");
  console.log(req.body);
  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    req.session.user = user;
    req.session.flash = { type: "success", message: "Logged in Successfully" };
    return res.redirect("/");
  } else {
    req.session.flash = { type: "danger", message: "Try Again" };

    return res.redirect("/login");
  }
});

router.post("/register", async (req, res) => {
  let user = new User(req.body);
  const bcrypt = require("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  return res.redirect("/");
});

router.get("/products", async function (req, res) {
  try {
    const products = await Product.find();
    res.render("products/list", {
      products: products,
    });
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get("/aboutus", async function (req, res) {
  try {
    // Query the AboutUs data from MongoDB using the AboutUs model
    const aboutUs = await about.findOne();

    // Render the 'aboutUs' view with the retrieved data
    res.render("aboutUs", {
      aboutUs: aboutUs,
    });
  } catch (error) {
    console.error('Error fetching About Us data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});



router.post("/submitCheckout", async (req, res) => {
  try {
    const newCheckout = new Checkout(req.body);
    await newCheckout.save();
    req.session.flash = { type: "info", message: "Thankyou for trusting Elegance.We delight to serve you.Happy shopping! 🛍️ " };
    return res.redirect("/");
  } catch (error) {
    console.error('Error saving checkout data to MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;

