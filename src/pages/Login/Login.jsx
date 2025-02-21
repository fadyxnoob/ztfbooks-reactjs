import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux"; // Import useDispatch
import { authLogin } from "../../Store/authSlice"; // Import the login action
import image from "../../assets/images/login.png";
import Input from "../../components/Input/Input";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import GoogleButton from "../../components/GoogleButton/GoogleButton";
import AppleButton from "../../components/AppleButton/AppleButton";
import authService from "../../API/authService";
import { setLocalStorage } from "../../LocalStorage/LocalStorage";
import Alert from "../../components/Alert/Alert";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to show alert
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 2000); // Hide after 2 seconds
  };

  const onSubmit = async (data) => {
    try {
      const session = await authService.login(data);
      if (!session?.data) {
        throw new Error("Invalid session data received from the server.");
      }
      dispatch(authLogin({ userdata: session?.data?.jwt }));
      setLocalStorage("authUserStatus", true);
      setLocalStorage("userdata", session?.data);
      showAlert("success", session?.message);
      setTimeout(() => {
        navigate("/");
        setAlert(null)
      }, 1000);
      
    } catch (error) {
      console.error("Login failed:", error);
      showAlert("error", error.response.data.message);
    }
  };

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="bg-[#F6F7F8F9] lg:px-[80px] md:px-8 px-4 flex items-start">
        <div className="hidden md:block md:w-[40%] h-screen sticky top-0">
          <img
            src={image}
            alt="Signup"
            className="w-full min-h-screen object-cover"
          />
        </div>

        <div className="bg-white px-4 py-8 md:px-8 lg:px-[130px] lg:py-[150px] w-full md:w-[60%] min-h-screen flex justify-center items-center flex-col">
          <h1 className="text-[#01447E] text-2xl lg:text-3xl font-extralight text-center">
            WELCOME TO
          </h1>
          <span className="text-[#01447E] mt-4 font-semibold text-4xl lg:text-5xl">
            ZTF Books
          </span>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-[570px] mt-8 lg:mt-16"
          >
            <div className="mb-6 lg:mb-8">
              <label className="text-[#4D5959] text-lg lg:text-[20px] font-medium">
                Username
              </label>
              <Input
                type="text"
                placeholder="Enter username here"
                classes="bg-[#EFF0F2] w-full mt-2 p-4 lg:p-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01447E] placeholder:text-base lg:placeholder:text-xl"
                inputRegister={register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="mb-6 lg:mb-8">
              <label className="text-[#4D5959] text-lg lg:text-[20px] font-medium">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your Password"
                classes="bg-[#EFF0F2] w-full mt-2 p-4 lg:p-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01447E] placeholder:text-base lg:placeholder:text-xl"
                inputRegister={register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Link
              className="text-base lg:text-[18px] text-[#01447E] leading-relaxed"
              to={"/forgot-password"}
            >
              Forgot Password?
            </Link>

            <PrimaryButton
              classes="border-2 mt-6 lg:mt-8 text-lg lg:text-[20px]"
              type="submit"
            >
              Submit
            </PrimaryButton>

            <div className="mt-4">
              <Link
                className="text-base lg:text-[18px] text-[#01447E]"
                to={"/signup"}
              >
                Don't have an account?{" "}
                <span className="font-medium leading-relaxed">Sign Up</span>
              </Link>
            </div>
          </form>

          <div className="text-2xl lg:text-3xl text-[#043133] font-medium mt-6 lg:mt-8 mb-4">
            OR
          </div>
          <div className="mt-6 lg:mt-8 w-full mb-2">
            <div className="flex flex-col md:flex-row sm:flex-col gap-4 md:gap-6 w-full mx-auto">
              <div className="flex-1">
                <GoogleButton
                  onGoogleAuth={authService.loginWithGoogle}
                  actionType="Log in"
                />
                ;
              </div>
              <div className="flex-1">
                <Link>
                  <AppleButton />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
