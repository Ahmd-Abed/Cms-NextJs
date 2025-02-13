import { mediaPageModel } from "../models/mediaModel";

export async function fetchMediaData(): Promise<mediaPageModel> {
  try {
    const response = await fetch("http://localhost:3000/api/media");
    if (!response.ok) {
      throw new Error(
        `Failed to fetch mediaData: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return new mediaPageModel(data.data);
  } catch (error) {
    console.error("Error fetching MediaData:", error);
    throw error;
  }
}
