"use client";

import React from "react";

import { StickyScroll } from "./ui/StickyScroll";


const content = [
  {
    title: "ویرایش گروهی",
    description: "به طور همزمان با تیم، مشتریان و ذینفعان خود همکاری کنید. در اسناد همکاری کنید، ایده‌ها را به اشتراک بگذارید و سریع تصمیم بگیرید. با پلتفرم ما، می‌توانید روند کار خود را بهینه کنید و بهره‌وری را افزایش دهید.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        ویرایش گروهی
      </div>
    ),
  },
  {
    title: "تغییرات در زمان واقعی",
    description: "تغییرات را در لحظه مشاهده کنید. با پلتفرم ما، می‌توانید هر تغییر را به‌صورت زنده پیگیری کنید. دیگر نگران جدیدترین نسخه پروژه‌تان نباشید. با آشفتگی کنترل نسخه خداحافظی کنید و سادگی به‌روزرسانی‌های زنده را در آغوش بگیرید.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "کنترل نسخه",
    description: "تجربه به‌روزرسانی‌های زمان واقعی و هرگز نگران کنترل نسخه نباشید. پلتفرم ما اطمینان می‌دهد که همیشه بر روی جدیدترین نسخه پروژه‌تان کار می‌کنید و نیازی به به‌روزرسانی‌های دستی مداوم نخواهید داشت. در جریان باشید، تیم خود را هماهنگ نگه‌دارید و روند کار خود را بدون هیچ وقفه‌ای حفظ کنید.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        کنترل نسخه
      </div>
    ),
  },
  {
    title: "در حال اتمام محتوا",
    description: "تجربه به‌روزرسانی‌های زمان واقعی و هرگز نگران کنترل نسخه نباشید. پلتفرم ما اطمینان می‌دهد که همیشه بر روی جدیدترین نسخه پروژه‌تان کار می‌کنید و نیازی به به‌روزرسانی‌های دستی مداوم نخواهید داشت. در جریان باشید، تیم خود را هماهنگ نگه‌دارید و روند کار خود را بدون هیچ وقفه‌ای حفظ کنید.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        در حال اتمام محتوا
      </div>
    ),
  },
];


export function ScrollReveal() {
  return (
    <section className="w-full py-4" dir="ltr">
      <StickyScroll content={content} />
    </section>
  );
}
