import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!adminId) {
        toast.error("Please enter your AdminId");
        return;
    }
    if (!password) {
        toast.error("Please enter your password");
        return;
    }

    try {
        const response = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ adminId, password }),
        });
        if (response.ok) {
            const data = await response.json();
            toast.success("Login Successful!");
            console.log("Server Response:", data);
            localStorage.setItem("Token:",data.token);
            setAdminId("");
            setPassword("");
        } else if (response.status === 401) {
            toast.error("Invalid AdminId or Password. Please try again.");
        } else {
            toast.error("Something went wrong. Please try again later.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        toast.error("Failed to connect to the server. Please check your network.");
    }
};


  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css?family=Exo:400,700');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Exo', sans-serif; margin: 0; padding: 0; }
        .area { 
            background:#62b4e7;
            background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
            width: 100%; min-height: 100vh; position: absolute;
            top: 0; left: 0; bottom:0; z-index: 0; overflow: hidden; 
        }

        .circles { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; }
        .circles li { position: absolute; display: block; list-style: none; width: 20px; height: 20px; background: rgba(71, 92, 233, 0.2); animation: animate 25s linear infinite; bottom: -150px; border-radius: 50%; }
        .circles li:nth-child(1) { left: 25%; width: 80px; height: 80px; animation-delay: 2s; }
        .circles li:nth-child(2) { left: 10%; width: 40px; height: 40px; animation-delay: 2s; animation-duration: 8s; }
        .circles li:nth-child(3) { left: 70%; width: 20px; height: 20px; animation-delay: 4s; }
        .circles li:nth-child(4) { left: 40%; width: 60px; height: 60px; animation-delay: 0s; animation-duration: 8s; }
        .circles li:nth-child(5) { left: 65%; width: 20px; height: 20px; animation-delay: 0s; }
        .circles li:nth-child(6) { left: 75%; width: 110px; height: 110px; animation-delay: 3s; }
        .circles li:nth-child(7) { left: 35%; width: 150px; height: 150px; animation-delay: 7s; }
        .circles li:nth-child(8) { left: 50%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 30s; }
        .circles li:nth-child(9) { left: 20%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 25s; }
        .circles li:nth-child(10) { left: 85%; width: 150px; height: 150px; animation-delay: 0s; animation-duration: 7s; }
        @keyframes animate { 
            0% { transform: translateY(0) rotate(0deg); opacity: 1; border-radius: 0; } 
            100% { transform: translateY(-1000px) rotate(720deg); opacity: 0; border-radius: 50%; }
        }
        .login-container { position: relative; z-index: 10; display: flex; justify-content: center; align-items: center; height: 100vh; }
        .password-wrapper { position: relative; width: 100%; }
        .toggle-visibility {
            position: absolute;
            top: 50%; right: 1rem;
            transform: translateY(-50%);
            cursor: pointer;
        }
        .login-form { 
            background-color: white; padding: 2rem; border-radius: 8px; 
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
            display: flex; flex-direction: column; justify-content: center; 
            align-items: center; width: 100%; max-width: 500px; z-index: 50; 
        }
      `}
      </style>

      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="login-container">
        <div className="bg-white p-8 bg-opacity-20 rounded-lg shadow-lg w-3xl max-w-4xl flex flex-col md:flex-row relative z-10 bounce-in-top">
          <div className="md:w-1/2 flex items-center justify-center p-1 mt-3">
            <img
              alt="An illustration of event management with people organizing and attending an event"
              className="rounded-lg"
              height="400"
              src="cricket.jpeg"
              width="400"
            />
          </div>
          <div className="md:w-1/2 p-4 flex flex-col justify-center">
            <form onSubmit={handleSubmit}>
              <fieldset className="h-full flex flex-col justify-center">
                <div className="mb-4">
                  <label className="block text-white font-semibold mb-2" htmlFor="adminId">
                    AdminId
                  </label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                    id="adminId"
                    name="adminId"
                    placeholder="Enter your Id"
                    required
                    type="text"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                  />
                </div>
                <div className="mb-6 password-wrapper">
                  <label className="block text-white font-semibold mb-2" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      required
                      type={passwordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="toggle-visibility text-white absolute right-5 text-xl"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? "🐵" : "🙈"}
                    </span>
                  </div>
                </div>
                <button
                  className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white p-3 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition-all duration-300"
                  type="submit"
                >
                  Login
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
