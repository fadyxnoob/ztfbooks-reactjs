import React, { useEffect, useState } from 'react';
import HorizontalCard from '../HorizontalCard/HorizontalCard';
import service from '../../API/DBService';

const Tabs = ({ bestSales }) => {
    const [activeTab, setActiveTab] = useState('bestSelling');
    const [bestSalesBooks, setBestSalesBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const getBestSellingBooks = async () => {
        try {
            const res = await service.getBestSalesBooks();
            console.log('API Response:', res);

            if (res && res.length > 0) {
                const formattedBooks = res.map((book) => ({
                    title: book.ebookTitle,
                    image: book.ebookThumbNail,
                    author: book.author?.createdBy || 'Unknown Author',
                    duration: book.timeToRead || 'N/A',
                    category: book.categories?.[0]?.name || 'N/A',
                    id: book.id
                }));

                setBestSalesBooks(formattedBooks);
            } else {
                console.warn('No books found in API response.');
            }
        } catch (error) {
            console.error('Failed to fetch best-selling books:', error);
        }
    };


    const toggleFavorite = (book) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.some((fav) => fav.id === book.id)) {
                return prevFavorites.filter((fav) => fav.id !== book.id);
            } else {
                return [...prevFavorites, book];
            }
        });
    };

    const tabs = [
        { id: 'bestSelling', label: 'Best Selling' },
        { id: 'freeBooks', label: 'Free Books' },
        { id: 'topFree', label: 'Top Free' },
    ];

    useEffect(() => {
        getBestSellingBooks();
        console.log({bestSalesBooks})
    }, []);

    return (
        <div className="w-full mx-auto">
            <div className="flex w-1/2 gap-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`w-1/2 py-4 text-center font-medium text-gray-700 cursor-pointer ${activeTab === tab.id ? 'bg-gray-200' : 'border rounded-full'}
                            focus:outline-none`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={`p-4 ${activeTab === 'bestSelling' ? 'block' : 'hidden'}`}>
                <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-3">
                    {bestSalesBooks.length > 0 ? (
                        <HorizontalCard
                            books={bestSalesBooks}
                            toggleFavorite={toggleFavorite}
                            favorites={favorites}
                        />
                    ) : (
                        <p className="text-gray-600">No books found</p>
                    )}
                </div>
            </div>

            <div className={`p-4 ${activeTab === 'freeBooks' ? 'block' : 'hidden'}`}>
                <div className="flex mt-10 flex-wrap items-center justify-center md:justify-start gap-3">
                    <HorizontalCard books={[]} />
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

export default React.memo(Tabs);