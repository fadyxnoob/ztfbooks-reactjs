
import React from "react";

const About = () => {
  return (
    <div>
      <div className="w-full min-h-screen bg-[#F5F5F5] px-4 sm:px-8 lg:px-20 py-8 lg:py-8">
        <div className="p-4 border-b border-[#EBEBEB]">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#014471] font-medium">
            About Us
          </h1>
        </div>

        <div className="bg-white mt-8 p-4 sm:p-6 shadow-light rounded-lg">
          <p className="text-[#FFBC06] font-bold text-xl sm:text-[1.3rem]">Introduction:</p>
          <p className="font-bold text-base sm:text-[1rem] mb-2">About Prof. Z.T. Fomum</p>
          <ul className="list-disc pl-8 mt-2">
            <li className="w-full lg:w-[80%]">
              "ZTFBooks is a digital platform dedicated to sharing the writings of Prof. Z.T. Fomum, whose works cover a variety of topics on the Christian faith such as salvation, redemption, family life, leadership, and discipleship."
            </li>
            <li className="w-full lg:w-[80%]">
              "Our mission is to make transformative Christian literature accessible to everyone, everywhere."
            </li>
          </ul>
        </div>

        <div className="bg-white mt-8 p-4 sm:p-6 shadow-light rounded-lg">
          <p className="text-[#FFBC06] font-bold text-xl sm:text-[1.3rem]">Our Mission:</p>
          <ul className="list-disc pl-8 mt-2">
            <li className="w-full lg:w-[80%]">
              "At ZTFBooks, we believe in the power of literature to inspire and transform lives. Our mission is to spread the teachings of the Bible through the works of Prof. Z.T. Fomum, providing readers with insightful, faith-driven content that nurtures spiritual growth and guides them on their Christian journey"
            </li>
          </ul>
        </div>

        <div className="bg-white mt-8 p-4 sm:p-6 shadow-light rounded-lg">
          <h3 className="text-[#FFBC06] font-bold text-xl sm:text-[1.6rem]">Other Values:</h3>
          <ul className="list-disc pl-8 mt-2">
            <li className="w-full lg:w-[80%] text-[#333333">
              Faith: "We are driven by a deep faith in God and a desire to help others grow spiritually."
            </li>
            <li className="w-full lg:w-[80%]">
              Accessibility: "We strive to make Christian teachings available to everyone, regardless of their location."
            </li>
            <li className="w-full lg:w-[80%]">
              Integrity: "We are committed to offering truthful, impactful content rooted in biblical principles."
            </li>
            <li className="w-full lg:w-[80%]">
              Community: "Our platform fosters a global Christian community, where readers can connect, share, and grow together."
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
