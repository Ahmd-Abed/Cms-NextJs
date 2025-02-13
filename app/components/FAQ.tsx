import React, { useState } from "react";
import { Faq } from "../models/homePageModel";
interface FAQProps {
  faq: Faq[] | [];
}
const FAQComponent: React.FC<FAQProps> = ({ faq }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      dir="rtl"
      id="accordion-color"
      className="my-5 p-5 bg-gray-100"
      data-accordion="collapse"
    >
      {faq
        .filter((item) => item.isShown == true)
        .map((item, index) => (
          <div key={index}>
            <h2 id={`accordion-color-heading-${index}`}>
              <button
                type="button"
                className={`flex items-center text-black justify-between w-full p-5 font-medium rtl:text-right border border-b-0 border-gray-200 dark:focus:ring-rose-800/20 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-200/30 dark:hover:bg-gray-800 gap-6 shape ${
                  openIndex === index ? "bg-gray-200 text-rose-900 open" : ""
                }`}
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`accordion-color-body-${index}`}
              >
                <span className="text-lg font-bold ">{item.question}</span>
                <svg
                  data-accordion-icon
                  className={`w-3 h-3 transform transition-all ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke={openIndex === index ? "#79133e" : "#79133e8a"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id={`accordion-color-body-${index}`}
              className={`${openIndex === index ? "block" : "hidden"}`}
              aria-labelledby={`accordion-color-heading-${index}`}
            >
              <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <p className="mb-2 text-gray-500 dark:text-black">
                  <span className="flex items-center ">
                    <svg
                      className="w-4 h-4 m-1 text-rose-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 10 16"
                    >
                      <path d="M8.766.566A2 2 0 0 0 6.586 1L1 6.586a2 2 0 0 0 0 2.828L6.586 15A2 2 0 0 0 10 13.586V2.414A2 2 0 0 0 8.766.566Z" />
                    </svg>
                    {item.answer}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FAQComponent;
