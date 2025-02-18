import React, { useState } from 'react';
import Button from '../../components/Button/Button';
// import { Card } from 'lucide-react';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    country: 'United States'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Format expiry date
    if (name === 'expiry') {
      const formatted = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    console.log('Payment submitted:', formData);
  };

  return (
    <div className="bg-[#F6F7F8] min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8"
    >
        <div className="border-b border-[#EBEBEB]">
          <h1 className="text-center mt-8 pb-2 text-2xl sm:text-3xl lg:text-4xl text-[#014471] font-medium">
            Payment Information
          </h1>
        </div>
      <div className="mt-[5rem] w-[768px] mx-auto">
        <div className="bg-[#F6F7F8] p-6 md:p-8">
        
          
          <div className="bg-[#FFBC06] bg-opacity-40 text-[#333333] w-20 rounded-md p-2 mb-6" style={{backgroundColor: "#FFBC06"}}>
            <span className="text-sm font-medium text-yellow-800 text-[0.6rem">Payment</span>
          </div>

          <p className='text-xl text-[#333333] mb-8 font-bold '>Add your payment information</p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className=''>
                Card Details
                <div className="relative w-[100%]">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxLength="19"
                    className="bg-[#fff] border-b-[#CCC] border-b-[5px] w-full px-4 py-3 rounded-lg bg-[#FFFFFF] border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                    <img src="/api/placeholder/24/16" alt="visa" className="h-4 w-6" />
                    <img src="/api/placeholder/24/16" alt="mastercard" className="h-4 w-6" />
                    <img src="/api/placeholder/24/16" alt="unionpay" className="h-4 w-6" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className='w-40'>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="bg-[#fff] border-b-[#CCC] border-b-[5px] w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className='w-40'>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="CVV"
                    maxLength="4"
                    className="bg-[#fff] border-b-[#CCC] border-b-[5px] w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className='mb-8'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="bg-white border-none w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  {/* Add more countries as needed */}
                </select>
              </div>

              <Button
                type="submit"
                classNames="w-full bg-blue-800 text-white py-3 px-4 rounded-3xl hover:bg-blue-900 transition-colors"
              >
                Pay $099
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;