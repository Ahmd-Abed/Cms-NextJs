// pages/_app.tsx
import { AppProps } from "next/app";
import { wrapper } from "@/app/redux/store";
import "../styles/globals.css"; // You can add your global styles here;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MyApp({ Component, pageProps }: AppProps) {
  // Return the Component with pageProps, which is standard for Next.js
  return <Component {...pageProps} />;
}

// Export the wrapped MyApp component with Redux store connected
export default wrapper.withRedux(MyApp);
