import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const STRAPI_API_MEDIA_URL =
  "http://127.0.0.1:1337/api/media-file?populate[0]=Images&populate[1]=Images.images.Image&populate[2]=Videos&populate[3]=Videos.videos.Video&populate[4]=Publications&populate[5]=Publications.publications.File";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Requesting data from Strapi API:", STRAPI_API_MEDIA_URL);

    // Fetching data using axios
    const response = await axios.get(STRAPI_API_MEDIA_URL);

    console.log("Response Status:", response.status);

    // Returning the fetched data
    const mediaData = response.data;
    console.log("media Data:", mediaData);

    return res.status(200).json(mediaData);
  } catch (error: any) {
    console.error("Error fetching media data data from Strapi:", error.message);

    // Returning error details
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json({
        error: `Failed to fetch media data: ${
          error.response.data?.error || error.message
        }`,
      });
    }
    await axios.get(STRAPI_API_MEDIA_URL);
    return res.status(500).json({
      error: "An error occurred while fetching media data",
    });
  }
}
