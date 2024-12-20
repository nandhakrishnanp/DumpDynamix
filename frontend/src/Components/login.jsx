import React, { useState } from "react";

import { toast } from "react-toastify";
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const nav = useNavigate();
  const handleSubmit = async()=>{
    if(!email || !password){
      toast.error("Please fill all the fields")
  }

  const response = await axiosInstance.post("/api/login", {
    email,
    password
  })

  const data = response.data;
  console.log("login details",data);


  if(data.message === "Login successful"){
    toast.success(data.message)
    localStorage.setItem("admin" , JSON.stringify(data.admin) )
    nav("/dashboard/home")
  }
  else{
    toast.error(data.message);
  }
  }

  

  return (
    <main className="bg-Secondary w-full h-screen flex ">
      <div className="bg w-[50%] h-screen flex flex-col items-center justify-center">
        <div className="mx-4">
          <h1 className=" text-pale font-Inter text-5xl font-bold">
            DumpDynamix
          </h1>
          <p className="py-2 text-pale text-2xl font-Inter">
            Revolutionizing Dumper Maintenance with Precision
          </p>
        </div>
      </div>

      <div className=" flex flex-col items-center justify-center w-[50%]  h-screen">
        <div>
          <h1 className=" text-3xl text-primary font-bold font-poppins">
            Wellcome Back !
          </h1>
          <p className=" py-2 text-black  text-xl font-poppins">
            Login into DumperDynamiX account
          </p>

          <div className=" flex flex-col gap-4 mt-5">
            <input
              className=" p-2 border-2 font-poppins active:border-primary rounded-md"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter Your Email"
              name=""
              id=""
              required
            />

            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className=" p-2 border-2 font-poppins active:border-primary rounded-md"
              type="password"
              placeholder="Enter Your Password"
              name=""
              id=""
            />
            <button onClick={()=>{
              handleSubmit()
            }}  className=" bg-primary px-4 py-2 rounded-lg text-pale font-poppins hover:bg-primary/95">Login</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
