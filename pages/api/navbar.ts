import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const STRAPI_API_NAVBAR_URL =
  "http://127.0.0.1:1337/api/navbar-global?populate=*";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Requesting data from Strapi API:", STRAPI_API_NAVBAR_URL);

    // Fetching data using axios
    const response = await axios.get(STRAPI_API_NAVBAR_URL);

    console.log("Response Status:", response.status);

    // Extract only the Navbar array
    const navBarData = response.data?.data?.Navbar;

    console.log("Navbar Array:", navBarData);

    // Send only the Navbar array in the response
    res.status(200).json(navBarData);
  } catch (error: any) {
    console.error("Error fetching navBarData data from Strapi:", error.message);

    // Returning error details
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json({
        error: `Failed to fetch navBarData data: ${
          error.response.data?.error || error.message
        }`,
      });
    }

    return res.status(500).json({
      error: "An error occurred while fetching navBarData data",
    });
  }
}
