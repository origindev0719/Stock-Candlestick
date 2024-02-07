import React, { useEffect } from 'react';
import icons from '../../../assets/icons';
import '../../../styles/login/loginStyle.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { useLogin } from 'react-facebook';
import { loginWithFacebook, loginWithGoogle } from '../../../redux/actions/UserActions';

export const CreateAccountForm = () => {
    const { login, status, isLoading, error } = useLogin();
    const userDetails = useSelector((state) => state.userDetails);
    const { userInfo } = userDetails;

    const dispatch = useDispatch();
    const navigate = useNavigate()

    async function handleFacebookLogin() {
        try {
            const response = await login({
                scope: 'public_profile,email',
            });

            await dispatch(loginWithFacebook(response.authResponse.userID, response.authResponse.accessToken, navigate));
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            await dispatch(loginWithGoogle(tokenResponse.access_token, navigate));
        },
    })

    useEffect(() => {
        if (window.AppleID) {
            window.AppleID.auth.init({
                clientId: 'com.elparly.siwa',
                scope: 'email',
                redirectURI: 'https://elparly.com',
                state: 'state',
                usePopup: true // this will use a popup window for authentication.
            });

            // Logging the successful response
            window.AppleID.auth.onComplete = (response) => {
                console.log('Apple Sign In Response:', response);
            };

            // Logging any error during the process
            window.AppleID.auth.onError = (error) => {
                console.error('Apple Sign In Error:', error);
            };
        }
    }, []);

    const handleAppleLogin = () => {
        if (window.AppleID) {
            window.AppleID.auth.signIn();
        }
        if (userInfo) {
            return <Navigate to={`/dashboard/${userInfo.id}`} />;
        }
    };

    //if (userInfo) {
    //    return <Navigate to={`/dashboard/${userInfo.id}`} />;
    //}

    return (
        <div className="Form flex flex-1 h-screen flex-col items-center justify-center bg-neutral-50">
            <div className='w-[300px] h-1/3 mt-10'>
                <div className="LogoDark flex justify-center items-center bg-black rounded-full mb-6 mx-auto">
                    <img className="IconWhiteWithColor w-16 h-16" src={icons.logo} alt="App logo" />
                </div>
                <h1 className="StartYourCryptoIn text-center text-neutral-900 text-2xl font-bold">Create Your El Parlay Account Today</h1>
            </div>
            <div className="Social mt-6 w-[300px] h-1/3">
                <button
                    onClick={() => handleFacebookLogin()}
                    disabled={isLoading}
                    className="bg-white rounded-xl border border-lightGray flex justify-center items-center h-[48px] p-5 text-sm font-semibold w-full">
                    <div className="FacebookLogo w-5 h-5 mr-2">
                        <img className="IconWhiteWithColor w-5 h-5" src={icons.facebookLogo} alt="App logo" />
                    </div>
                    Continue with Facebook
                </button>
                <button
                    onClick={() => handleAppleLogin()}
                    className="bg-white rounded-xl border border-lightGray flex justify-center items-center mt-4 h-[48px] p-5 text-sm font-semibold w-full">
                    <div className="AppleLogo w-5 h-5 mr-2">
                        <img className="IconWhiteWithColor w-5 h-5" src={icons.appleLogo} alt="App logo" />
                    </div>
                    Continue with Apple
                </button>
                <button
                    onClick={() => handleGoogleLogin()}
                    className="bg-white rounded-xl border border-lightGray flex justify-center items-center mt-4 h-[48px] p-5 text-sm font-semibold w-full">
                    <div className="GoogleLogo w-5 h-5 mr-2">
                        <img className="IconWhiteWithColor w-5 h-5" src={icons.googleLogo} alt="App logo" />
                    </div>
                    Continue with Google
                </button>

                <Link to='/register' className="bg-primary rounded-xl mt-4 flex justify-center items-center h-[48px] p-5 text-sm font-semibold w-full">Sign Up with Phone or Email</Link>
            </div>
            <div className='mt-16 mb-3 w-[300px] h-1/3'>
                <p className="AlreadyHaveAnAcco mt-4 text-center text-zinc-500 text-sm font-semibold">Already have an account?</p>
                <Link to='/login' className="SignInButton w-full bg-neutral-900 text-white rounded-xl mt-4 flex justify-center items-center h-[48px] p-5 text-sm font-semibold">Sign In</Link>
            </div>
        </div>
    );
}