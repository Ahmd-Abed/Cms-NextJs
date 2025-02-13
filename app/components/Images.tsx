import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ImagesItem } from "../models/mediaModel";
interface ImageItem {
  original: string;
  thumbnail?: string;
}
interface ImagesProps {
  images: ImageItem[] | [];
}
const ImagesGalleryComponent: React.FC<ImagesProps> = ({ images }) => {
  return (
    <div>
      <ImageGallery items={images} showPlayButton={false} />
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
