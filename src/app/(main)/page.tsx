import { HeroSection } from "@/components/home/HeroSection";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { ServicesBanner } from "@/components/home/ServicesBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryTabs />
      <ServicesBanner />
    </>
  );
}
