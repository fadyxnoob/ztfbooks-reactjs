import React from 'react'

const PreferenceButton = ({ icon, label, selected, onClick, ...props }) => {
    return (
      <button
        onClick={onClick}
        {...props}
        className={` cursor-pointer bg-white flex items-center justify-between w-full px-4 py-3 rounded-lg mb-4 border-gray-200 rounded-xl`}
      >
        <div className="flex items-center gap-3">
          {icon}
        </div>
        <span className="text-xl text-[#000] sm:text-lg">{label}</span>
        {selected !== undefined && (
          <div
            className={`w-4 h-4 rounded-full border ${
              selected ? "border-4 border-[#014471]-600" : "border-gray-300"
            }`}
          />
        )}
      </button>
    );
  };

export default PreferenceButton
