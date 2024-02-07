import React, { useState } from "react"
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/UserActions';
import { RegisterForm } from "./RegisterForm"

export const RegisterPage = () => {
  const [input, setInput] = useState('');
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo } = userDetails;

  const submitHandler = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10,15}$/;

    // Remove all non-numeric characters from input
    const sanitizedInput = input.replace(/\D/g, '');

    if (emailPattern.test(input)) {
      setEmail(input);
      setPhone(null);
    } else if (sanitizedInput.length > 10 && !sanitizedInput.startsWith('1')) {
      setPhone('1' + sanitizedInput);  // Add "1" at the beginning
      setEmail(null);
    } else if (sanitizedInput.length === 10) {
      setPhone(sanitizedInput);
      setEmail(null);
    } else {
      console.error("Invalid Email or Phone Number");
      return;
    }

      dispatch(register(name, email, password, phone, navigate));
  };

  if (userInfo) {
    return <Navigate to="/verification" />;
  }

  return (
    <RegisterForm
      name={name}
      setName={setName}
      input={input}
      setInput={setInput}
      password={password}
      setPassword={setPassword}
      submitHandler={submitHandler}
    />
  )
}