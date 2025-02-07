import React from 'react'

const Faqs = () => {
    return (
        <div className='px-5 md:px-20 py-5 bg-[#f4f3f4] min-h-screen'>
            {/* Book Details */}
            <h1 className='bg-[#F7F8F8] my-3 p-3 rounded-xl text-[#203949] text-3xl font-medium'>FAQs</h1>
            {/* Bought more section */}
            <h4 className='text-[#203949] text-2xl text-center md:text-start font-semibold'>Cutomers Frequently Asked Questions</h4>
            <section className='mt-5 bg-[#F7F8F8] p-5 rounded-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'>
                <div className="mx-auto">
                    <div className="divide-y divide-gray-100 border-b border-[#DFDFDF]">
                        <details className="group" open>
                            <summary
                                className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-medium text-[#333333] group-open:text-primary-500">
                                What is ZTF Books ?
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="block h-5 w-5 group-open:hidden">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="hidden h-5 w-5 group-open:block">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                </div>
                            </summary>
                            <div className="pb-4 text-[#7C7C7C] text-lg font-normal">Lorem ipsum dolor sit amet consectetur. Dolor egestas non proin vivamus ut turpis. Gravida eget sed convallis auctor quis sapien. Risus nibh elementum non nisl quis sagittis ac.</div>
                        </details>
                    </div>
                    <div className="divide-y divide-gray-100 border-b border-[#DFDFDF]">
                        <details className="group">
                            <summary
                                className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-medium text-[#333333] group-open:text-primary-500">
                               How ZTF Works?
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="block h-5 w-5 group-open:hidden">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="hidden h-5 w-5 group-open:block">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                </div>
                            </summary>
                            <div className="pb-4 text-[#7C7C7C] text-lg font-normal">Lorem ipsum dolor sit amet consectetur. Dolor egestas non proin vivamus ut turpis. Gravida eget sed convallis auctor quis sapien. Risus nibh elementum non nisl quis sagittis ac.</div>
                        </details>
                    </div>
                    <div className="divide-y divide-gray-100 border-b border-[#DFDFDF]">
                        <details className="group">
                            <summary
                                className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-medium text-[#333333] group-open:text-primary-500">
                              How we can pay ZTF Books?
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="block h-5 w-5 group-open:hidden">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="hidden h-5 w-5 group-open:block">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                </div>
                            </summary>
                            <div className="pb-4 text-[#7C7C7C] text-lg font-normal">Lorem ipsum dolor sit amet consectetur. Dolor egestas non proin vivamus ut turpis. Gravida eget sed convallis auctor quis sapien. Risus nibh elementum non nisl quis sagittis ac.</div>
                        </details>
                    </div>
                    <div className="divide-y divide-gray-100 border-b border-[#DFDFDF]">
                        <details className="group">
                            <summary
                                className="flex cursor-pointer list-none items-center justify-between py-4 text-xl font-medium text-[#333333] group-open:text-primary-500">
                              Which payments methods ZTF Accept
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="block h-5 w-5 group-open:hidden">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" className="hidden h-5 w-5 group-open:block">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                </div>
                            </summary>
                            <div className="pb-4 text-[#7C7C7C] text-lg font-normal">Lorem ipsum dolor sit amet consectetur. Dolor egestas non proin vivamus ut turpis. Gravida eget sed convallis auctor quis sapien. Risus nibh elementum non nisl quis sagittis ac.</div>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default React.memo(Faqs)
