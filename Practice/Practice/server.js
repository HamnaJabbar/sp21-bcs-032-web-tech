
let express = require("express");
let cookieParser = require("cookie-parser");
var session = require("express-session");
var expressLayouts = require("express-ejs-layouts");
const multer = require("multer");
const path = require("path");

let app = express();
app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));
app.use(require("./middlewares/common"));
app.use('/public', express.static(path.join(__dirname, 'public'))); //static middleware to serve public


const maintenance = require("./middlewares/maintenance");
const logger = require("./middlewares/logger");
const sessionauth = require("./middlewares/sessionauth");
const admin = require("./middlewares/admin");
const Product = require('./models/ProductModel'); 
const about = require('./models/about')
// app.use(logger);
// app.use((req,res,next)=>{
//   res.locals.user=null;
//   next();
// })


// Your route or middleware for user registration
// app.post('/register', (req, res) => {
//   // Process user registration

//   // Set a flash message for successful registration
//   req.session.flash = {
//     type: 'success',
//     message: 'User registered successfully!',
//   };

//   // Redirect to a different page or render a template
//   res.redirect('/login');
// });


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer instance
const upload = multer({ storage: storage });

// app.use(logger);
// app.use((req, res, next) => {
//   res.locals.user = null;
//   next();
// });
app.get('/addToCart', (req, res) => {
  req.session.flash = {
        type: 'success',
        message: 'Item added to cart',
      };
  res.redirect('/products'); 
});

app.get("/checkout", function (req, res, next) {
  res.render("checkout");
  next();
});


let booksApiRouter = require("./routes/api/books");

app.use(booksApiRouter);
app.use("/admin", sessionauth, admin, require("./routes/admin/books"));

app.use("/", require("./routes/site/auth"));
app.use("/", require("./routes/site/books"));

app.get("/", async function (req, res) {
  // let flash = req.session.flash;
  // req.session.flash = null;
  let Book = require("./models/book");
  let books = await Book.find();
  res.render("landing-page", { books });
});

const drinksApiRouter = require("./routes/api/drinks");
app.use(drinksApiRouter);
app.use("/", require("./routes/site/drinks"));

const employeeApiRouter = require("./routes/api/employees");
app.use(employeeApiRouter);
app.use("/", require("./routes/site/employees"));




const mongoose = require("mongoose");
const { cookie } = require("express/lib/response");
mongoose
  .connect("mongodb://localhost/Elegance", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));
app.listen(3000, function () {
  console.log("Server started at localhost:3000");
});






