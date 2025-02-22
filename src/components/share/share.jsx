import React, { useState } from "react";
import { MessageCircle, Facebook, MessageSquare, Link, X } from "lucide-react";

const SharePopup = ({ onClose, shareUrl }) => {
  // Function to copy the link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-100  z-[999] ">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Share this</h2>
          <button className="text-gray-600 hover:text-gray-800" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="flex justify-around">
          {/* WhatsApp Share */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-gray-600 hover:text-gray-800"
          >
            <MessageCircle className="w-8 h-8" />
            <span className="mt-2 text-sm">WhatsApp</span>
          </a>

          {/* Facebook Share */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-gray-600 hover:text-gray-800"
          >
            <Facebook className="w-8 h-8" />
            <span className="mt-2 text-sm">Facebook</span>
          </a>

          {/* Message (SMS) Share */}
          <a
            href={`sms:?body=${encodeURIComponent(shareUrl)}`}
            className="flex flex-col items-center text-gray-600 hover:text-gray-800"
          >
            <MessageSquare className="w-8 h-8" />
            <span className="mt-2 text-sm">Text</span>
          </a>

          {/* Copy Link */}
          <button
            onClick={copyToClipboard}
            className="flex flex-col items-center text-gray-600 hover:text-gray-800"
          >
            <Link className="w-8 h-8" />
            <span className="mt-2 text-sm">Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Set your shareable URL here
  const shareUrl = window.location.href; // Gets the current page URL

  return (
    <div className="flex flex-col items-center mt-1 ">
      <button className="  hover:bg-gray-300" onClick={() => setIsOpen(true)}>
        <Link className="text-[#203949] w-5 h-5" />
      </button>
      {isOpen && <SharePopup onClose={() => setIsOpen(false)} shareUrl={shareUrl} />}
    </div>
  );
};

export default ShareButton;
