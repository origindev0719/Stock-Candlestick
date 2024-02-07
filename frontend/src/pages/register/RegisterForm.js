import React, { useState } from 'react';
import '../../styles/login/loginStyle.css';
import { icons } from '../../assets';
import { Link } from 'react-router-dom';
import { ErrorTooltip } from '../../components/ErrorTooltip';
import { useSelector } from 'react-redux';

export const RegisterForm = ({name, setName, input, setInput, password, setPassword, submitHandler}) => {
    // Initialize local state for the checkbox
    const [isChecked, setIsChecked] = useState(false);
    const [Error, setError] = useState({
        name: "",
        input: "",
        password: "",
        checkbox: ""
    });

    const userRegister = useSelector((state) => state.userRegister);
    const { error } = userRegister;
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Clear previous errors
        setError({
            name: "",
            input: "",
            password: "",
            checkbox: ""
        });
    
        let isValid = true;
    
        // Check for empty username
        if (!name.trim()) {
            setError(error => ({ ...error, name: "Username is required." }));
            isValid = false;
        }
    
        // Check for valid input
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10,15}$/;
        if (!(emailPattern.test(input) || phonePattern.test(input))) {
            setError(error => ({ ...error, input: "Invalid Email Address or Phone Number." }));
            isValid = false;
        }
    
        // Check for strong password
        const strongPasswordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        if (!strongPasswordPattern.test(password)) {
            setError(error => ({ ...error, password: "Password: 8 characters long, 1 uppercase & 1 lowercase character and 1 number." }));
            isValid = false;
        }
    
        // Check if checkbox is checked
        if (!isChecked) {
            setError(error => ({ ...error, checkbox: "You must accept the terms." }));
            isValid = false;
        }
    
        // Call the parent's submitHandler if no errors occurred
        if(isValid) submitHandler(e);
    };

    return (
    <div className="SignUp flex w-screen h-screen">
        <div className="LeftSide flex-1 flex-col items-center justify-center bg-neutral-800 text-white md:flex hidden">
            <img className="mb-6" src={icons.logo} alt="Brand illustration" />
            <h2 className="BuySellEachDigi text-white text-3xl font-bold mb-4">Connect. Win. Repeat.</h2>
            <p className="EasilyBuyBitcoinA text-center w-[400px] text-white text-sm font-semibold">Easily check betting lines, view stock indicators, and check cryptocurrency prices using our intuitive online platform.</p>
        </div>

        <div className="Form flex flex-1 flex-col items-center justify-center bg-neutral-50">
            <div className='w-2/4 mt-10 h-1/3'>
                <h1 className="StartYourCryptoIn text-center text-neutral-900 text-2xl font-bold">Create Account</h1>
            </div>
            <div className="Social mt-6 w-2/4 h-1/3">
            {error && <div className="text-red mb-4">{error}</div>}
                <form className="mb-4 relative" onSubmit={handleSubmit}>
                <div className="mb-6 md:w-full relative"> {/* relative positioning for the input field */}
                        <label htmlFor="username" className="w-36 h-6 text-zinc-500 text-xs font-medium leading-none">USERNAME</label>
                        <input 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 h-12 rounded-xl border border-lightGray focus:shadow-outline" 
                            type="text" 
                            name="username" 
                            id="username" 
                        />
                        {Error.name && <ErrorTooltip message={Error.name} />}
                    </div>

                    <div className="mb-6 md:w-full relative">
                        <label htmlFor="input" className="w-36 h-6 text-zinc-500 text-xs font-medium leading-none">EMAIL OR PHONE NUMBER</label>
                        <input 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full p-2 h-12 rounded-xl border border-lightGray focus:shadow-outline" 
                            type="text" 
                            name="input" 
                            id="input" 
                        />
                        {Error.input && <ErrorTooltip message={Error.input} />}
                    </div>

                    <div className="mb-8 md:w-full relative">
                        <label htmlFor="password" className="w-36 h-6 text-zinc-500 text-xs font-medium leading-none">PASSWORD</label>
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 h-12 rounded-xl border border-lightGray focus:shadow-outline" 
                            type="password" 
                            name="password" 
                            id="password" 
                        />
                        {Error.password && <ErrorTooltip message={Error.password} />}
                    </div>

                    <div className="mb-4 md:w-full flex items-center">
                        <input 
                            type="checkbox" 
                            id="acceptPolicy" 
                            name="acceptPolicy" 
                            required className='w-4 h-4 bg-white rounded border border-lightGray' 
                            checked={isChecked} 
                            onChange={(e) => setIsChecked(e.target.checked)} 
                        />
                        <label 
                            htmlFor="acceptPolicy" 
                            className="ml-2 h-4 text-zinc-500 text-xs font-medium"
                        >
                            By continuing you accept our 
                            <a href="/privacy-policy" className="underline">Privacy Policy</a>
                        </label>
                        {Error.checkbox && <ErrorTooltip message={Error.checkbox} />}
                    </div>
                    <button 
                        type="submit" 
                        className="bg-primary rounded-xl mt-4 flex justify-center items-center h-[48px] p-5 text-sm font-semibold w-full"
                    >
                        Create Account
                    </button>
                </form>
            </div>
            <div className='mt-52 w-2/4 h-1/3'>
                <p className="AlreadyHaveAnAcco mt-4 text-center text-zinc-500 text-sm font-semibold">Already have an account?</p>
                <Link to='/login' className="SignInButton w-full bg-neutral-900 text-white rounded-xl mt-4 flex justify-center items-center h-[48px] p-5 text-sm font-semibold">Sign Up</Link>
            </div>
        </div>
    </div>
);
};