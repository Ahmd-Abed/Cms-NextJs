import React, { useEffect, useRef } from "react";

interface FooterItem {
  id: number;
  Label: string;
  Link: string;
  IsShown: boolean;
  Footer: FooterItem[];
}

interface FooterProps {
  footerItems: FooterItem[] | [];
}

const Footer: React.FC<FooterProps> = ({ footerItems }) => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add("visible");
            target.style.transitionDelay = `${index * 0.07}s`;
          } else {
            target.classList.remove("visible"); // Remove the class when scrolling away
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = footerRef.current?.querySelectorAll(".fade-in");
    elements?.forEach((el) => observer.observe(el as HTMLElement));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={footerRef}>
      <footer className="bg-[#900C33] text-white py-8 px-[100px] bg-cover bg-center footer">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-x-12 text-center sm:text-right">
          {footerItems.map((item) => (
            <div
              key={item.id}
              className="fade-in opacity-0 transform translate-y-200 transition-all duration-1000"
            >
              <div className="mb-4">
                <h4 className="font-bold text-lg">{item.Label}</h4>
                <div className="border-b-2 border-white w-full mt-2"></div>
              </div>
              <ul className="space-y-2">
                {item.Footer.length > 0 ? (
                  item.Footer.map((subItem) => (
                    <li
                      key={subItem.id}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <a href={subItem.Link} className="foot-links">
                        {subItem.Label}
                      </a>
                    </li>
                  ))
                ) : (
                  <li>
                    <a href={item.Link} className="hover:underline">
                      {item.Label}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center mt-8">
          <div className="flex justify-center space-x-4 rtl:space-x-reverse text-lg mb-4">
            <a href="#" className="hover:opacity-80">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:opacity-80">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:opacity-80">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:opacity-80">
              <i className="fab fa-snapchat"></i>
            </a>
            <a href="#" className="hover:opacity-80">
              <i className="fab fa-youtube"></i>
            </a>
          </div>

          <p className="text-sm">
            المجلس البلدي المركزي | كل الحقوق محفوظة. سياسة الموقع يتم صيانة
            الموقع الإلكتروني وإدارته من قبل المجلس البلدي المركزي © حقوق الطبع
            والنشر | {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
