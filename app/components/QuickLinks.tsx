// import React from "react";
// import { LinkIcon } from "@heroicons/react/24/solid";
// import { QuickLinks } from "../models/homePageModel";

// interface QuickLinksProps {
//   links: QuickLinks[] | [];
// }
// const QuickLinksComponent: React.FC<QuickLinksProps> = ({ links }) => {
//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="w-[50%] max-w-lg bg-white border border-gray-200 rounded-lg shadow-lg p-6">
//         <div dir="rtl" className="bg-gray-100 rounded-lg shadow p-4 ">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">روابط مهمة</h2>
//           <ul className="space-y-3">
//             {links.map((link, index) => (
//               <li
//                 key={index}
//                 className="flex gap-2 justify-items-start items-center bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 {" "}
//                 <a
//                   href={link.Link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-white/70 hover:text-white transition bg-rose-900 p-2 rounded-lg"
//                 >
//                   <LinkIcon className="w-6 h-6" />
//                 </a>
//                 <span className="text-gray-800 font-medium">{link.Label}</span>
//               </li>
//             ))}
//           </ul>
//           <div className="mt-4 text-center">
//             <a
//               href="#"
//               className="text-rose-900 hover:text-rose-900/80 font-semibold inline-flex items-center"
//             >
//               شاهد المزيد
//               <svg
//                 className="w-4 h-4 rtl:rotate-180 ms-1"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={2}
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M17.25 15.75L21 12m0 0l-3.75-3.75M21 12H3"
//                 />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuickLinksComponent;
import React from "react";
import Slider from "react-slick"; // Import React Slick

import { QuickLinks } from "../models/homePageModel";

interface QuickLinksProps {
  links: QuickLinks[] | [];
}

const QuickLinksComponent: React.FC<QuickLinksProps> = ({ links }) => {
  const settings = {
    infinite: false, // Enable looping
    speed: 500, // Transition speed
    slidesToShow: 4, // Number of items per view
    slidesToScroll: 1, // Scroll one item at a time
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-lg p-6">
        <div dir="rtl" className="rounded-lg shadow p-4">
          <div className="title">
            <h2 className="text-xl font-bold text-gray-800 mb-1 relative">
              روابط مهمة
            </h2>
            <span className="absolute w-20 h-1 bg-gray-300"></span>
          </div>

          {/* React Slick container */}
          <Slider {...settings}>
            {links.map((link, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white rounded-lg p-3 shadow-md hover:shadow-md transition-shadow custom-display"
              >
                <a
                  href={link.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white transition  p-2 rounded-lg"
                >
                  <div className="w-20 h-20 bg-[#79133e] rounded-full flex justify-center items-center mb-3">
                    <img
                      src={`http://127.0.0.1:1337${link.Logo.url}`}
                      alt={link.Label}
                      className="w-14 h-10 rounded-full"
                    />
                  </div>
                </a>
                <span className="text-gray-800 font-medium mt-2 text-center text-[20px]">
                  {link.Label}
                </span>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default QuickLinksComponent;
