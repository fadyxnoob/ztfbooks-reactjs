import React, { useState } from "react";
import DOMPurify from "dompurify";

const Description = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Sanitize description
  const cleanDescription = DOMPurify.sanitize(description || "");

  // Convert HTML to text for word count
  const tempElement = document.createElement("div");
  tempElement.innerHTML = cleanDescription;
  const plainText = tempElement.textContent || tempElement.innerText || "";

  // Get half of the text
  const halfLength = Math.ceil(plainText.length / 2);
  const shortText = plainText.slice(0, halfLength) + "...";

  return (
    <div className="my-5">
      <h2 className="text-[#333333] text-xl font-medium">Description</h2>
      <p
        className="mt-2 text-[#203949] font-medium"
        dangerouslySetInnerHTML={{
          __html: isExpanded ? cleanDescription : shortText,
        }}
      />
      {plainText.length > halfLength && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 cursor-pointer font-medium mt-2"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};



export default React.memo(Description)