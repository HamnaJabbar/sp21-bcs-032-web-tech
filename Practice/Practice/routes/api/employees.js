// routes/api/employee.js
const express = require("express");
const router = express.Router();
const Employee = require("../../models/employee");

// Get all employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a specific employee by ID
router.get("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new employee
router.post("/employees", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    console.error('Error saving employee to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an existing employee by ID
router.put("/employees/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee in MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an employee by ID
router.delete("/employees/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(deletedEmployee);
  } catch (error) {
    console.error('Error deleting employee from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
