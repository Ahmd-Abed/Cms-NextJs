// import React, { useState, useEffect } from "react";
// import { Carousel } from "../models/homePageModel";

// interface CarouselProps {
//   carouselItems: Carousel[] | [];
// }
// const CarouselHome: React.FC<CarouselProps> = ({ carouselItems }) => {
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//   const filteredCarouselItems = carouselItems.filter(
//     (item) => item.isShown == true
//   );

//   const previous = () => {
//     setCurrentSlideIndex((prevIndex) =>
//       prevIndex === 0 ? filteredCarouselItems.length - 1 : prevIndex - 1
//     );
//   };

//   const next = () => {
//     setCurrentSlideIndex((prevIndex) =>
//       prevIndex === filteredCarouselItems.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <div className="relative w-full overflow-hidden -z-9">
//       {/* Previous Button */}
//       <button
//         type="button"
//         className="absolute left-5 top-1/2 z-20 flex rounded-full -translate-y-1/2 items-center justify-center bg-white/40 p-2 text-neutral-600 transition hover:bg-rose-900 hover:text-white"
//         aria-label="previous slide"
//         onClick={previous}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           fill="none"
//           strokeWidth="3"
//           className="size-5 md:size-6 pr-0.5"
//           aria-hidden="true"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M15.75 19.5 8.25 12l7.5-7.5"
//           />
//         </svg>
//       </button>

//       {/* Next Button */}
//       <button
//         type="button"
//         className="absolute right-5 top-1/2 z-20 flex rounded-full -translate-y-1/2 items-center justify-center bg-white/40 p-2 text-neutral-600 transition hover:bg-rose-900 hover:text-white"
//         aria-label="next slide"
//         onClick={next}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           fill="none"
//           strokeWidth="3"
//           className="size-5 md:size-6 pl-0.5"
//           aria-hidden="true"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M8.25 4.5l7.5 7.5-7.5 7.5"
//           />
//         </svg>
//       </button>

//       {/* Slides */}
//       <div className="relative min-h-[50svh] w-full">
//         {filteredCarouselItems.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute inset-0 transition-opacity duration-1000 ${
//               currentSlideIndex === index ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <div className="lg:px-32 lg:py-14 absolute inset-0 z-10 flex flex-col items-center justify-end gap-2 bg-gradient-to-t from-neutral-950/85 to-transparent px-16 py-12 text-center">
//               <h3 className="w-full lg:w-[80%] text-balance text-2xl lg:text-3xl font-bold text-white">
//                 {slide.title}
//               </h3>
//               <p className="lg:w-1/2 w-full text-pretty text-sm text-neutral-300">
//                 {slide.description}
//               </p>
//               {slide.link && (
//                 <a
//                   href={slide.link}
//                   className="mt-2 cursor-pointer whitespace-nowrap rounded-md border border-white bg-transparent px-4 py-2 text-center text-xs font-medium tracking-wide text-white transition hover:opacity-75"
//                 >
//                   {slide.linkLabel}
//                 </a>
//               )}
//             </div>
//             <img
//               className="absolute w-full h-full inset-0 object-cover"
//               src={`http://127.0.0.1:1337${slide.image.url}`}
//               alt={slide.title}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Indicators */}
//       <div className="absolute rounded-md bottom-3 md:bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-4 md:gap-3 px-1.5 py-1 md:px-2">
//         {filteredCarouselItems.map((_, index) => (
//           <button
//             key={index}
//             className={`size-2 cursor-pointer w-5 h-1 transition ${
//               currentSlideIndex === index ? "bg-rose-900" : "bg-neutral-300/50"
//             }`}
//             aria-label={`Slide ${index + 1}`}
//             onClick={() => setCurrentSlideIndex(index)}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CarouselHome;
import React, { useState } from "react";
import Slider from "react-slick";
import "@/app/components/slider.css";
import { Carousel } from "../models/homePageModel";

interface CarouselProps {
  carouselItems: Carousel[] | [];
}
const CarouselHome: React.FC<CarouselProps> = ({ carouselItems }) => {
  // Slick slider settings
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="relative w-full overflow-hidden -z-9">
      <Slider {...settings} className="customSlider">
        {carouselItems.map((slide) => (
          <div key={slide.id} className="relative min-h-[50svh] w-full">
            <div className="lg:px-32 lg:py-14 absolute inset-0 z-10 flex flex-col items-center justify-end gap-2 bg-gradient-to-t from-neutral-950/85 to-transparent px-16 py-12 text-center">
              <h3 className="w-full lg:w-[80%] text-balance text-2xl lg:text-3xl font-bold text-white">
                {slide.title}
              </h3>
              <p className="lg:w-1/2 w-full text-pretty text-sm text-neutral-300">
                {slide.description}
              </p>
              {slide.link && (
                <a
                  href={slide.link}
                  className="mt-2 cursor-pointer whitespace-nowrap rounded-md border border-white bg-transparent px-4 py-2 text-center text-xs font-medium tracking-wide text-white transition hover:opacity-75"
                >
                  {slide.linkLabel}
                </a>
              )}
            </div>
            <img
              className="absolute w-full h-full inset-0 object-cover"
              src={`http://127.0.0.1:1337${slide.image.url}`}
              alt={slide.title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselHome;
