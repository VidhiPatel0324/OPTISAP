import React, { useState } from 'react'
import loginIcons from '../assets/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

// Import SAP Fiori UI5 Web Components
import { Button, Input, Text } from '@ui5/webcomponents-react';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || loginIcons} alt='login icons' />
            </div>
            <form>
              <label>
                <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input type='file' className='hidden' onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            {/* Name Field with SAP Fiori Input */}
            <div className='grid'>
              <label>Name:</label>
              <div className='bg-slate-100 p-2'>
                <Input
                  type='text'
                  placeholder='Enter your name'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            {/* Email Field with SAP Fiori Input */}
            <div className='grid'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2'>
                <Input
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            {/* Password Field with SAP Fiori Input */}
            <div>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter password'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div
                  className='cursor-pointer text-xl'
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm Password Field with SAP Fiori Input */}
            <div>
              <label>Confirm Password:</label>
              <div className='bg-slate-100 p-2 flex'>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Enter confirm password'
                  value={data.confirmPassword}
                  name='confirmPassword'
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent'
                />
                <div
                  className='cursor-pointer text-xl'
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            {/* SAP Fiori Button for Sign Up */}
            <Button
              design="Emphasized"
              type="submit"
              className='w-full max-w-[150px] rounded-full mx-auto mt-6'
            >
              Sign Up
            </Button>
          </form>

          <p className='my-5'>
            Already have an account?{' '}
            <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
