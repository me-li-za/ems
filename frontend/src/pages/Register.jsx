import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({ fname: '', lname: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('User is added.');
      navigate('/register');
    } catch (error) {
      alert('There was a problem adding the user. Please contact support for assistance.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Add New User</h1>
        <input required
          type="text"
          placeholder="First Name"
          value={formData.fname}
          onChange={(e) => setFormData({ ...formData, fname: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
         <input required
          type="text"
          placeholder="Last Name"
          value={formData.lname}
          onChange={(e) => setFormData({ ...formData, lname: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input required
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
         <input required
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input required
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
