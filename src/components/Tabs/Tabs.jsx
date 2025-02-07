import React, { useState } from 'react';
import HorizontalCard from '../HorizontalCard/HorizontalCard'
import BookCoverImage from '../../assets/images/BookCoverImage.png'
const Tabs = () => {
    const [activeTab, setActiveTab] = useState('bestSelling');

    const books = [
        {
            image: BookCoverImage,
            title: "Human Soul",
            rating: "5.0",
            author: "James Hook",
            duration: "45 min",
            category: "Audiobook",
        },
        {
            image: BookCoverImage,
            title: "Human Soul",
            rating: "5.0",
            author: "James Hook",
            duration: "45 min",
            category: "Audiobook",
        },
        {
            image: BookCoverImage,
            title: "Human Soul",
            rating: "5.0",
            author: "James Hook",
            duration: "45 min",
            category: "Audiobook",
        },
        {
            image: BookCoverImage,
            title: "Human Soul",
            rating: "5.0",
            author: "James Hook",
            duration: "45 min",
            category: "Audiobook",
        },
    ];

    const tabs = [
        { id: 'bestSelling', label: 'Best Selling ' },
        { id: 'freeBooks', label: 'Free Books' },
        { id: 'topFree', label: 'Top Free' },
    ];

    return (
        <div className="w-full mx-auto">
            <div className="flex w-1/2 gap-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`w-1/2 py-4 text-center font-medium text-gray-700 cursor-pointer ${activeTab === tab.id ? 'bg-gray-200' : 'border rounded-full'
                            } ${tab.id === 'bestSelling' ? 'rounded-full' : 'rounded-full'} focus:outline-none`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={`p-4 ${activeTab === 'bestSelling' ? 'block' : 'hidden'}`}>
                <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-3">
                    <HorizontalCard books={books} />
                </div>
            </div>

            <div className={`p-4 ${activeTab === 'freeBooks' ? 'block' : 'hidden'}`}>
                <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-3">
                    <HorizontalCard books={books} />
                </div>
            </div>

            <div className={`p-4 ${activeTab === 'topFree' ? 'block' : 'hidden'}`}>
                <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-3">
                   <h1>No Products Found</h1>
                </div>
            </div>
        </div>
    );
};

export default Tabs;