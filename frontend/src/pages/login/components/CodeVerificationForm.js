import React, { useEffect, useState } from 'react';
import '../../../styles/login/loginStyle.css';
import { icons } from '../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { verify } from '../../../redux/actions/UserActions';
import { useNavigate  } from 'react-router-dom';

export const CodeVerificationForm = () => {
    const [verificationCode, setVerificationCode] = useState(""); 
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo } = userRegister;

    const userVerify = useSelector((state) => state.userVerify);
    const { error } = userVerify;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(verify(userInfo.email, userInfo.phone, verificationCode, navigate));
    };

    useEffect(() => {
        if (userInfo.isVerified) {
            navigate(`/dashboard/${userInfo.id}`);
        }
    }, [userInfo.isVerified, userInfo.id, navigate]);

    return (
        <div className="SignUp flex w-full h-full">
            <div className="LeftSide flex-1 flex-col items-center justify-center bg-neutral-800 text-white md:flex hidden">
                <img className="mb-6" src={icons.logo} alt="Brand illustration" />
                <h2 className="BuySellEachDigi text-white text-3xl font-bold mb-4">Connect. Win. Repeat.</h2>
                <p className="EasilyBuyBitcoinA text-center w-[400px] text-white text-sm font-semibold">Easily check betting lines, view stock indicators, and check cryptocurrency prices using our intuitive online platform.</p>
            </div>

            <div className="Form flex flex-1 flex-col items-center justify-center bg-neutral-50">
                <div className='w-[300px] mb-10'>
                    <h1 className="StartYourCryptoIn text-center text-neutral-900 text-2xl font-bold mb-5">Verification</h1>
                    <p className="EnterThe8DigitCr w-80 text-center text-zinc-500 text-sm font-medium leading-tight">
                        Enter the 8-digit security code and your phone number will be verified
                    </p>
                </div>
                <div className="Social mt-6 w-[300px]">
                {error && <div className="text-red mb-4">{error}</div>}
                    <form className="mb-4" onSubmit={submitHandler}>
                        <div className="mb-6 md:w-full">
                            <label htmlFor="code" className="w-36 h-6 text-zinc-500 text-xs font-medium leading-none">VERIFICATION CODE</label>
                            <input onChange={(e) => setVerificationCode(e.target.value)} value={verificationCode} className="w-full p-2 h-12 rounded-xl border border-lightGray focus:shadow-outline" type="code" name="code" id="code" placeholder='Enter code' />
                        </div>
                        <div className="mb-4 md:w-full flex items-center">
                            <p className="ml-2 h-4 text-zinc-500 text-xs font-medium">Don't receive your code? <button className="text-neutral-900 text-xs font-semibold">Resend</button></p>
                        </div>
                        <button className="bg-primary rounded-xl mt-4 flex justify-center items-center h-[48px] p-5 text-sm font-semibold w-full">Submit</button>
                    </form>
                </div>
            </div>

        </div>
    );
}