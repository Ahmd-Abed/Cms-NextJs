import { homePageModel } from "../models/homePageModel";

export async function fetchHomePageData(): Promise<homePageModel> {
  try {
    const response = await fetch("http://localhost:3000/api/homepage"); // Calls the server-side API route
    if (!response.ok) {
      throw new Error(
        `Failed to fetch HomePageData: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log("Hu Ldata", JSON.parse(JSON.stringify(data)));
    return data;
    // return new homePageModel(data); // Return the instance of homePageModel
  } catch (error) {
    console.error("Error fetching HomePageData:", error);
    throw error; // Ensure the error is propagated to the caller
  }
}
