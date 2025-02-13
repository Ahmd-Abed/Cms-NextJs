import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { VideosItem } from "../models/mediaModel";
interface VideoItem {
  original: string;
  thumbnail?: string;
}
interface VideosProps {
  videos: VideoItem[] | [];
}
const VideossGalleryComponent: React.FC<VideosProps> = ({ videos }) => {
  return (
    <div>
      <ImageGallery items={videos} showPlayButton={false} />
    </div>
  );
};

export default VideossGalleryComponent;
