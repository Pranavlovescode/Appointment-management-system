import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../Data/service';
import edit from "../assets/edit _button.svg";  // Your edit icon
import { useState } from 'react';
import LogoutWarning from '@/Components/LogoutWarning';

const ServiceMaster = () => {
  const [token, setToken] = useState(null);
    // const [services, setServices] = useState(services);
    // const handleDelete = (id) => {
        // const updatedServices = services.filter(service => service.id !== id);
        // setServices(updatedServices);
    //   };
  return (
    <>
      {token ?(
        <div className="p-4">
        <h1 className="text-3xl mb-4">Service Master</h1>
  
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b text-center">Name</th>
                <th className="px-4 py-2 border-b text-center">Price</th>
                <th className="px-4 py-2 border-b text-center">Duration</th>
                <th className="px-4 py-2 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b text-center">{service.name}</td>
                  <td className="px-4 py-2 border-b text-center">{service.price}</td>
                  <td className="px-4 py-2 border-b text-center">{service.duration}</td>
                  <td className="px-4 py-2 border-b text-center flex justify-center items-center">
                  <button
                      className="px-3 py-1 ml-2 w-20"
                      // onClick={() => handleDelete(service.id)}
                    >
                      🗑️
                    </button>
                    <Link
                      to={`/edit-service/${service.id}`}
                      className="px-3 py-1 rounded m-1 w-20"
                    >
                      <img src={edit} alt="edit" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <Link to="/add-service">
          <button className="bg-red-500 text-white px-4 py-2 rounded mt-4">
            Add Service
          </button>
        </Link>
      </div>
      ):(
        <LogoutWarning/>
      )}    
    </>
  );
};

export default ServiceMaster;
