import LightGallery from "lightgallery/react";
import Image from "next/image";
// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgShare from "lightgallery/plugins/share";
import lgRotate from "lightgallery/plugins/rotate";

// export function Gallery() {
//     const onInit = () => {
//         console.log('lightGallery has been initialized');
//     };
//     return (
// <div className="App">
// <LightGallery
//                 onInit={onInit}
//                 speed={500}
//                 plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate, lgShare]}
// >

//                 {images.map((image, index) => {
//                     return (
// <a href={image.src} key={index}>
// <img alt={image.alt} src={image.src} />
// </a>
//                     )
//                 })}

//             </LightGallery>
// </div>
//     );
// }
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ImagesItem } from "../models/mediaModel";
// interface ImageItem {
//   original: string;
//   thumbnail?: string;
// }
interface ImagesProps {
  images: ImagesItem[] | [];
}
const ImagesGalleryComponent: React.FC<ImagesProps> = ({ images }) => {
  console.log("Url:" + images[0].Image.url);
  return (
    <div>
      <LightGallery
        speed={500}
        plugins={[
          lgThumbnail,
          lgZoom,
          lgAutoplay,
          lgFullscreen,
          lgRotate,
          lgShare,
        ]}
      >
        {images.map((image, index) => {
          return (
            <a href={`http://127.0.0.1:1337${image.Image.url}`} key={index}>
              <Image
                height={200}
                width={200}
                alt={image.Title}
                src={`http://127.0.0.1:1337${image.Image.url}`}
              />
            </a>
          );
        })}
      </LightGallery>
    </div>
  );
};

export default ImagesGalleryComponent;

// import React from "react";
// import PhotoAlbum from "react-photo-album";

// interface ImageItem {
//   src: string;
//   width: number;
//   height: number;
// }

// interface ImagesProps {
//   images: ImageItem[];
// }

// const ImagesGalleryComponent: React.FC<ImagesProps> = ({ images }) => {
//   return (
//     <div>
//       <PhotoAlbum layout="rows" photos={images} />
//     </div>
//   );
// };

// export default ImagesGalleryComponent;
