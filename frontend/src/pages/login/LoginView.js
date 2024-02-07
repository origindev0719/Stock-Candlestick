import React from 'react';
import icons from '../../assets/icons';
import '../../styles/login/loginStyle.css';
import { CreateAccountForm } from './components/CreateAccountForm';

export const LoginView = () => (
    <div className="SignUp flex w-screen h-screen">
        <div className="LeftSide flex-1 flex-col items-center justify-center bg-neutral-800 text-white md:flex hidden">
            <img className="mb-6" src={icons.logo} alt="Brand illustration" />
            <h2 className="BuySellEachDigi text-white text-3xl font-bold mb-4">Connect. Win. Repeat.</h2>
            <p className="EasilyBuyBitcoinA text-center w-[400px] text-white text-sm font-semibold">Easily check betting lines, view stock indicators, and check cryptocurrency prices using our intuitive online platform.</p>
        </div>
        <CreateAccountForm />
    </div>
);
