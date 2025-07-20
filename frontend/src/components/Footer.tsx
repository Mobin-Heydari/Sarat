import React from "react";
import { Vortex } from "./ui/Vortex";
import { FaGithub, FaGitlab, FaLinkedin, FaLocationArrow } from "react-icons/fa";
import Link from "next/link";

const socialMedia = [
  {
    id: 1,
    icon: <FaGithub className="text-main-text-light dark:text-main-text-dark hover:text-primary-light dark:hover:text-primary-dark bg-base-light dark:bg-base-dark"/>,
    url: "https://github.com/Mobin-Heydari"
  },
  {
    id: 2,
    icon: <FaGitlab className="text-main-text-light dark:text-main-text-dark hover:text-primary-light dark:hover:text-primary-dark bg-base-light dark:bg-base-dark"/>,
    url: "https://gitlab.com/Mobin_Developer"
  },
  {
    id: 3,
    icon: <FaLinkedin className="text-main-text-light dark:text-main-text-dark hover:text-primary-light dark:hover:text-primary-dark bg-base-light dark:bg-base-dark"/>,
    url: "https://www.linkedin.com/in/mobin--heydari/"
  },
];

export function Footer() {
  return (
    <footer className="w-[calc(100%-4rem)] mx-auto rounded-md h-[30rem] overflow-hidden">
      <Vortex className="flex flex-col items-center justify-center px-2 md:px-10 py-4 w-full h-full" particleCount={3000}>
        <div className="w-full absolute left-0 -bottom-72 min-h-96">
          <img src="/footer-grid.svg" alt="footer grid" className="w-full h-full opacity-10"/>
        </div>
        <div className="flex flex-col items-center">
          <h4 className="text-2xl w-full text-center text-main-text-light dark:text-main-text-dark">
            آماده‌اید که حضور دیجیتال خود را به سطح بعدی برسانید؟ بیایید این سفر را با هم شروع کنیم.
          </h4>
          <p className="text-center my-5 text-2xl bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-primary-light via-success-light to-selected-light  dark:from-primary-dark dark:via-success-dark dark:to-selected-dark [text-shadow:0_0_rgba(0,0,0,0.1)] font-bold">
            بر روی دکمه زیر کلیک کنید و بیایید با هم ارتباط برقرار کنیم!
          </p>
          <Link href="/contact-us">
            تماس با ما
          </Link>
        </div>
        <div className="w-full h-full flex md:flex-row flex-col justify-between items-center">
          <p className="md:text-HighlightText text-lg font-bold text-main-text-light dark:text-main-text-dark">
            کپی رایت ©2025 مبین حیدری
          </p>
          <div className="flex items-center md:gap-3 gap-6">
            {socialMedia.map((item) => (
              <div
                key={item.id}
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg"
              >
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.icon}
                </a>
              </div>
            ))}
          </div>
        </div>
      </Vortex>
    </footer>
  );
}

export default Footer;