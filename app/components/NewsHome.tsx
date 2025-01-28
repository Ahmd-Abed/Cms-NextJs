import React, { useEffect, useRef } from "react";
import moment from "moment";

interface NewsImages {
  url: string;
}

interface INews {
  id: number;
  Title: string;
  Description: string;
  Image: NewsImages[];
  Date: Date;
}

interface NewsProps {
  news: INews[] | [];
}

const News: React.FC<NewsProps> = ({ news }) => {
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

  const sortedNews = [...news].sort(
    (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
  );

  return (
    <div
      ref={newsRef}
      dir="rtl"
      className="flex flex-wrap justify-around m-4 rtl text-right"
    >
      {sortedNews.map((item) => (
        <div
          key={item.id}
          className="fade-in opacity-0 transform translate-y-1 transition-all duration-1000 mb-2 max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <img
              className="rounded-t-lg max-h-150 w-96 news-img"
              src={`http://127.0.0.1:1337${item.Image[0].url}`}
              alt={item.Title}
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-rose-900 transition duration-300">
                {item.Title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
              {item.Description}
            </p>
            <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
              {moment(item.Date).locale("ar").format("DD MMMM YYYY")}
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-900 rounded-lg hover:bg-rose-900/90 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              اقرأ المزيد
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
