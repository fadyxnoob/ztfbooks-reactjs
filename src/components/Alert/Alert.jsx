import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

const Alert = ({ type, message, duration = 3000, onClose }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        let startTime = Date.now();
        let interval = setInterval(() => {
            let elapsed = Date.now() - startTime;
            let percentage = Math.max(0, 100 - (elapsed / duration) * 100);
            setProgress(percentage);

            if (percentage === 0) {
                clearInterval(interval);
                onClose(); 
            }
        }, 30); 

        return () => clearInterval(interval);
    }, [duration, onClose]);

    return (
        <div className="fixed top-0 right-0 z-50 bg-white shadow-lg rounded-lg px-4 py-3 w-72 flex items-center gap-3 border-l-4
            text-gray-900 border-opacity-80"
            style={{ borderColor: type === "success" ? "#22c55e" : "#ef4444" }}
        >
            {type === "success" ? (
                <CheckCircle size={24} className="text-green-500" />
            ) : (
                <AlertCircle size={24} className="text-red-500" />
            )}
            <div className="flex-1">
                <p className="font-semibold">{type === "success" ? "Success" : "Error"}</p>
                <p className="text-sm">{message}</p>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-black font-semibold text-2xl cursor-pointer">x</button>

            {/* Bottom Progress Line (Smoothly moves from 100% → 0%) */}
            <div className="absolute bottom-0 left-0 h-[3px] bg-gray-300 w-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-[30ms]" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

export default Alert;
