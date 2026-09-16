import Hero from "@/components/sections/Hero";
import FloatingExpertise from "@/components/sections/FloatingExpertise";
import HomepageStatistics from "@/components/sections/HomepageStatistics";
import OurExpertise from "@/components/sections/OurExpertise";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import DevelopmentSectors from "@/components/sections/DevelopmentSectors";
import BlogPreview from "@/components/sections/BlogPreview";
import EnquiryCTA from "@/components/sections/EnquiryCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FloatingExpertise />
      <HomepageStatistics />
      <OurExpertise />
      <FeaturedProjects />
      <DevelopmentSectors />
      <BlogPreview />
      <EnquiryCTA />
    </>
  );
}
