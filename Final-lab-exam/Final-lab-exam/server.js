
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



app.get("/calculator", (req, res) => {
  const calculatorData = req.session.calculatorData || null;
  const results = req.session.results || []; // Add this line to initialize results

  res.render("calculator", { calculatorData, results });
});

app.post('/calculate', (req, res) => {
  const { operand1, operation, operand2 } = req.body;
  let result;

  if (operation === '+') {
    result = Number(operand1) + Number(operand2);
  } else if (operation === '-') {
    result = Number(operand1) - Number(operand2);
  }
  else if (operation === '*') {
    result = Number(operand1) * Number(operand2);
  } else if (operation === '/') {
  
    if (Number(operand2) !== 0) {
      result = Number(operand1) / Number(operand2);
    } else {

      result = 'Error: Division by zero';
    }
  } else {result = 'Error: Unknown operation';
}

  const calculation = { operand1, operation, operand2, result };
  
  req.session.calculatorData = calculation;

  req.session.results = [...(req.session.results || []), calculation];

  res.redirect('/calculator');
});






const mongoose = require("mongoose");
const { cookie } = require("express/lib/response");
mongoose
  .connect("mongodb://localhost/Elegance", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));
app.listen(3000, function () {
  console.log("Server started at localhost:3000");
});


