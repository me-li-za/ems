
const chai = require('chai');
const chaiHttp = require('chai-http');
const http = require('http');
const app = require('../server'); 
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const sinon = require('sinon');
const Employee = require('../models/Employee');
const { addEmployee, updateEmployee, getEmployees, deleteEmployee } = require('../controllers/employeeController');
const { expect } = chai;

chai.use(chaiHttp);
let server;
let port;


describe('AddEmployee Function Test', () => {

  it('should create a new employee successfully', async () => {
    // Mock request data
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { title: "Mr", fname: "Adam", lname: "Smith" , email: "testsample@mail.com", role: "Assistant Manager", salary: "10500", department: "Customer Support", description:"assistant manager of customer support" }
    };

    // Mock employee that would be created
    const createdEmployee= { _id: new mongoose.Types.ObjectId(), ...req.body, userId: req.user.id };

    // Stub Employee.create to return the created employee
    const createStub = sinon.stub(Employee, 'create').resolves(createdEmployee);

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await addEmployee(req, res);

    // Assertions
    expect(createStub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(createdEmployee)).to.be.true;

    // Restore stubbed methods
    createStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    // Stub Employee .create to throw an error
    const createStub = sinon.stub(Employee, 'create').throws(new Error('DB Error'));

    // Mock request data
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { title: "Mr", fname: "Adam", lname: "Smith" , email: "testsample@mail.com", role: "Assistant Manager", salary: "10500", department: "Customer Support", description:"assistant manager of customer support" }
    };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await addEmployee(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    createStub.restore();
  });

});


describe('Update Function Test', () => {

  it('should update employee successfully', async () => {
    // Mock employee data
    const employeeId = new mongoose.Types.ObjectId();
    const existingEmployee = {
      _id: employeeId,
      title: "Dr",
      fname: "Adam", 
      lname: "Smith" , 
      email: "testsample@mail.com", 
      role: "Assistant Manager", 
      salary: "10500", 
      department: "Customer Support", 
      description:"assistant manager of customer support",
      save: sinon.stub().resolvesThis(), // Mock save method
    };
    // Stub Employee.findById to return mock employee
    const findByIdStub = sinon.stub(Employee, 'findById').resolves(existingEmployee);

    // Mock request & response
    const req = {
      params: { id: employeeId },
      body: { title: "Dr", fname: "Adam", lname: "Smith" , email: "testsample@mail.com", role: "Assistant Manager", salary: "10500", department: "Customer Support", description:"assistant manager of customer support"}
    };
    const res = {
      json: sinon.spy(), 
      status: sinon.stub().returnsThis()
    };

    // Call function
    await updateEmployee(req, res);

    // Assertions
    expect(existingEmployee.title).to.equal("Dr");
    expect(res.status.called).to.be.false; // No error status should be set
    expect(res.json.calledOnce).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });



  it('should return 404 if employee is not found', async () => {
    const findByIdStub = sinon.stub(Employee, 'findById').resolves(null);

    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateEmployee(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Employee not found' })).to.be.true;

    findByIdStub.restore();
  });

  it('should return 500 on error', async () => {
    const findByIdStub = sinon.stub(Employee, 'findById').throws(new Error('DB Error'));

    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateEmployee(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;

    findByIdStub.restore();
  });

});



describe('Get Employee Function Test', () => {

  it('should return employee for the given user', async () => {
    // Mock user ID
    const userId = new mongoose.Types.ObjectId();

    // Mock employee data
    const employees = [
      { _id: new mongoose.Types.ObjectId(), email: "firsttestsample@mail.com", userId },
      { _id: new mongoose.Types.ObjectId(), email: "secondtestsample@mail.com", userId }
    ];

    // Stub Employee find to return mock employee
    const findStub = sinon.stub(Employee, 'find').resolves(employees);

    // Mock request & response
    const req = { user: { id: userId } };
    const res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis()
    };

    // Call function
    await getEmployees(req, res);

    // Assertions
    expect(findStub.calledOnceWith({ userId })).to.be.true;
    expect(res.json.calledWith(employees)).to.be.true;
    expect(res.status.called).to.be.false; // No error status should be set

    // Restore stubbed methods
    findStub.restore();
  });

   


});



describe('Delete Employee Function Test', () => {

  it('should delete a employee successfully', async () => {
    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock employee found in the database
    const employee = { remove: sinon.stub().resolves() };

    // Stub Employee findById to return the mock employee
    const findByIdStub = sinon.stub(Employee, 'findById').resolves(employee);

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteEmployee(req, res);

    // Assertions
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(employee.remove.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Employee deleted' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  it('should return 404 if employee is not found', async () => {
    // Stub Employee.findById to return null
    const findByIdStub = sinon.stub(Employee, 'findById').resolves(null);

    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteEmployee(req, res);

    // Assertions
    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Employee not found' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    // Stub EmployeefindById to throw an error
    const findByIdStub = sinon.stub(Employee, 'findById').throws(new Error('DB Error'));

    // Mock request data
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await deleteEmployee(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });

});