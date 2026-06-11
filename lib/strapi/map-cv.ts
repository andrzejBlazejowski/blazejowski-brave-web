import type { CvData } from "@/lib/types/cv";
import type {
  StrapiCvDocument,
  StrapiEmployment,
  StrapiProject,
} from "@/lib/strapi/types";

function mapProject(project: StrapiProject) {
  return {
    id: project.key,
    title: project.title,
    summary: project.summary,
    highlights: (project.highlights ?? []).map((highlight) => highlight.text),
    technologies: (project.technologies ?? []).map(
      (technology) => technology.name,
    ),
    featured: project.featured ?? false,
  };
}

function mapEmployment(employment: StrapiEmployment) {
  return {
    id: employment.key,
    company: employment.company,
    role: employment.role,
    location: employment.location ?? "",
    startDate: employment.startDate,
    endDate: employment.endDate as string | "current",
    projects: (employment.projects ?? []).map(mapProject),
  };
}

export function mapStrapiCvToCvData(document: StrapiCvDocument): CvData {
  return {
    profile: {
      name: document.profile.name,
      title: document.profile.title,
      summary: document.profile.summary,
      email: document.profile.email,
      phone: document.profile.phone ?? "",
      location: document.profile.location ?? "",
      githubUrl: document.profile.githubUrl,
      linkedinUrl: document.profile.linkedinUrl,
    },
    employments: (document.employments ?? []).map(mapEmployment),
    education: (document.education ?? []).map((entry) => ({
      institution: entry.institution,
      degree: entry.degree,
      startDate: entry.startDate,
      endDate: entry.endDate,
    })),
    languages: (document.languages ?? []).map((language) => ({
      name: language.name,
      listening: language.listening,
      reading: language.reading,
      speaking: language.speaking,
      writing: language.writing,
      isNative: language.isNative ?? false,
    })),
    skills: (document.skills ?? []).map((skill) => skill.name),
  };
}
