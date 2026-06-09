import { AboutSection } from "@/components/cv/AboutSection";
import { ContactSection } from "@/components/cv/ContactSection";
import { ExperienceTimelineSection } from "@/components/cv/ExperienceTimelineSection";
import { FeaturedProjectsSection } from "@/components/cv/FeaturedProjectsSection";
import { FooterSection } from "@/components/cv/FooterSection";
import { HeaderSection } from "@/components/cv/HeaderSection";
import { PhotonEffects } from "@/components/cv/PhotonEffects";
import { SkillsSection } from "@/components/cv/SkillsSection";
import { getCvData } from "@/lib/services/cv";

export default async function Home() {
  const cv = await getCvData();

  return (
    <>
      <HeaderSection profile={cv.profile} />
      <AboutSection profile={cv.profile} />
      <SkillsSection
        skills={cv.skills}
        languages={cv.languages}
        education={cv.education}
      />
      <FeaturedProjectsSection employments={cv.employments} />
      <ExperienceTimelineSection employments={cv.employments} />
      <ContactSection profile={cv.profile} />
      <FooterSection profile={cv.profile} />
      <PhotonEffects />
    </>
  );
}
