import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { apiStart } from "../../api";
import logo from "/reshot-icon-cooking-book-ZMGQ6L3CVN.svg";

const VerifyEmailPage = () => {
  const [message, setMessage] = useState("Loading...");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    const verifyEmail = async (token) => {
      try {
        const response = await axios.get(`${apiStart}/api/user/verify-email`, {
          params: { token },
        });
        setMessage(response.data);
      } catch (error) {
        setMessage(
          error.response ? error.response.data : "Verification failed"
        );
      }
    };

    const checkUserStatus = async () => {
      const Vertoken = localStorage.getItem("loginToken");

      if (Vertoken) {
        try {
          const response = await axios.get(`${apiStart}/api/user/my`, {
            headers: { Authorization: `Bearer ${Vertoken}` },
          });
          setIsLoggedIn(true);
          setIsVerified(response.data.data.isVerified);
          setMessage(
            `User is ${
              response.data.data.isVerified ? "verified" : "not verified"
            }`
          );
        } catch (error) {
          setIsLoggedIn(false);
          setIsVerified(false);
          setMessage("Please log in to verify your email");
        }
      } else {
        setIsLoggedIn(false);
        setIsVerified(false);
        setMessage("Please log in to verify your email");
      }
    };

    if (token) {
      verifyEmail(token);
      // navigate("/");
    } else {
      checkUserStatus();
    }
  }, [location, navigate]);

  const handleSendVerificationEmail = async () => {
    const Vertoken = localStorage.getItem("loginToken");
    try {
      await axios.get(`${apiStart}/api/user/send-verify-email`, {
        headers: {
          Authorization: `Bearer ${Vertoken}`,
        },
      });
      setMessage("Verification email sent. Please check your inbox.");
    } catch (error) {
      setMessage("Failed to send verification email. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-200">
      {/* <img
        src="https://plus.unsplash.com/premium_photo-1671377387797-8d3307a546a6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="h-64 w-full object-cover"
      /> */}

      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-xl px-16 py-32 text-center m-2 rounded-xl shadow-2xl bg-white">
          <a href="/">
            <img src={logo} alt="logo" className="h-12 w-auto mx-auto mb-6" />
          </a>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Verify Email
          </h1>
          {/* <h1 className='text-xl font-bold'>Veridfy Email</h1> */}
          {message && <p>{message}</p>}
          {!isLoggedIn && (
            <div>
              <p className="mt-4 text-gray-500 font-mono">
                Please log in to verify your email
              </p>
              <a
                href="/login"
                className="mt-6 inline-block rounded bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring"
              >
                Login
              </a>
            </div>
          )}
          {isLoggedIn && isVerified && (
            <div>
              <p className="mt-4 text-gray-500 font-mono">
                Your email is verified.
              </p>
              <a
                href="/"
                className="mt-6 inline-block rounded bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring"
              >
                Go Home
              </a>
            </div>
          )}
          {isLoggedIn && !isVerified && (
            <div>
              <p className="mt-4 font-mono text-gray-600">
                Your email is not verified.
              </p>
              <button
                className="mt-6 inline-block rounded bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring "
                onClick={handleSendVerificationEmail}
              >
                Verify Email
              </button>
            </div>
          )}
{/*           
          <p className="mt-4 text-gray-500">
            Try searching again, or return home to start from the beginning.
          </p>

          <a
            href="#"
            className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Go Back Home
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
