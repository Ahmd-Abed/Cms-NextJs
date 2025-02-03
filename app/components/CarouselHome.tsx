// import React from "react";
// import Image from "next/image";
// import Slider from "react-slick";

// // Import slick-carousel CSS
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// interface CarouselItem {
//   id: number;
//   Title: string;
//   Link: string;
//   Description: string;
//   LinkLabel: string;
//   Image: CarouselItemImage;
// }

// interface CarouselItemImage {
//   url: string;
// }

// interface CarouselProps {
//   carouselItems: CarouselItem[] | [];
// }

// const CarouselHome: React.FC<CarouselProps> = ({ carouselItems }) => {
//   // Slick slider settings
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 1024, // For tablets
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 768, // For mobile devices
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 576, // For extra-small devices
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <Slider {...sliderSettings}>
//       {carouselItems.map((item) => (
//         <div className="carousel-item px-2" key={item.id}>
//           {/* Image Component for optimized image rendering */}
//           <Image
//             src={`http://127.0.0.1:1337${item.Image.url}`}
//             alt={item.Title}
//             width={800}
//             height={400}
//             className="w-full h-auto rounded-lg"
//           />
//           <div className="p-4 bg-white text-center rounded-b-lg shadow-md">
//             <h5 className="text-lg font-semibold">{item.Title}</h5>
//             <p className="text-sm text-gray-600">{item.Description}</p>
//             <a
//               href={item.Link}
//               className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
//             >
//               {item.LinkLabel}
//             </a>
//           </div>
//         </div>
//       ))}
//     </Slider>
//   );
// };

// export default CarouselHome;

import React, { useState, useEffect } from "react";

interface CarouselItem {
  id: number;
  Title: string;
  Link: string;
  Description: string;
  LinkLabel: string;
  Image: CarouselItemImage;
  IsShown: boolean;
}

interface CarouselItemImage {
  url: string;
}

interface CarouselProps {
  carouselItems: CarouselItem[] | [];
}

const CarouselHome: React.FC<CarouselProps> = ({ carouselItems }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const filteredCarouselItems = carouselItems.filter(
    (item) => item.IsShown == true
  );
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlideIndex((prevIndex) =>
  //       prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
  //     );
  //   }, 1000); // Change slides every 3 seconds

  //   return () => clearInterval(interval); // Cleanup interval on unmount
  // }, [carouselItems.length]);

  const previous = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? filteredCarouselItems.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === filteredCarouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden -z-9">
      {/* Previous Button */}
      <button
        type="button"
        className="absolute left-5 top-1/2 z-20 flex rounded-full -translate-y-1/2 items-center justify-center bg-white/40 p-2 text-neutral-600 transition hover:bg-rose-900 hover:text-white"
        aria-label="previous slide"
        onClick={previous}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          strokeWidth="3"
          className="size-5 md:size-6 pr-0.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        type="button"
        className="absolute right-5 top-1/2 z-20 flex rounded-full -translate-y-1/2 items-center justify-center bg-white/40 p-2 text-neutral-600 transition hover:bg-rose-900 hover:text-white"
        aria-label="next slide"
        onClick={next}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          strokeWidth="3"
          className="size-5 md:size-6 pl-0.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Slides */}
      <div className="relative min-h-[50svh] w-full">
        {filteredCarouselItems.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlideIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="lg:px-32 lg:py-14 absolute inset-0 z-10 flex flex-col items-center justify-end gap-2 bg-gradient-to-t from-neutral-950/85 to-transparent px-16 py-12 text-center">
              <h3 className="w-full lg:w-[80%] text-balance text-2xl lg:text-3xl font-bold text-white">
                {slide.Title}
              </h3>
              <p className="lg:w-1/2 w-full text-pretty text-sm text-neutral-300">
                {slide.Description}
              </p>
              {slide.Link && (
                <a
                  href={slide.Link}
                  className="mt-2 cursor-pointer whitespace-nowrap rounded-md border border-white bg-transparent px-4 py-2 text-center text-xs font-medium tracking-wide text-white transition hover:opacity-75"
                >
                  {slide.LinkLabel}
                </a>
              )}
            </div>
            <img
              className="absolute w-full h-full inset-0 object-cover"
              src={`http://127.0.0.1:1337${slide.Image.url}`}
              alt={slide.Title}
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute rounded-md bottom-3 md:bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-4 md:gap-3 px-1.5 py-1 md:px-2">
        {filteredCarouselItems.map((_, index) => (
          <button
            key={index}
            className={`size-2 cursor-pointer w-5 h-1 transition ${
              currentSlideIndex === index ? "bg-rose-900" : "bg-neutral-300/50"
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlideIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselHome;
