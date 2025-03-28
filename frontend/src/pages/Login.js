import React, { useContext, useState } from 'react'
import loginIcons from '../assets/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

// Import SAP Fiori UI5 Web Components
import { Button, Input, Text } from '@ui5/webcomponents-react';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/');
            fetchUserDetails();
            fetchUserAddToCart();
        }

        if (dataApi.error) {
            toast.error(dataApi.message);
        }
    };

    console.log("data login", data);

    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons' />
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                {/* Using SAP Fiori Input component */}
                                <Input
                                    type='email'
                                    placeholder='Enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div>
                            <label>Password:</label>
                            <div className='bg-slate-100 p-2 flex'>
                                {/* Using SAP Fiori Input component */}
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
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
                            <Link
                                to={'/forgot-password'}
                                className='block w-fit ml-auto hover:underline hover:text-red-600'
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Using SAP Fiori Button component */}
                        <Button
                            design="Emphasized"
                            type="submit"
                            className='w-full max-w-[150px] rounded-full mx-auto mt-6'
                        >
                            Login
                        </Button>
                    </form>

                    <p className='my-5'>
                        Don't have an account?{' '}
                        <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
