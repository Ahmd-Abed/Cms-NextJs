import CarouselHome from "@/app/components/CarouselHome";
import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/Navbar";
import QuickLinks from "@/app/components/QuickLinks";

import { fetchHomeData } from "@/app/redux/homePageSlice";
import { wrapper } from "@/app/redux/store";
import React, { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HomePageState } from "@/app/redux/homePageSlice";
import { set } from "date-fns";
import NewsComponent from "@/app/components/NewsHome";
import FAQComponent from "@/app/components/FAQ";
import AboutComponent from "@/app/components/About";

interface HomePageProps {
  homePageData: HomePageState;
  // navbarItems: NavbarItem[];
  // carouselItems: Carousel[];
  loading: boolean;
  error: string | null;
}

const page: React.FC<HomePageProps> = ({
  homePageData,
  // navbarItems,
  // carouselItems,
  loading,
  error,
}) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <NavBar navbarItems={homePageData.NavBar ? homePageData.NavBar : []} />
      <CarouselHome
        carouselItems={homePageData.Carousel ? homePageData.Carousel : []}
      />
      <AboutComponent about={homePageData.About} />
      <NewsComponent news={homePageData.News ?? []} />
      <QuickLinks links={homePageData.QuickLinks ?? []} />
      <FAQComponent faq={homePageData.Faq ?? []} />
      <Footer footerItems={homePageData.Footer} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    console.log("homePageData00");

    await store.dispatch(fetchHomeData());

    const state = store.getState();
    console.log("LState edit:" + state.homePage.Footer);
    return {
      props: {
        homePageData: state.homePage ? state.homePage : null,
        loading: state.homePage.loading,
        error: state.homePage.error,
      },
    };
  }
);

export default page;
