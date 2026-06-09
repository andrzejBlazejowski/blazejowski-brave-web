export type CvProfile = {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  photoUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
};

export type CvProject = {
  id: string;
  title: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  featured?: boolean;
  imageUrl?: string;
};

export type CvEmployment = {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | "current";
  projects: CvProject[];
};

export type CvLanguage = {
  name: string;
  listening: string;
  reading: string;
  speaking: string;
  writing: string;
  isNative?: boolean;
};

export type CvEducation = {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
};

export type CvData = {
  profile: CvProfile;
  employments: CvEmployment[];
  education: CvEducation[];
  languages: CvLanguage[];
  skills: string[];
};
