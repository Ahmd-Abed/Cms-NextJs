// "use server";
// import { NextResponse } from "next/server";

// const STRAPI_API_URL =
//   "http://localhost:1337/api/Home-page?populate[ContentHomePage][populate]=*";

// export async function GET() {
//   try {
//     // Fetch homepageData using userId from query parameters
//     const response = await fetch(`${STRAPI_API_URL}`, {
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${token.value}`,
//       },
//     });

//     // Handle failed response
//     if (!response.ok) {
//       const errorMessage = await response.text(); // Get error details from the STRAPI API

//       return NextResponse.json(
//         {
//           error: `Failed to fetch homepageData} :${errorMessage}`,
//         },
//         { status: response.status }
//       );
//     }

//     // Parse and return hompage data
//     const homepageData = await response.json();
//     return NextResponse.json(homepageData);
//   } catch (error) {
//     console.error("Error fetching contracts from Mock API:", error);
//     return NextResponse.json(
//       { error: "An error occurred while fetching contracts data" },
//       { status: 500 }
//     );
//   }
// }

// import type { NextApiRequest, NextApiResponse } from "next";

// type ResponseData = {
//   title?: string;
//   description?: string;
//   error?: string;
// };

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const STRAPI_API_URL =
  "http://127.0.0.1:1337/api/Home-page?populate[NavBar][populate]=*&populate[ContentHomePage][populate]=*&populate[carousel_collections][populate]=Image";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Requesting data from Strapi API:", STRAPI_API_URL);

    // Fetching data using axios
    const response = await axios.get(STRAPI_API_URL);

    console.log("Response Status:", response.status);

    // Returning the fetched data
    const homepageData = response.data;
    console.log("Homepage Data:", homepageData);

    return res.status(200).json(homepageData);
  } catch (error: any) {
    console.error("Error fetching homepage data from Strapi:", error.message);

    // Returning error details
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json({
        error: `Failed to fetch homepage data: ${
          error.response.data?.error || error.message
        }`,
      });
    }
    await axios.get(STRAPI_API_URL);
    return res.status(500).json({
      error: "An error occurred while fetching homepage data",
    });
  }
}
