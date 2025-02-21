import React, { useEffect, useState } from "react";
import { FiEdit2, FiGlobe } from "react-icons/fi";
import { BsCreditCard } from "react-icons/bs";
import { TbPhotoPlus } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import authService from "../../API/authService";
import { useForm } from "react-hook-form";
import service from "../../API/DBService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";

const Input = ({
  name,
  type = "text",
  classes = "",
  placeholder,
  children,
  inputRegister,
  label = false,
  ...props
}) => {
  return (
    <div className="relative w-full">
      <input
        {...inputRegister}
        type={type}
        placeholder={placeholder}
        className={classes}
        {...props}
      />
      {children && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {children}
        </div>
      )}
    </div>
  );
};

const PreferenceButton = ({ icon, label, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer bg-white flex items-center justify-between w-full px-4 py-3 rounded-lg mb-4 border-gray-200 rounded-xl`}
    >
      <div className="flex items-center gap-3">{icon}</div>
      <span className="text-xl text-[#000] sm:text-lg">{label}</span>
      <div
        className={`w-4 h-4 rounded-full border ${
          selected ? "border-4 border-[#014471]-600" : "border-gray-300"
        }`}
      />
    </button>
  );
};

const AccountInfo = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = React.useState("French");
  const [selectedPayment, setSelectedPayment] = React.useState(
    "Debit / Credit Card"
  );
  const isLogin = useSelector((state) => state.auth.status);

  const [userInfo, setUserInfo] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [alert, setAlert] = useState(null);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
    const getUserInfo = async () => {
      const res = await authService.getCurrentLoggedIn();
      console.log(res.image)
      setUserInfo(res);
      setValue("name", res?.user?.name);
      setValue("email", res?.user?.email);
      setValue(
        "phoneNumber",
        res?.contactDetails?.phoneNumber || "Not Available"
      );

      setValue(
        "physicalAddress",
        res?.contactDetails?.physicalAddress || "Location not available"
      );
      setValue("gender", res?.user?.gender || "Not specified");

      const imageUrl = await service.getFileByName(res?.image);
      console.log({imageUrl})
      setImageUrl(imageUrl || image);
    };

    getUserInfo();
  }, [setValue]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to show alert
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 2000); 
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = userInfo?.image || "";

      if (image) {
        const uploadResponse = await service.uploadFile(image);
        imageUrl = uploadResponse?.name || "";
      }

      const userID = userInfo?.id;

      const res = await authService.updateUser(userID, {
        ...data,
        image: imageUrl,
      });
      // console.log("Updated user info:", res);
      setUserInfo(res);
      showAlert('success', 'User Updated Successfully')
    } catch (error) {
      console.error("Error updating user info:", error);
      showAlert('error', 'Failed to update user.')
    }
  };

  const inputClass =
    "w-full p-4 rounded-lg border border-none bg-[#fff] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none";

  return (
    <>
    {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="bg-[#F6F7F8] mx-auto px-4 sm:px-6 md:px-[80px] pt-[40px] sm:pt-[60px] md:pt-[80px]">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold mb-8 sm:mb-10 md:mb-12 text-[#203949]">
          Account Information
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 pb-[3rem] sm:pb-[4rem] md:pb-[6rem] p-4 sm:p-[16px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="flex justify-center mb-6 sm:mb-7 md:mb-8">
                <div className="relative">
                  <img
                    src={
                      imageUrl ||
                      image ||
                      "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?ga=GA1.1.1799393695.1726636772&semt=ais_hybrid"
                    }
                    alt="Profile"
                    className="w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full object-cover"
                  />
                  <label
                    htmlFor="file-input"
                    className="absolute bottom-0 right-0 bg-[#D9D9D9] p-1.5 sm:p-2 rounded-full shadow-sm cursor-pointer"
                  >
                    <TbPhotoPlus
                      color="#000000"
                      className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600"
                    />
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange} // Ensure this function is handling image upload logic
                  />
                </div>
              </div>

              {[
                { label: "Name", field: "name" },
                { label: "Email", field: "email" },
                { label: "Phone", field: "phoneNumber" },
                { label: "Location", field: "physicalAddress" },
                { label: "Gender", field: "gender" },
              ].map(({ label, field }) => (
                <div className="relative" key={label}>
                  <FiEdit2 className="absolute right-2 sm:right-3 md:right-4 top-1/2 w-4 h-4 text-[#333333]" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      {label}
                    </label>
                    <Input
                      inputRegister={register(field)}
                      classes={inputClass}
                      placeholder={label}
                      defaultValue={userInfo?.[field] || ""} // Set default value
                    />
                  </div>
                </div>
              ))}

              <div className="w-full sm:w-[60%] md:w-[40%] mx-auto">
                <button
                  className={
                    "cursor-pointer mt-8 sm:mt-12 md:mt-[4rem] w-full bg-[#01447E] text-[#D2D2D2] py-2.5 sm:py-3 px-3 sm:px-4 rounded-md hover:bg-blue-900 transition-colors"
                  }
                  type="submit"
                >
                  Save Information
                </button>
              </div>
            </div>
          </form>
          <div className="space-y-4 sm:space-y-5 md:space-y-6 mt-8 md:mt-0">
            <div>
              <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                Language Preferences
              </h2>
              <div className="mb-4">
                <button className="bg-white mb-3 sm:mb-4 w-full flex items-center justify-start px-3 sm:px-4 py-3 sm:py-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    <FiGlobe className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    <span className="text-sm sm:text-base">
                      Select Language
                    </span>
                  </div>
                  <IoIosArrowDown className="ml-2 sm:ml-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </button>
                <PreferenceButton
                  icon={
                    <img
                      src="https://flagpedia.net/data/flags/w580/pf.webp"
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-500 rounded-full"
                    />
                  }
                  label="French"
                  selected={selectedLanguage === "French"}
                  onClick={() => setSelectedLanguage("French")}
                />
                <PreferenceButton
                  icon={
                    <img
                      src="https://flagpedia.net/data/flags/w580/us.webp"
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-500 rounded-full"
                    />
                  }
                  label="USA"
                  selected={selectedLanguage === "USA"}
                  onClick={() => setSelectedLanguage("USA")}
                />
                <PreferenceButton
                  icon={
                    <img
                      src="https://flagpedia.net/data/flags/w580/au.webp"
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-500 rounded-full"
                    />
                  }
                  label="Australia"
                  selected={selectedLanguage === "Australia"}
                  onClick={() => setSelectedLanguage("Australia")}
                />
              </div>
            </div>

            <div className="mt-8 sm:mt-12 md:mt-[4rem]">
              <h2 className="text-base sm:text-lg font-medium mb-2 text-bold text-[#333333]">
                Manage Payments
              </h2>
              <p className="text-base sm:text-[1.1rem] text-[#333333] mb-4 sm:mb-6">
                Manage your saved payment options
              </p>
              <PreferenceButton
                icon={
                  <BsCreditCard className="w-8 h-6 sm:w-9 sm:h-7 md:w-10 md:h-8 text-[#014471]" />
                }
                label="Debit / Credit Card"
                selected={selectedPayment === "Debit / Credit Card"}
                onClick={() => setSelectedPayment("Debit / Credit Card")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(AccountInfo);
