import React from 'react'

const AuthorCard = ({ authors }) => {
    return (
        authors?.map((author, i) => {
            return (
                <div className="w-[199px] h-[266px] border border-[#8888883B] rounded-lg p-4 flex flex-col items-center text-center shadow-sm">
                    <img
                        src={author.authorImage}
                        alt={author.name}
                        className="w-[150px] h-[150px] rounded-full object-cover"
                    />
                    <h2 className="text-lg font-semibold mt-3 text-[#333333]">{author.name}</h2>
                    <p className="text-sm text-[#333333]">{`From ${author.country}`}</p>
                    <p className="text-sm text-[#333333]">{`Writer of ${author.books} Ebooks`}</p>
                </div>
            )
        })
    );
}

export default React.memo(AuthorCard)
