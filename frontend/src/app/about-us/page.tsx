import { Metadata } from 'next';
import { BsPeople } from 'react-icons/bs';



import HeroSection from '@/components/HeroSection';
import AboutMission from '@/components/about/AboutMission';
import AboutStats from '@/components/about/AboutStats';
import AboutTeam from '@/components/about/AboutTeam';
import AboutHistory from '@/components/about/AboutHistory';
import AboutValues from '@/components/about/AboutValues';
import AboutJoinUs from '@/components/about/AboutJoinUs';



export const metadata: Metadata = {
  title: 'درباره‌ی ما',
  description: 'آشنایی با گروه سرود صراط، اهداف، اعضا، ارزش‌ها و مسیر فعالیت‌های فرهنگی و هنری.',
};

export default function AboutUs() {
  return (
    <main className="flex flex-col gap-16 px-4 md:px-12 py-10">
      <HeroSection
        title="درباره‌ی گروه صراط"
        mainText="با ما بیشتر آشنا شوید"
        subText="مسیر فرهنگی و هنری ما را بشناسید"
        buttonTitle="تماس با ما"
        buttonIcon={<BsPeople />}
        buttonPosition="right"
        buttonUrl="/contact"
      />

      <AboutMission />
      <AboutStats />
      <AboutValues />
      <AboutTeam />
      <AboutHistory />
      <AboutJoinUs />
    </main>
  );
}
