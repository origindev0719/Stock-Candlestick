import React, { useState } from 'react';
import '../../../styles/login/loginStyle.css';
import { icons } from '../../../assets';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/UserActions';

export const LoginForm = () => {
    const [password, setPassword] = useState("");
    const [input, setInput] = useState('');
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [name, setName] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector((state) => state.userDetails);
    const { userInfo } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { error } = userLogin;

    const submitHandler = (e) => {
        e.preventDefault();
        // Regex patterns to check if email state contains a number or an email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\d{10,15}$/;

        if (emailPattern.test(input)) {
            setEmail(input);
        } else if (phonePattern.test(input)) {
            setPhone(input);
        } else if (input !== '') {
            setName(input)
        } else {
            console.error("Invalid Email, Phone Number or Username");
            return;
        }
            dispatch(login(email, password, phone, name, navigate));
    };

    if (userInfo) {
        return <Navigate to={`/dashboard/${userInfo.id}`} />;
    }

    return (
        <div className="SignUp flex w-screen h-screen overflow-x-hidden">
            <div className="LeftSide w- flex-1 flex-col items-center justify-center bg-neutral-800 text-white md:flex hidden">
                <img className="mb-6" src={icons.logo} alt="Brand illustration" />
                <h2 className="BuySellEachDigi text-white text-3xl font-bold mb-4">Connect. Win. Repeat.</h2>
                <p className="EasilyBuyBitcoinA text-center w-[400px] text-white text-sm font-semibold">Easily check betting lines, view stock indicators, and check cryptocurrency prices using our intuitive online platform.</p>
            </div>

            <div className="Form flex flex-1 flex-col items-center justify-center bg-neutral-50 h-screen">
                <div className='w-2/4 pt-10 h-1/3'>
                    <h1 className="StartYourCryptoIn text-center text-neutral-900 text-2xl font-bold">Sign In</h1>
                </div>
                <div className="Social mt-6 w-2/4 h-1/3">
                {error && <div className="text-red mb-4">{error}</div>}
                    <form className="mb-4" onSubmit={submitHandler}>
                        <div className="mb-6 md:w-full">
                            <label htmlFor="input" className="w-36 h-6 text-zinc-500 text-xs font-medium leading-none">USERNAME OR EMAIL</label>
                            <input onChange={(e) => setInput(e.target.value)} value={input} className="w-full p-2 h-12 rounded-xl border border-lightGray focus:shadow-outline" type="text" name="input" id="input" />
                        </div>
                        <div className="mb-8 md:w-full">
                            <label htmlFor="password" className="w-36 h-6 text-zinc-500 text-xs font-medium leading-none">PASSWORD</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} className="w-full p-2 h-12 rounded-xl border border-lightGray focus:shadow-outline" type="password" name="password" id="password" />
                        </div>
                        <button type="submit" className="bg-primary rounded-xl mt-4 flex justify-center items-center h-[48px] p-5 text-sm font-semibold w-full">Sign In</button>
                    </form>
                </div>
                <div className='mt-16 mb-5 w-2/4 h-1/3'>
                    <p className="AlreadyHaveAnAcco mt-4 text-center text-zinc-500 text-sm font-semibold">Don't have an account?</p>
                    <Link to='/register' className="SignInButton w-full bg-neutral-900 text-white rounded-xl mt-4 flex justify-center items-center h-[48px] p-5 text-sm font-semibold">Sign Up</Link>
                </div>
            </div>

        </div>
    )
};
