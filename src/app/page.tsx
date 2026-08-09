import ProfileSection from "@/components/ProfileSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-12 sm:py-20">
      <ProfileSection />
      <AboutSection />
      <WorkSection />
      <ProjectsSection />
      <TechStackSection />
      <Footer />
    </div>
  );
}
