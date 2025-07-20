"use client";

import { FaHome, FaInstalod, FaSmileBeam } from "react-icons/fa";
import { FaPlay, FaPhotoFilm, FaPhoneFlip, FaTableList } from "react-icons/fa6";
import { FloatingNav } from "./ui/FloatingNavbar";


interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}


export default function Navbar() {
  const navItems = [
        { name: "خانه", href: "/", icon: <FaHome /> },
        { name: "درباره", href: "/about-us", icon: <FaTableList /> },
        { name: "نماهنگ ", href: "/cliparts", icon: <FaPhotoFilm /> },
        { name: "استوری", href: "/stories", icon: <FaInstalod  /> },
        { name: "صوت", href: "/musics", icon: <FaPlay /> },
        { name: "بامزه ها", href: "/funnies", icon: <FaSmileBeam /> },
        { name: "تماس باما", href: "/contact-us", icon: <FaPhoneFlip /> },
  ]

  return (
    <FloatingNav navItems={navItems}/>
  );
}