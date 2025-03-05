import React, { useState, useEffect } from "react";
import service from "../../API/DBService";
import FaqItem from "../../components/FaqItem/FaqItem";

const Faqs = () => {
  const [allFaqs, setAllFaqs] = useState([]);
  const [openFaqId, setOpenFaqId] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const apiKey = import.meta.env.VITE_SWAGGER_ALL_FAQS_API

  // Fetch FAQs on component mount
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await service.getAllFaqs(apiKey);
        console.log(res.data)
        if (Array.isArray(res.data)) {
          setAllFaqs(res.data);
        } else {
          console.warn("Unexpected API response format:", res);
          setAllFaqs([]); 
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setError("Failed to load FAQs. Please try again later.");
        setAllFaqs([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const handleFaqToggle = (id) => {
    setOpenFaqId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="px-5 md:px-20 py-5 bg-[#f4f3f4] min-h-screen">
      {/* Header */}
      <h1 className="bg-[#F7F8F8] my-3 p-3 rounded-xl text-[#203949] text-3xl font-medium">
        FAQs - Help Center: Frequently Asked Questions
      </h1>
      <h4 className="text-[#203949] text-2xl text-center md:text-start font-semibold">
        Customers Frequently Asked Questions
      </h4>

      {/* Loading & Error Handling */}
      {loading ? (
        <p className="text-center text-gray-600 mt-5">Loading FAQs...</p>
      ) : error ? (
        <p className="text-center text-red-600 mt-5">{error}</p>
      ) : (
        // FAQ List
        <section className="mt-5 bg-[#F7F8F8] p-5 rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <div className="mx-auto">
            {allFaqs.length > 0 ? (
              allFaqs.map((faq) => (
                <FaqItem
                  key={faq?.id}
                  faq={faq}
                  isOpen={openFaqId === faq?.id}
                  onToggle={handleFaqToggle}
                />
              ))
            ) : (
              <p className="text-center text-gray-600">No FAQs available.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default React.memo(Faqs);
