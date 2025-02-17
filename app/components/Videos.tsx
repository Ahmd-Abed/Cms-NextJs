import React from "react";
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
import { VideosItem } from "../models/mediaModel";
interface VideoItem {
  original: string;
  thumbnail?: string;
}
interface VideosProps {
  videos: VideosItem[] | [];
}
const VideossGalleryComponent: React.FC<VideosProps> = ({ videos }) => {
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
        {videos.map((video, index) => {
          return (
            <a href={`http://127.0.0.1:1337${video.Video.url}`} key={index}>
              <video
                height={200}
                width={200}
                src={`http://127.0.0.1:1337${video.Video.url}`}
              />
            </a>
          );
        })}
      </LightGallery>
    </div>
  );
};

export default VideossGalleryComponent;
