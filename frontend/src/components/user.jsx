import React, { useState } from "react";
import { useMutation} from "@apollo/client";
import { ADD_USER } from "../graphql/users";



const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    sex: "Male",
    image: null,
  });

  const [addUser, { loading, error, data }] = useMutation(ADD_USER);


const handleSubmit = async (e) => {
    e.preventDefault();
   
     const formdata = new FormData(e.currentTarget)

 await addUser({
      variables: {
      name: formdata.get("name"),
      email: formdata.get("email"),
      age: parseInt(formdata.get("age")),
      sex: formdata.get("sex"),
      image: formdata.get("image"), // should be File, requires Upload scalar
    },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">User Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded focus:outline-none focus:ring"
        
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded focus:outline-none focus:ring"
         
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          className="w-full p-2 border rounded focus:outline-none focus:ring"
        
        />
        <select
          name="sex"
          className="w-full p-2 border rounded focus:outline-none focus:ring"
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          type="file"
          name="image"
          accept="image/*"
       
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {data && <p className="text-red-500 mt-4">{data?.createUser.message}</p>}
      
    </div>
  );
};

export default UserForm;
