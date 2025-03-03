import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({ onGoogleAuth, actionType = "Sign up" }) => {
  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      window.opener = null;
      try {
        await onGoogleAuth(tokenResponse.access_token);
        console.log(`${actionType} successful!`);
      } catch (error) {
        console.error(`${actionType} failed:`, error.message);
      }
    },
    onError: (error) => console.error("Google Authentication Failed", error),
  });

  return (
    <button
      onClick={handleGoogleAuth}
      className="flex items-center justify-start gap-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-[#043133] font-medium text-lg hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <FcGoogle size={55} />
      <span>{actionType} with Google</span>
    </button>
  );
};

export default React.memo(GoogleButton);
