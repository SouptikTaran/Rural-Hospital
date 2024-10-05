/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import axios from 'axios';

// Define types for Doctor, Department, and Hospital
interface Doctor {
  name: string;
  specialization: string;
  phoneNumber: string;
  email: string;
}

interface Department {
  name: string;
  doctors: Doctor[];
}

interface HospitalData {
  name: string;
  location: string;
  latitude: string;
  longitude: string;
  departments: Department[];
}

const CreateHospital = () => {
  const [hospitalData, setHospitalData] = useState<HospitalData>({
    name: '',
    location: '',
    latitude: '',
    longitude: '',
    departments: [
      {
        name: '',
        doctors: [
          {
            name: '',
            specialization: '',
            phoneNumber: '',
            email: '',
          },
        ],
      },
    ],
  });

  // Update handleChange function with better type checking
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number | null,
    doctorIndex: number | null,
    field: string,
    type: 'hospital' | 'department' | 'doctor'
  ) => {
    const value = e.target.value;
    const updatedHospitalData = { ...hospitalData };
  
    if (type === 'hospital') {
      (updatedHospitalData as any)[field] = value;
    } else if (type === 'department' && index !== null) {
      if (field === 'name') {
        updatedHospitalData.departments[index].name = value;
      } 
      // Skip assigning to 'doctors' field directly, handle adding/removing doctors elsewhere
    } else if (type === 'doctor' && index !== null && doctorIndex !== null) {
      updatedHospitalData.departments[index].doctors[doctorIndex][field as keyof Doctor] = value;
    }
  
    setHospitalData(updatedHospitalData);
  };
  

  const addDepartment = () => {
    setHospitalData({
      ...hospitalData,
      departments: [
        ...hospitalData.departments,
        { name: '', doctors: [{ name: '', specialization: '', phoneNumber: '', email: '' }] },
      ],
    });
  };

  const addDoctor = (index: number) => {
    const updatedDepartments = [...hospitalData.departments];
    updatedDepartments[index].doctors.push({
      name: '',
      specialization: '',
      phoneNumber: '',
      email: '',
    });

    setHospitalData({
      ...hospitalData,
      departments: updatedDepartments,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(hospitalData);
      const response = await axios.post('http://localhost:8000/hospitals', hospitalData);
      console.log('Hospital created:', response.data);
    } catch (error) {
      console.error('Error creating hospital:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Create Hospital</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Hospital Name:</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            value={hospitalData.name}
            onChange={(e) => handleChange(e, null, null, 'name', 'hospital')}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location:</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            value={hospitalData.location}
            onChange={(e) => handleChange(e, null, null, 'location', 'hospital')}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Latitude:</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              value={hospitalData.latitude}
              onChange={(e) => handleChange(e, null, null, 'latitude', 'hospital')}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Longitude:</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              value={hospitalData.longitude}
              onChange={(e) => handleChange(e, null, null, 'longitude', 'hospital')}
              required
            />
          </div>
        </div>

        {hospitalData.departments.map((department, index) => (
          <div key={index} className="mb-6 bg-gray-100 p-4 rounded-md shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Department {index + 1}</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Department Name:</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={department.name}
                onChange={(e) => handleChange(e, index, null, 'name', 'department')}
                required
              />
            </div>

            {department.doctors.map((doctor, doctorIndex) => (
              <div key={doctorIndex} className="mb-4">
                <h4 className="text-lg font-medium text-gray-600 mb-2">Doctor {doctorIndex + 1}</h4>
                <div className="mb-2">
                  <label className="block text-gray-700">Doctor Name:</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                    value={doctor.name}
                    onChange={(e) => handleChange(e, index, doctorIndex, 'name', 'doctor')}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Specialization:</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                    value={doctor.specialization}
                    onChange={(e) => handleChange(e, index, doctorIndex, 'specialization', 'doctor')}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Phone Number:</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                    value={doctor.phoneNumber}
                    onChange={(e) => handleChange(e, index, doctorIndex, 'phoneNumber', 'doctor')}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Email:</label>
                  <input
                    type="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                    value={doctor.email}
                    onChange={(e) => handleChange(e, index, doctorIndex, 'email', 'doctor')}
                    required
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => addDoctor(index)}
            >
              Add Doctor
            </button>
          </div>
        ))}

        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mt-4"
          onClick={addDepartment}
        >
          Add Department
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 mt-4 ml-4"
        >
          Create Hospital
        </button>
      </form>
    </div>
  );
};

export default CreateHospital;
