// components/LoginPopup.js
import React from 'react';
import { FaTimes, FaFacebook, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const signInSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const response = await fetch(Constants.BASE_URL + "/api/user-signup", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(signInData),
    });
    let res = await response.json();

    if (res.status == "400") {
      let err_list = {};
      for (const [key, value] of Object.entries(res.error))
        err_list[key] = value[0];
      setSignInErr(err_list);
      setIsSubmit(false);
    } else if (res.status == "200") {
      setIsSubmit(false);
      setSignInErr({});
      setCookie("home_text_token", res?.token);
      window.location.href = "/";
    }
  };

  
const LoginPopup = ({
  showPopup,
  togglePopup,
  signInData,
  signInErr,
  handleSignIn,
  signInSubmitHandler,
  regData,
  err,
  showWarning,
  handleChangeRegistration,
  regSubmit,
  isSubmit,
}) => {
  if (!showPopup) return null;

  return (
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
                        className="px-2 py-3"
                      />

                      <div
                        data-lastpass-icon-root="true"
                        style={{
                          position: 'relative !important',
                          height: '0px !important',
                          width: '0px !important',
                          float: 'left !important',
                        }}
                      ></div>
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
                        className="px-2 py-3"
                      />

                      <div
                        data-lastpass-icon-root="true"
                        style={{
                          position: 'relative !important',
                          height: '0px !important',
                          width: '0px !important',
                          float: 'left !important',
                        }}
                      ></div>
                    </div>
                    <p className="has_error"> {signInErr?.password} </p>
                  </div>

                  <div className="secondary ft-link-p text-right py-2">
                    <a className="action remind" href="">
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
                      id="nme"
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      value={regData?.first_name || ''}
                      onChange={handleChangeRegistration}
                    />
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="nme"
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
                      onClick={regSubmit}
                      id="so-checkout-confirm-button"
                      className="w-full my-3 px-4 py-3 bg-[#9eb7f3] hover:bg-teal-700 text-white text-md font-bold rounded-xl"
                    >
                      {isSubmit ? 'Processing..' : 'Continue'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center py-3">
              <div className="flex-grow border-t border-gray-200"></div>
              <p className="px-4 text-gray-300">or continue with</p>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="flex gap-3 flex-col sm:flex-row justify-between items-center py-5">
              <div className="w-full rounded-xl flex gap-12 text-2xl items-center px-5 py-3 bg-blue-600 text-white">
                <FaFacebook /> Facebook
              </div>
              <div className="w-full rounded-xl flex gap-12 text-2xl items-center px-5 py-3 bg-white border">
                <FcGoogle /> Google
              </div>
              <div className="w-full rounded-xl flex gap-12 text-2xl items-center px-5 py-3 bg-black text-white">
                <FaApple /> Apple
              </div>
            </div>

            <div className="py-5">
              <p className="text-sm text-center">
                By clicking &apos;Login&apos;, &apos;Sign up&apos;, &apos;Facebook&apos;, &apos;Google&apos; or &apos;Apple&apos; you agree to the wish terms of Use and Privacy Policy. This site is protected by reCAPTCHA and the google Privacy Policy and Terms of Service apply
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
