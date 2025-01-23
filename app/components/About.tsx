import React from "react";
interface AboutImage {
  url: string;
}
interface IAbout {
  id: number;
  Title: string;
  Link: string;
  Description: string;
  Image: AboutImage; // Recursive type for sub-items
}
interface AboutProps {
  about: IAbout[] | [];
}

const About: React.FC<AboutProps> = ({ about }) => {
  return (
    // <div>
    //   {about.map((item) => (
    //     <div>
    //       <p>{item.Title}</p>
    //       <p>{item.Description}</p>
    //     </div>
    //   ))}
    // </div>
    <div className="bg-rose-700">
      <p>{about[0].Title}</p>
      <p>{about[0].Description}</p>
    </div>
  );
};

export default About;
