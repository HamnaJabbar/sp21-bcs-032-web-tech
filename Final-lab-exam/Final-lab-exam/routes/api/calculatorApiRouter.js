// routes/api/calculatorApiRouter.js

const express = require("express");
const router = express.Router();

router.post("/calculate", (req, res) => {
  try {
    const { operand1, operand2, operation } = req.body;

    // Validate inputs (you can add more validation as needed)

    // Perform the specified operation
    let result;
    switch (operation) {
      case "+":
        result = parseFloat(operand1) + parseFloat(operand2);
        break;
      case "-":
        result = parseFloat(operand1) - parseFloat(operand2);
        break;
      default:
        throw new Error("Invalid operation");
    }

    // Store calculation history in session
    req.session.calculatorHistory = req.session.calculatorHistory || [];
    req.session.calculatorHistory.push({
      operand1,
      operand2,
      operation,
      result,
    });

    // Set a flash message for success
    req.session.flash = {
      type: "success",
      message: "Calculation successful",
    };

    // Redirect back to the form
    res.redirect("/calculator");
  } catch (error) {
    console.error("Error performing calculation:", error.message);

    // Set a flash message for error
    req.session.flash = {
      type: "danger",
      message: `Error: ${error.message}`,
    };

    // Redirect back to the form
    res.redirect("/calculator");
  }
});

module.exports = router;
