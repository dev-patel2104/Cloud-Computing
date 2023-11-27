import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import homeImage from '../assets/home.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUserByEmail } from '../services/UserManagementServices';
import md5 from "md5";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isButtonClickable, setIsButtonClickable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const minPasswordLength = 8;

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u.test(email);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setMessage("");
        setEmail(e.target.value);
        const isValidEmail = validateEmail(e.target.value);
        setIsEmailValid(isValidEmail);
        if (e.target.value && isValidEmail && password && password.length >= minPasswordLength) {
            setHasError(false);
            setIsButtonClickable(true);
        } else {
            setHasError(true);
            setIsButtonClickable(false);
        }
    };

    const handlePasswordChange = (e) => {
        setMessage("");
        setPassword(e.target.value);
        if (email && e.target.value && e.target.value.length >= minPasswordLength && isEmailValid) {
            setHasError(false);
            setIsButtonClickable(true);
        } else {
            setHasError(true);
            setIsButtonClickable(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (hasError) {
            console.error('All the fields are not properly filled');
            return;
        }

        setIsLoading(true);
        try {

            const user = await getUserByEmail(email);
            const passwordHash = md5(password);
            console.log(user);
            if(user.error)
            { 
                setIsLoading(false);
                setEmail('');
                setMessage('No such email exist');
            }
            else if (user && user.password === passwordHash) {
                // Password is correct, store the email in local storage
                
                localStorage.setItem('email', email);
                setIsLoading(false);
                // Redirect the user to the groceries page
                navigate('/groceries');
            } else {
                setIsLoading(false);
                setPassword('');
                setMessage('Invalid Password');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-row w-screen bg-customBackground" style={{ height: '100vh' }}>
            <div className='flex w-2/3 h-full justify-center items-center'>
                <img src={homeImage} alt="home" style={{ width: '85%', height: 'auto' }} />
            </div>
            <div className="flex flex-col justify-center items-center w-1/2" >
                <div className="flex flex-row w-full mb-8 justify-center">
                    <h1 className="text-3xl font-semibold"> Login to Your Account </h1>
                </div>
                <div className="flex flex-col gap-8 w-9/12 items-center shadow-lg p-6 rounded-md">
                    <div className="flex flex-col justify-center items-start w-full">
                        <div className="relative flex items-center w-full">
                            <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-default-400 absolute left-3" />
                            <input
                                type="email"
                                className={`border rounded-md p-2 w-full pl-10 ${!isEmailValid && email !== '' ? 'border-red-500' : ''}`}
                                placeholder="Enter your email"
                                onChange={handleEmailChange}
                                value={email}
                            />
                        </div>
                        {!isEmailValid && email !== '' && <p className='text-red-600'> Please fill out the email properly </p>}
                    </div>
                    <div className="flex flex-col gap-2 justify-center w-full">
                        <div className="relative flex items-center w-full">
                            <FontAwesomeIcon icon={faKey} className="text-2xl text-default-400 absolute left-3" />
                            <input
                                type="password"
                                className={`border rounded-md p-2 w-full pl-10 ${password.length < minPasswordLength && password !== '' ? 'border-red-500' : ''
                                    }`}
                                placeholder="Enter your password"
                                onChange={handlePasswordChange}
                                value={password}
                            />
                        </div>
                        {password.length < minPasswordLength && password !== '' && <p className='text-red-600'> Password must be minimum of 8 characters </p>}
                        <p className="text-sm ">
                            Don't have an account?
                            <NavLink to='/sign-up'>
                                <button className="text-blue-500"> Register </button>
                            </NavLink>

                        </p>
                    </div>
                    <div className="flex justify-center w-full mt-2">
                        {isLoading ?
                            (<div role="status">
                                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>) :
                            (<button
                                className={`w-2/3 text-lg font-semibold rounded-lg py-2 px-2 bg-blue-500 text-gray-200 ${isButtonClickable ? '' : 'cursor-not-allowed opacity-50'
                                    }`}
                                type="submit"
                                onClick={handleLogin}
                                disabled={!isButtonClickable}
                            >
                                Login
                            </button>)}
                    </div>
                </div>
                <p className="text-red-500 mt-4">{message}</p>
            </div>
        </div>

    );
};

export default Login;
