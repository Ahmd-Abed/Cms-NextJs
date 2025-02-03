import React, { useState } from "react";
import Image from "next/image";
import logo from "@/JOIN-LOGO.png";

interface NavBarItem {
  id: number;
  Label: string;
  Link: string;
  IsShown: boolean;
  SubItem: NavBarItem[]; // Recursive type for sub-items
}

interface NavbarProps {
  navbarItems: NavBarItem[] | [];
}

const NavBar: React.FC<NavbarProps> = ({ navbarItems }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleItemClick = (id: number) => {
    setActiveItem(id);
  };

  return (
    <nav
      className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 abolute w-100 z-index "
      dir="rtl"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4 justify-around">
        {/* Logo Section */}
        <a href="#" className="flex items-center">
          <Image src={logo} alt="" width={300} />
        </a>

        {/* Navbar Items */}
        <div className="hidden w-full md:block md:w-auto">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navbarItems.map((item) => (
              <li
                key={item.id}
                className={`relative group ${
                  activeItem === item.id
                    ? " border-custom"
                    : "border-custom-animation-bottom"
                }`}
              >
                {item.SubItem &&
                item.SubItem.filter((item) => item.IsShown == true).length >
                  0 ? (
                  <>
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                    >
                      {item.Label}
                      <svg
                        className="w-2.5 h-2.5 ms-2.5 transform transition-transform duration-300 group-hover:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <div className="absolute hidden  group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                        {item.SubItem.filter(
                          (item) => item.IsShown == true
                        ).map((subItem) => (
                          <li
                            key={subItem.id}
                            className={`relative group ${
                              activeItem === item.id
                                ? " border-custom"
                                : "border-custom-animation-right"
                            }`}
                          >
                            <a
                              href={subItem.Link}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              {subItem.Label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <a
                    onClick={() => handleItemClick(item.id)}
                    href={item.Link}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-black-700 md:p-0 dark:text-white md:dark:hover:text-black-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {item.Label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
