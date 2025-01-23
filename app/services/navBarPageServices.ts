interface NavbarItem {
  id: number;
  Label: string;
  Link: string;
  IsShown: boolean;
}

interface NavbarData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  Navbar: NavbarItem[];
  localizations: any[]; // You can further define the structure if localizations have a specific schema.
}

interface NavbarResponse {
  data: NavbarData | null; // 'data' can be null in some cases.
  meta: object; // 'meta' can contain additional metadata.
}

export async function fetchNavBarData(): Promise<NavbarItem[]> {
  try {
    const response = await fetch("http://localhost:3000/api/navbar"); // Calls the server-side API route
    if (!response.ok) {
      throw new Error(
        `Failed to fetch HomePageData: ${response.status} ${response.statusText}`
      );
    }
    const data: NavbarItem[] = await response.json();
    console.log("Hu Ldata te3 navbar" + data);
    return data; // Return the instance of homePageModel
  } catch (error) {
    console.error("Error fetching HomePageData:", error);
    throw error; // Ensure the error is propagated to the caller
  }
}
