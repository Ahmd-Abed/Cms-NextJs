import React from "react";
import Image from "next/image";
import Slider from "react-slick"; // Import react-slick

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselItem {
  id: number;
  Title: string;
  Link: string;
  Description: string;
  LinkLabel: string;
  Image: CarouselItemImage;
}

interface CarouselItemImage {
  url: string;
}

interface CarouselProps {
  carouselItems: CarouselItem[] | [];
}

const CarouselHome: React.FC<CarouselProps> = ({ carouselItems }) => {
  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // For smaller devices
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, // For extra-small devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...sliderSettings}>
      {carouselItems.map((item) => (
        <div className="carousel-item" key={item.id}>
          <Image
            src={`http://127.0.0.1:1337${item.Image.url}`}
            alt={item.Title}
            width={800}
            height={400}
            className="d-block w-full"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>{item.Title}</h5>
            <p>{item.Description}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselHome;
