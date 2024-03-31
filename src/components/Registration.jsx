"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    roll: "",
    age: "",
    grade: "",
    course: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/student', formData);

      if (!response.status === "Success") {
        throw new Error('Network response was not ok');
      }
      
      toast.success('Student profile created successfully')

      setFormData({
        first_name: '',
        last_name: '',
        roll: '',
        age: '',
        grade: '',
        course: '',
      });
      

    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  
  return (
    <div className="w-full flex justify-center items-center pt-16">
      <div className="w-[45%]">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Student Registration Form
        </h1>
        <form
          className=" bg-white p-8 rounded shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-8">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="border px-6 py-2 rounded-sm"
              required
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="border px-6 py-2 rounded-sm"
              required
            />
            <input
              type="text"
              name="roll"
              value={formData.roll}
              onChange={handleChange}
              placeholder="Roll"
              className="border px-6 py-2 rounded-sm"
              required
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="border px-6 py-2 rounded-sm"
              required
            />
            <input
              type="number"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="Grade"
              className="border px-6 py-2 rounded-sm"
              required
            />
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Course"
              className="border px-6 py-2 rounded-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mt-6 hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
