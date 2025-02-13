import React, { useEffect, useRef } from "react";
import moment from "moment";
import { News } from "../models/homePageModel";
interface NewsProps {
  news: News[] | [];
}

const NewsComponent: React.FC<NewsProps> = ({ news }) => {
  const newsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("visible");
            target.style.transitionDelay = `${index * 0.7}s`;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = newsRef.current?.querySelectorAll(".fade-in");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  const filteredNews = news.filter((item) => item.isShown == true);
  const sortedNews = [...filteredNews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="section">
      <div dir="rtl" className="flex m-4 justify-between px-6 rtl text-right">
        <div className="section-title text-teal-800 text-2xl font-extrabold ">
          الأخبار
        </div>
        <div>
          {" "}
          <a
            href="#"
            className="inline-block mt-3  text-rose-900 text-sm hover:text-rose-900/80 transition-all"
          >
            قراءة المزيد &gt;
          </a>
        </div>
      </div>
      <div
        ref={newsRef}
        dir="rtl"
        className="m-4 font-tajawal grid grid-cols-1 md:grid-cols-2 gap-6 px-6 rtl text-right"
      >
        {sortedNews.map((item) => (
          <div
            key={item.id}
            className="fade-in opacity-0 transform translate-y-1 border-b-2  transition-all duration-1000 flex items-center bg-white  border-teal-500 rounded-lg news-shadow p-4 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="news-img flex-shrink-0 w-32 h-44 md:w-40 md:h-44 rounded-md overflow-hidden border-2 border-teal-800">
              <img
                className="w-full  h-full object-cover"
                src={`http://127.0.0.1:1337${item.image[0].url}`}
                alt={item.title}
              />
            </div>

            <div className="flex-grow pr-6">
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <i className="ml-2 fa-solid fa-calendar"></i>
                {moment(item.date).locale("ar").format("DD MMMM YYYY")}
              </p>

              <h5 className="my-3 text-sm md:text-xl lg:text-lg xl:text-lg font-bold tracking-tight text-gray-900 dark:text-white hover:text-rose-900 transition duration-300">
                {item.title}
              </h5>

              <p className="mt-1 text-gray-600 dark:text-gray-400 line-clamp-3 text-sm">
                {item.description}
              </p>

              <a
                href="#"
                className="inline-block mt-3  text-rose-900  text-sm hover:text-rose-900/80 transition-all"
              >
                قراءة المزيد &gt;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsComponent;
