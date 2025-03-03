import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/images/login.png";
import Input from "../../components/Input/Input";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import GoogleButton from "../../components/GoogleButton/GoogleButton";
import AppleButton from "../../components/AppleButton/AppleButton";
import authService from "../../API/authService";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      subscribeToNewsletter: true,
      username: `${data.name.replace(/\s+/g, "").toLowerCase()}123`, // Remove all whitespaces and convert to lowercase
    };
    const res = await authService.signup(newData);
    if (res) {
      navigate("/login");
    }
  };

  return (
    <div className="bg-[#F6F7F8F9] lg:px-[80px] md:px-8 px-4 flex items-start h-screen">
      <div className="hidden md:block md:w-[40%] h-screen sticky top-0">
        <img src={image} alt="Signup" className="w-full h-screen object-fill" />
      </div>

      <div className="bg-white px-4 md:px-8 lg:px-[130px] py-2 w-full md:w-[60%] flex justify-center items-center flex-col">
        <h1 className="text-[#01447E] text-xl text-center">
          <Link
          to={'/'}
          >
            WELCOME TO
            <span className="text-[#01447E] mt-2 font-semibold text-3xl">
              ZTF Books
            </span>
          </Link>
        </h1>


        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
        >
          <div className="mb-2">
            <label className="text-[#4D5959] text-lg font-medium">
              Name
            </label>
            <Input
              type="text"
              placeholder="Enter your Fullname here"
              classes="bg-[#EFF0F2] w-full p-3 rounded-lg focus:outline-none placeholder:text-base"
              inputRegister={register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="text-[#4D5959] text-lg font-medium">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your Email here"
              classes="bg-[#EFF0F2] w-full p-3 rounded-lg focus:outline-none placeholder:text-base"
              inputRegister={register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="text-[#4D5959] text-lg lg:text-[20px] font-medium">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your Password"
              classes="bg-[#EFF0F2] w-full p-3 rounded-lg focus:outline-none placeholder:text-base"
              inputRegister={register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-2">
            <label className="text-[#4D5959] text-lg lg:text-[20px] font-medium">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="Enter your Password"
              classes="bg-[#EFF0F2] w-full p-3 rounded-lg focus:outline-none placeholder:text-base"
              inputRegister={register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Your passwords do not match";
                  }
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <p className="text-sm">
            <b>Note</b>: Your username will be your name in lowercase and
            includes(123)
          </p>

          <PrimaryButton
            classes="py-3 mt-2"
            type="submit"
          >
            Submit
          </PrimaryButton>

          <div className="mt-2">
            <Link
              className="text-base text-[#01447E] leading-relaxed"
              to={"/login"}
            >
              Already have an account?{" "}
              <span className="font-medium leading-relaxed">Sign In </span> <span className="text-black text-xl">OR</span>
            </Link>
          </div>
        </form>
        <div className="mt-3">
          <div className="flex flex-col md:flex-row sm:flex-col gap-4 md:gap-6 w-full mx-auto">
            <div className="flex-1">
              <GoogleButton
                onGoogleAuth={authService.signUpWithGoogle}
                actionType="Sign up"
              />
              ;
            </div>
            <div className="flex-1">
              <AppleButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
