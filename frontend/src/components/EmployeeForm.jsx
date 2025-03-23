import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';


const EmployeeForm = ({ employees, setEmployees, editingEmployee, setEditingEmployee }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({  title: '', fname: '', lname: '', email: '', role: '', salary: '', department: '', description: '' });

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        title: editingEmployee.title,
        fname: editingEmployee.fname,
        lname: editingEmployee.lname,
        email: editingEmployee.email,
        role: editingEmployee.role,
        salary: editingEmployee.salary,
        department: editingEmployee.department,
        description: editingEmployee.description,
      });
    } else {
      setFormData({  title: '', fname: '', lname: '',  email: '', role: '', salary: '', department: '', description: '' });
    }
  }, [editingEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        const response = await axiosInstance.put(`/api/employees/${editingEmployee._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEmployees(employees.map((employee) => (employee._id === response.data._id ? response.data : employee)));
      } else {
        const response = await axiosInstance.post('/api/employees', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setEmployees([...employees, response.data]);
        alert('New Employee Addded');
      }
      setEditingEmployee(null);
      setFormData({ title: '', fname: '', lname: '', email: '', role: '', salary:'', department: '',  description: '' });
    } catch (error) {
      alert('Failed to save employee.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h1>
      <label className='text-xs text-gray-400'>Title</label>
      <input required
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <label className='text-xs text-gray-400'>First Name</label>
      <input required
        type="text"
        placeholder="First Name"
        value={formData.fname}
        onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <label className='text-xs text-gray-400'>Last Name</label>
       <input required
        type="text"
        placeholder="Last Name"
        value={formData.lname}
        onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <label className='text-xs text-gray-400'>Email Address</label>
       <input required
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <label className='text-xs text-gray-400'>Departmnent</label>
      <input required
        type="text"
        placeholder="Department"
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <label className='text-xs text-gray-400'>Job Role</label>
       <input required
        type="text"
        placeholder="Role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <label className='text-xs text-gray-400'>Salary</label>
       <input required
        type="text"
        placeholder="1000.00"
        inputMode="decimal"
        autoComplete="off"
        value={formData.salary}
        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      
      <label className='text-xs text-gray-400'>Job Description</label>
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingEmployee ? 'Update Employee' : 'Add Employee'}
      </button>
    </form>
  );
};

export default EmployeeForm;
