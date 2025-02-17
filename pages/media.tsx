import { fetchMediaPageData } from "@/app/redux/mediaSlice";
import { wrapper } from "@/app/redux/store";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { mediaState } from "@/app/redux/mediaSlice";
import ImagesGalleryComponent from "@/app/components/Images";
import VideossGalleryComponent from "@/app/components/Videos";

interface MediaProps {
  mediaData: mediaState;
  loading: boolean;
  error: string | null;
}

const MediaPage: React.FC<MediaProps> = ({ mediaData, loading, error }) => {
  const [activeTab, setActiveTab] = useState("photos");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Prepare images for the gallery
  const imageGalleryItems =
    mediaData.Images?.map((item) => ({
      original: `http://127.0.0.1:1337${item.Image?.url}`,
      thumbnail: `http://127.0.0.1:1337${
        item.Image?.formats?.thumbnail?.url ?? item.Image?.url
      }`,
    })) ?? [];
  // Prepare videos for the gallery
  const videoGalleryItems =
    mediaData.Videos?.map((item) => ({
      original: `http://127.0.0.1:1337${item.Video?.url}`,
      thumbnail: `http://127.0.0.1:1337${
        item.Video?.formats?.thumbnail?.url ?? item.Video?.url
      }`,
    })) ?? [];

  return (
    <div dir="rtl" className="section m-4 px-6">
      <div className="flex items-center gap-x-20 text-right">
        <h2 className="section-title text-teal-800 text-2xl font-extrabold">
          الملف الاعلامي
        </h2>
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {[
            { id: "photos", label: "الصور" },
            { id: "videos", label: "الفيديوهات" },
          ].map((tab) => (
            <li key={tab.id} className="me-2">
              <button
                className={`inline-block p-4 border-b-2 font-bold text-lg rounded-t-lg transition duration-300 ${
                  activeTab === tab.id
                    ? "text-rose-800 border-rose-800"
                    : "text-gray-500 hover:text-gray-600 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mt-4">
        {activeTab === "photos" && (
          <ImagesGalleryComponent images={mediaData.Images} />
        )}
        {activeTab === "videos" && (
          <VideossGalleryComponent videos={mediaData.Videos} />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchMediaPageData());

    const state = store.getState();

    return {
      props: {
        mediaData: state.media,
        loading: state.media.loading,
        error: state.media.error,
      },
    };
  }
);

export default MediaPage;
