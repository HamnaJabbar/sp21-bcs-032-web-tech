const express = require("express");
const router = express.Router();
const Employee = require("../../models/employee"); 

router.get("/employees", async function (req, res) {
  try {
    
    const employee = await Employee.find();

    res.render("employeeList", { drinks });
  } catch (error) {
    console.error('Error fetching drinks from the database:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
