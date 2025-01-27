import About from "@/app/components/About";
import CarouselHome from "@/app/components/CarouselHome";
import NavBar from "@/app/components/Navbar";
import News from "@/app/components/NewsHome";
import { homePageModel, NavbarItem } from "@/app/models/homePageModel";
import { fetchHomeData } from "@/app/redux/homePageSlice";
import { wrapper } from "@/app/redux/store";
import React from "react";
interface NavBarItem {
  id: number;
  Label: string;
  Link: string;
  IsShown: boolean;
  SubItem: NavBarItem[];
}
interface CarouselItemImage {
  url: string;
}
interface CarouselItem {
  id: number;
  Title: string;
  Link: string;
  Description: string;
  LinkLabel: string;
  Image: CarouselItemImage;
}
interface AboutImage {
  url: string;
}
interface IAbout {
  id: number;
  Title: string;
  Link: string;
  Description: string;
  Image: AboutImage;
}
interface NewsImages {
  url: string;
}
interface INews {
  id: number;
  Title: string;
  // Link: string;
  Description: string;
  Image: NewsImages[];
  Date: Date;
}
interface HomePageProps {
  //homePageData: homePageModel;
  loading: boolean;
  error: string | null;
  navbarItems: NavBarItem[] | [];
  carouselItems: CarouselItem[] | [];
  about: IAbout[] | [];
  news: INews[] | [];
}
const page: React.FC<HomePageProps> = ({
  //homePageData,
  loading,
  error,
  navbarItems,
  carouselItems,
  about,
  news,
}) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <NavBar navbarItems={navbarItems} />
      <CarouselHome carouselItems={carouselItems} />
      <News news={news} />
      {/* <About about={about} /> */}
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    console.log("inside getServerSideProps");

    // Dispatch the action to fetch home page data
    await store.dispatch(fetchHomeData());

    // Get the updated state after dispatch
    const state = store.getState();
    const createdAt = state.homePage.homePageData?.data?.createdAt;
    console.log(createdAt);
    console.log("Ldata from redux:", state.homePage.homePageData);
    console.log(
      "ContentHomePage from redux:",
      state.homePage.homePageData?.data?.ContentHomePage
    );
    const serializedHomePageData = state.homePage.homePageData
      ? state.homePage.homePageData.data?.ContentHomePage.map((item: any) => ({
          id: item.id,
          label: item.label,
          link: item.link,
          image: item.image?.url, // Only pass the URL, not the full image object
          // Add any other fields needed
        }))
      : [];

    // Ensure data is serialized before passing it as props
    // const serializedHomePageData = state.homePage.homePageData
    //   ? JSON.stringify(state.homePage.homePageData?.ContentHomePage, null, 2)
    //   : null;
    console.log(" serializedHomePageData test:", serializedHomePageData);
    // console.log("mara tenye ", state.homePage.homePageData);
    console.log(
      "Navbar ljded:",
      JSON.parse(JSON.stringify(state.homePage.homePageData?.data?.NavBar))
    );
    console.log(
      "ContentHomePage ljded:",
      JSON.parse(
        JSON.stringify(state.homePage.homePageData?.data?.ContentHomePage)
      )
    );
    console.log(
      "te3 navbar Ldata from redux ee:",
      state.homePage.homePageData
        ? state.homePage.homePageData.data?.ContentHomePage[0]
        : // filter(
          //     (item: any) => item.__component === "navbar.nav-item"

          []
    );
    console.log(
      "Ljded about.about:",
      serializedHomePageData.filter(
        (item: any) => item.__component === "about.about"
      )
    );

    console.log(
      "LNews:",
      state.homePage.homePageData
        ? JSON.parse(
            JSON.stringify(
              state.homePage.homePageData?.data?.news_collections[0]
            )
          )
        : []
    );
    return {
      props: {
        // navbarItems: serializedHomePageData
        //   ? serializedHomePageData.filter(
        //       (item: any) => item.__component === "navbar.nav-item"
        //     )
        //   : [],
        navbarItems: state.homePage.homePageData
          ? JSON.parse(
              JSON.stringify(state.homePage.homePageData?.data?.NavBar)
            )
          : [],
        // carouselItems: state.homePage.homePageData
        //   ? state.homePage.homePageData.data?.ContentHomePage.filter(
        //       (item: any) => item.__component === "carousel.carousel"
        //     ).flatMap((item: any) => item.carousel_collections || [])
        //   : [],
        carouselItems: state.homePage.homePageData
          ? JSON.parse(
              JSON.stringify(
                state.homePage.homePageData?.data?.carousel_collections
              )
            )
          : [],
        about: state.homePage.homePageData
          ? state.homePage.homePageData.data?.ContentHomePage.filter(
              (item: any) => item.__component === "about.about"
            )
          : [],
        // news:
        //   state.homePage.homePageData?.data?.ContentHomePage.filter(
        //     (item: any) => item.__component === "news.news"
        //   )
        //     .flatMap((newsItem: any) => newsItem.news_collections || [])
        //     .map((collection: any) => ({
        //       id: collection.id,
        //       Title: collection.Title,
        //       Description: collection.Description,
        //       Date: collection.Date,
        //     })) || [],
        news: state.homePage.homePageData
          ? JSON.parse(
              JSON.stringify(
                state.homePage.homePageData?.data?.news_collections
              )
            )
          : [],
        //homePageData: serializedHomePageData,
        loading: state.homePage.loading, // The loading state from the Redux store
        error: state.homePage.error, // The error state from the Redux store
      },
    };
  }
);

export default page;
