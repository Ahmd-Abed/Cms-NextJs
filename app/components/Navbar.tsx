import React from "react";
// import { wrapper } from "../redux/store";
// import { fetchHomeData } from "../redux/homePageSlice";
// import { homePageModel, NavbarItem } from "../models/homePageModel";
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
  if (!navbarItems) return <p>no data</p>;

  return (
    <div dir="rtl" className="bg-gray-100  flex text-right  justify-center">
      <nav className="w-full text-right">
        <ul className="flex flex-col md:flex-row items-center bg-white p-4 text-right">
          {navbarItems.map((item, index) => (
            <li key={index} className="relative group m-2">
              <a
                href={item.Link}
                className="text-lg font-semibold text-gray-800 hover:text-rose-900 transition duration-300"
              >
                {item.Label}
              </a>
              {/* Dropdown Menu */}
              {item.SubItem && (
                <ul className="absolute hidden group-hover:block z-20 w-28">
                  {item.SubItem.map((subLink, subIndex) => (
                    <li
                      key={subIndex}
                      className="m-1 bg-rose-800 px-4 text-white hover:bg-rose-900 transition transform hover:scale-105"
                    >
                      <a
                        href={subLink.Link}
                        className="block py-2  text-sm font-medium"
                      >
                        {subLink.Label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
