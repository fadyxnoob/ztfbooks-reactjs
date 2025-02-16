import React from 'react'
import DOMPurify from 'dompurify'; // For sanitizing HTML


const FaqItem = ({ faq, isOpen, onToggle }) => {
    const { id, question, answer } = faq;

    return (
        <div className="divide-y divide-gray-100 border-b border-[#DFDFDF]">
            <details
                className="group"
                open={isOpen}
                onClick={(e) => {
                    e.preventDefault(); // Prevent default behavior
                    onToggle(id); // Toggle the FAQ
                }}
            >
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-medium text-[#333333] group-open:text-primary-500">
                    {question}
                    <ToggleIcon isOpen={isOpen} />
                </summary>
                <div
                    className="pb-4 text-[#7C7C7C] text-lg font-normal"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer) }} // Render HTML content
                />
            </details>
        </div>
    );
};

// Toggle Icon Component (Extracted for better readability and reusability)
const ToggleIcon = ({ isOpen }) => (
    <div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`h-5 w-5 ${isOpen ? 'hidden' : 'block'}`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`h-5 w-5 ${isOpen ? 'block' : 'hidden'}`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
    </div>
);

export default React.memo(FaqItem)