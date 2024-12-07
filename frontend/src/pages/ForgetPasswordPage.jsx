import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { apiStart } from "../../api";
import logo from "/logo.svg";

const ForgetPasswordPage = () => {
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    setToken(token);

    if (token) {
      setMessage("Please enter your new password.");
    } else {
      setMessage("Please enter your email to receive the password reset link.");
    }
  }, [location]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`${apiStart}/api/user/reset-password`, {
        token,
        password,
      });
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message : "Password reset failed"
      );
    }
  };

  const handleSendResetLink = async () => {
    try {
      const response = await axios.post(
        `${apiStart}/api/user/send-forget-password`,
        { email }
      );
      setMessage("Password reset link sent. Please check your email.");
    } catch (error) {
      setMessage(
        error.response
          ? error.response.data.message
          : "Failed to send reset link"
      );
    }
  };

  return (
    <div className="flex h-screen flex-col bg-slate-200">
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-xl px-16 py-32 text-center m-2 rounded-xl shadow-2xl bg-white">
          <a href="/">
            <img src={logo} alt="logo" className="h-12 w-auto mx-auto mb-6" />
          </a>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Forget Password
          </h1>
          {message && (
            <p className="mt-4 text-center text-gray-700">{message}</p>
          )}
          {token ? (
            <div>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={handlePasswordChange}
                className="mt-4 w-full px-4 py-2 border rounded"
              />
              <button
                className="mt-6 inline-block rounded bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          ) : (
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className="mt-4 w-full px-4 py-2 border rounded"
              />
              <button
                className="mt-6 inline-block rounded bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring"
                onClick={handleSendResetLink}
              >
                Send Reset Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
