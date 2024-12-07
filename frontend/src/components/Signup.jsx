import React, { useState } from "react";
import axios from "axios";
import { apiStart } from "../../api";
import { useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import { toast } from "react-hot-toast";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSignUpInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, passwordConfirmation } = signUpInfo;
    console.log(username, email, password, passwordConfirmation);
    if (
      username.length &&
      email.length &&
      password.length &&
      passwordConfirmation.length &&
      password === passwordConfirmation
    ) {
      //api call

      try {
        setIsLoading(true);
        console.log(signUpInfo);
        const response = await axios.post(`${apiStart}/api/user/create`, {
          username,
          email,
          password,
        });
        console.log(response.data);
        if (response.data.success) {
          toast.success(`${username}, your account is successfully created.`);
          navigate("/login");
        }

        // navigate("/verify-email");
      } catch (error) {
        console.log(error.message || "Error creating user");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Passwords doesn't match confirm password");
    }
  };

  return (
    <section>
      {/* <a href="/" className="fixed right-0 top-0 flex z-40">
        <h1 className="my-auto h-full">🡐 HOME</h1>
        <img src={logo} className="h-12 my-6 mx-8" alt="logo" />
      </a> */}
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 z-10">
        <section className="relative flex h-32 items-end lg:bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1566836986583-94da6d4c6c67?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover opacity-0 lg:opacity-85 pointer-events-none"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Cookbook!
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              We're excited to have you join our community. Sign up below to get
              started and explore all the amazing features we have to offer.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 z-30">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block ">
              <h1 className="mt-2 text-3xl text-center font-bold text-gray-800">
                Create an account
              </h1>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-12 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  value={signUpInfo.username}
                  placeholder="Enter your Username"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  required
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  onChange={handleChange}
                  value={signUpInfo.email}
                  placeholder="Enter your Email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="Password"
                    name="password"
                    value={signUpInfo.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    required
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password Confirmation
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="PasswordConfirmation"
                    name="passwordConfirmation"
                    value={signUpInfo.passwordConfirmation}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    required
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
              </div>

              <div className="col-span-6 flex flex-col items-start gap-4">
                <button
                  disabled={isLoading}
                  className="mt-2 inline-block shrink-0 rounded-md border border-teal-600 bg-teal-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-teal-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  {isLoading ? "Loading..." : "Create an account"}
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a href="Login" className="text-gray-700 underline">
                    Log in
                  </a>
                  .
                </p>
              </div>
              {/* <h1 className="text-red-700">{response.message}</h1> */}
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Signup;
