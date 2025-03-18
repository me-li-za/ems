import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const EmployeeList = ({ employees, setEmployees, setEditingEmployee }) => {
  const { user } = useAuth();

  const handleDelete = async (employeeId) => {
    try {
      await axiosInstance.delete(`/api/employees/${employeeId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEmployees(employees.filter((employee) => employee._id !== employeeId));
    } catch (error) {
      alert('Failed to delete Employee.');
    }
  };

  return (
    <div>
         <h1 class="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl"> Employees</h1>
      {employees.map((employee) => (
        
        <div key={employee._id} className="bg-gray-100 p-4 mb-4 rounded shadow ">
          <div className="flex flex-row flex-wrap items-center justify-items-stretch gap-4">
            <div className=" text-wrap"><label className='text-xs text-gray-400'>Title</label><p className="font-bold">{employee.title}</p> </div>
            <div className="  text-wrap"><label className='text-xs text-gray-400'>First Name</label><p className="font-bold">{employee.fname}</p></div>
            <div className="  text-wrap"><label className='text-xs text-gray-400'>Last Name</label><p className="font-bold">{employee.lname}</p></div>
            <div className=" text-wrap"><label className='text-xs text-gray-400 '>Email</label><p className="font-bold break-all">{employee.email}</p></div>
            <div className="  text-wrap"><label className='text-xs text-gray-400'>Department</label><p className="font-bold">{employee.department}</p></div>
            <div className="  text-wrap"><label className='text-xs text-gray-400'>Job Role</label><p className="font-bold">{employee.role}</p></div>
            <div className=" text-wrap"><label className='text-xs text-gray-400'>Job Description</label><p className="font-bold">{employee.description}</p></div>  
            <div className=' ' ><button
                onClick={() => setEditingEmployee (employee)}
                className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(employee._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button></div>
          </div>
           
        </div>  

      ))}
    </div>
  );
};

export default EmployeeList;
