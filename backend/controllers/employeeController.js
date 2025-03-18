const Employee = require('../models/Employee');
//read task function
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ userId: req.user.id });
        res.json(employees);
    } catch (error) {
    }
};

//add task function
const addEmployee = async (req, res) => {
    
    const { title, fname, lname, email, role, department, description  } = req.body;
    try {
        const employee = await Employee.create({ userId: req.user.id, title, fname, lname,  email, role, department,
        description  });
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//update task
const updateEmployee = async (req, res) => {
    const { title, fname, lname, email, role, department, description } = req.body;
    try {
        const employee = await Employee.findById(req.params.id);
            if (!employee) return res.status(404).json({ message: 'Employee not found' });
            employee.title = title || employee.title;
            employee.fname = fname || employee.fname;
            employee.lname = lname || employee.lname;
            employee.email = email || employee.email;
            employee.role = role || employee.role;
            employee.department = department || employee.department;
            employee.description = description || employee.description;
            const updatedEmployee = await employee.save();
            res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete task
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        await employee.remove();
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { getEmployees, addEmployee, updateEmployee, deleteEmployee };