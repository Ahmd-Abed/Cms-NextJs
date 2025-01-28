import React from "react";

interface AboutImage {
  url: string;
}

interface IAbout {
  id: number;
  Title: string;
  Link: string;
  Description: string;
  Image: AboutImage;
}

interface AboutProps {
  about: IAbout[] | [];
}

const About: React.FC<AboutProps> = ({ about }) => {
  if (about.length === 0) return null; // Handle case where 'about' is empty

  return (
    <div className="p-6" dir="rtl">
      {/* Header Section */}
      <div className="background-color text-white text-center py-3 rounded-md mb-4">
        <h2 className="text-xl font-bold">من نحن؟</h2>
      </div>
      {/* Grey Background Div */}
      <div className="bg-gray-100 flex p-4 rounded-md">
        {/* Image Section */}
        <div className="w-1/2">
          <img
            src={`http://127.0.0.1:1337${about[0].Image.url}`}
            alt={about[0].Title}
            className="w-full h-auto rounded-md"
          />
        </div>

        {/* Text Section with Flex Column and Space Between */}
        <div className="w-1/2 pr-4 flex flex-col">
          <h1 className="text-2xl font-bold text-black mb-2">
            {about[0].Title}
          </h1>
          {/* <div className="flex-grow" /> Spacer */}
          <p className="text-lg text-gray-700 my-4 p-3">
            {about[0].Description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
