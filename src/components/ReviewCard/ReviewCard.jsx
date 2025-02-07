import React from 'react'

const ReviewCard = ({ reviews }) => {
    return (
        <div className="space-y-4">
            {reviews.map((review, index) => (
                <div
                    key={index}
                    className="bg-white shadow-md rounded-lg px-8 py-[14px]"
                >
                    <div className='flex items-start gap-4'>
                        {/* Profile Image */}
                        <img
                            src={review.image}
                            alt={review.name}
                            className="w-[40px] h-[40px] rounded-full object-cover"
                        />

                        <div className="flex flex-1 justify-between">
                            {/* Review Content */}
                            <div className="">
                                <h3 className="font-semibold text-xl">{review.name}</h3>
                                {/* Rating */}
                                <div className="flex items-center text-[#7C7C7C] text-sm">
                                    {review.rating}.0 ⭐
                                </div>

                            </div>
                            <span className="text-gray-400 text-sm">{review.date}</span>
                        </div>

                    </div>
                    {/* Review Text */}
                    <p className="text-gray-600 text-sm mt-2">
                        {review.text}
                    </p>

                </div>
            ))}
        </div>
    );
};

export default React.memo(ReviewCard);

