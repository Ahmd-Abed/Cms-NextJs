import React, { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("photos");

  return (
    <div dir="rtl" className="section m-4 px-6">
      <div className="flex items-center gap-x-20 text-right">
        <h2 className=" section-title text-teal-800 text-2xl font-extrabold">
          الملف الاعلامي
        </h2>
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {[
            { id: "photos", label: "الصور" },
            { id: "videos", label: "الفيديوهات" },
            { id: "articles", label: "المقالات" },
            { id: "releases", label: "الإصدارات" },
          ].map((tab) => (
            <li key={tab.id} className="me-2">
              <button
                className={`inline-block p-4 border-b-2 font-bold text-lg rounded-t-lg transition duration-300 ${
                  activeTab === tab.id
                    ? "text-rose-800 border-rose-800"
                    : "text-gray-500 hover:text-gray-600 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mt-4">
        {activeTab === "photos" && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            هذا هو محتوى قسم{" "}
            <strong className="text-gray-800 dark:text-white">الصور</strong>.
          </p>
        )}
        {activeTab === "videos" && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            هذا هو محتوى قسم{" "}
            <strong className="text-gray-800 dark:text-white">
              الفيديوهات
            </strong>
            .
          </p>
        )}
        {activeTab === "articles" && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            هذا هو محتوى قسم{" "}
            <strong className="text-gray-800 dark:text-white">المقالات</strong>.
          </p>
        )}
        {activeTab === "releases" && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            هذا هو محتوى قسم{" "}
            <strong className="text-gray-800 dark:text-white">الإصدارات</strong>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default Tabs;
