import React, { useState } from 'react';
import { FaTimes, FaFacebook, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import Constants from '@/ults/Constant';
import Swal from 'sweetalert2';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const LoginPopUp = ({ showPopup, togglePopup }) => {
  const [signInData, setSignInData] = useState({ username: '', password: '' });
  const [signInErr, setSignInErr] = useState({});
  const [regData, setRegData] = useState({});
  const [err, setErr] = useState({});
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState('');

 
  const handleSignIn = (e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeRegistration = (e) => {
    const { name, value } = e.target;
    setRegData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'conf_password' && regData.password !== value) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };

  const signInSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    try {
      const response = await fetchLoginData();
      const { status, error, token } = await response.json();

      if (status === 400) {
        handleLoginError(error);
      } else if (token) {
        handleSuccessfulLogin(token);
        console.log('Login successful');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle network or other errors
    } finally {
      setIsSubmit(false);
    }
  };

  const fetchLoginData = () => {
    return fetch(Constants.BASE_URL + '/api/login', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        email: signInData.username,
        password: signInData.password,
        user_type: 2,
      }),
    });
  };

  const handleLoginError = (error) => {
    const err_list = Object.fromEntries(
      Object.entries(error).map(([key, value]) => [key, value[0]])
    );
    setSignInErr(err_list);
  };

  const handleSuccessfulLogin = (token) => {
    setSignInErr({});
    setCookie('home_text_token', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    window.location.href = '/';
    Swal.fire({
      title: 'Success',
      text: 'Login successful!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const regSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    
    if (regData.password !== regData.conf_password) {
      setShowWarning(true);
      setIsSubmit(false);
      return;
    }

    try {
      const response = await fetchRegistrationData();
      const { status, error } = await response.json();
      console.log('API Response:', status, error);

      if (status === 400) {
        handleRegistrationError(error);
      } else {
        handleSuccessfulRegistration();
        console.log('Registration successful');
      }
    } catch (error) {
      console.error('Error registering:', error);
      // Handle network or other errors
    } finally {
      setIsSubmit(false);
    }
  };

  const fetchRegistrationData = () => {
    const payload = {
      username: regData.username,
      password: regData.password,
      conf_password: regData.conf_password,
      email: regData.email,
      phone: regData.phone,
      first_name: regData.first_name
    };

    console.log('Payload:', payload);

    return fetch(Constants.BASE_URL + '/api/user-registration', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(payload),
    });
  };

  const handleRegistrationError = (error) => {
    const err_list = Object.fromEntries(
      Object.entries(error).map(([key, value]) => [key, value[0]])
    );
    setErr(err_list);
  };

  const handleSuccessfulRegistration = () => {
    setErr({});
    Swal.fire({
      title: 'Success',
      text: 'Registration successful!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    togglePopup();CA
  };

  if (!showPopup) return null;
  const handleGoogleSuccess = (credentialResponse) => {
    const decode=jwtDecode(credentialResponse?.credential);
    console.log(decode);
   
  };
  const handleGoogleError = () => {
    console.log('Google Login Failed');
    // Handle Google login error
  };
  const googleClientId = '91607278395-ivk7qjnbujmvkpc2mek1mliscv2vbeb4.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>

    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-gray-700 opacity-50"></div>
        <div className="relative bg-white rounded-lg mx-4 w-auto lg:w-[800px] flex flex-col overflow-hidden">
          <div className="flex justify-end">
            <button
              className="flex items-center rounded-[100%] p-2"
              onClick={togglePopup}
            >
              <FaTimes className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </button>
          </div>

          <div className="flex flex-col justify-center items-center py-5">
            <img
              src="/images/hometex-logo.png"
              alt="Hometex Bangladesh"
              className="w-24 h-auto"
            />
            <p className="px-3">
              Want TK100 off your first purchase? Login or sign up to unlock!
            </p>
          </div>
          <div className="px-6 flex-1 flex flex-col">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full">
                <fieldset
                  className="fieldset login"
                  data-hasrequired="* Required Fields"
                >
                  <div className="field email required email-input">
                    <h1 className="text-center pb-5 text-2xl font-bold">
                      Login
                    </h1>
                    <div className="control mb-3 flex items-center border">
                      <input
                        name="username"
                        value={signInData?.username || ''}
                        autoComplete="off"
                        id="username"
                        type="text"
                        title="Username"
                        placeholder="Phone number or email"
                        onChange={handleSignIn}
                        className="px-2 py-3 w-full"
                      />
                    </div>
                    <p className="has_error"> {signInErr?.username} </p>
                  </div>
                  <div className="field password required pass-input">
                    <div className="control flex items-center border">
                      <input
                        name="password"
                        type="password"
                        value={signInData?.password || ''}
                        autoComplete="off"
                        id="pass"
                        title="Password"
                        placeholder="Password"
                        onChange={handleSignIn}
                        className="px-2 py-3 w-full"
                      />
                    </div>
                    <p className="has_error"> {signInErr?.password} </p>
                  </div>

                  <div className="secondary ft-link-p text-right py-2">
                    <a className="action remind" href="/account/Forgotten">
                      <span>Forgot Your Password?</span>
                    </a>
                  </div>
                  <div className="actions-toolbar">
                    <button
                      onClick={signInSubmitHandler}
                      type="submit"
                      className="w-full action login primary bg-[#9eb7f3] hover:bg-teal-700 py-3 mt-2 text-white rounded-xl text-md font-semibold"
                      name="send"
                      id="send2"
                    >
                      <span>{isSubmit ? 'Processing..' : 'Login'}</span>
                    </button>
                  </div>
                </fieldset>
              </div>
              <div className="w-full">
                <div>
                  <h1 className="text-center pb-5 text-2xl font-bold">
                    Sign up
                  </h1>
                  <div className="flex gap-3 items-center">
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="first_name"
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      value={regData?.first_name || ''}
                      onChange={handleChangeRegistration}
                    />
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="last_name"
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      value={regData?.last_name || ''}
                      onChange={handleChangeRegistration}
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={regData?.email || ''}
                      onChange={handleChangeRegistration}
                    />
                    <p className="has_error"> {err?.email} </p>
                  </div>
                  <div className="mt-2">
                    <input
                      className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="phone"
                      type="number"
                      placeholder="Mobile No"
                      name="phone"
                      value={regData?.phone || ''}
                      onChange={handleChangeRegistration}
                    />
                    <p className="has_error"> {err?.phone} </p>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      type="password"
                      placeholder="Password *"
                      className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="password"
                      value={regData?.password || ''}
                      onChange={handleChangeRegistration}
                    />
                    <p className="has_error"> {err?.password} </p>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      type="password"
                      placeholder="Password Confirm *"
                      className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      name="conf_password"
                      value={regData?.conf_password || ''}
                      onChange={handleChangeRegistration}
                    />
                    <p className="has_error"> {err?.conf_password} </p>
                    {showWarning && (
                      <span className="text-red-500 text-sm ml-3">
                        Passwords do not match
                      </span>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={regSubmitHandler}
                      type="submit"
                      className="w-full bg-[#9eb7f3] hover:bg-teal-700 py-3 mt-2 text-white rounded-xl text-md font-semibold"
                    >
                      <span>{isSubmit ? 'Processing..' : 'Create Account'}</span>
                    </button>
                  </div>
                  <p className="has_error"> {err?.login_err} </p>
                </div>
                <div className="hr text-center mt-4">OR</div>
                <div className="row social-login mt-2">
                <div className="row social-login mt-2">
  <div className="col-12 text-center">
    <div className="loginBox">
      {/* Other social login buttons */}

      {googleClientId && (
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  shape="rectangular"
                  theme="outline"
                  size="large"
                  text="signin_with"
                  logo_alignment="left"
                  width="100%"
                />
      )}
    </div>
    <div>
      {userProfilePicture && (
        <img src={userProfilePicture} alt="User Profile" />
      )}
    </div>
  </div>
</div>
                  {/* <div className="col-12 text-center">
                    <div className="loginBox">
                      <button className="facebook social-btn py-2 w-full text-center border rounded flex items-center justify-center">
                        <FaFacebook className="text-blue-500 mr-2 w-6 h-6" />
                        <span className="font-semibold text-lg">
                          Continue with Facebook
                        </span>
                      </button>
                      <button className="google social-btn py-2 w-full text-center border rounded flex items-center justify-center mt-2">
                        <FcGoogle className="mr-2 w-6 h-6" />
                        <span className="font-semibold text-lg">
                          Continue with Google

                        </span>
                      </button>
                      
                      <button className="apple social-btn py-2 w-full text-center border rounded flex items-center justify-center mt-2">
                        <FaApple className="mr-2 w-6 h-6" />
                        <span className="font-semibold text-lg">
                          Continue with Apple
                        </span>
                      </button>
                    </div>
                  </div> */}
                </div>
                <p className="text-center">
                  By continuing, you agree to Hometex's{' '}
                  <a href="#" className="underline">
                    Terms of Use
                  </a>{' '}
                  &{' '}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="text-center py-3">
            <p>Hometex Bangladesh</p>
          </div>
        </div>
      </div>
    </div>
    </GoogleOAuthProvider>

  );
};

export default LoginPopUp;
