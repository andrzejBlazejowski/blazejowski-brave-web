export type StrapiHighlight = {
  id?: number;
  text: string;
};

export type StrapiTechnology = {
  id?: number;
  name: string;
};

export type StrapiProject = {
  id?: number;
  key: string;
  title: string;
  summary: string;
  featured?: boolean;
  highlights?: StrapiHighlight[];
  technologies?: StrapiTechnology[];
};

export type StrapiEmployment = {
  id?: number;
  key: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  projects?: StrapiProject[];
};

export type StrapiProfile = {
  id?: number;
  name: string;
  title: string;
  summary: string;
  email: string;
  phone?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
};

export type StrapiEducation = {
  id?: number;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
};

export type StrapiLanguage = {
  id?: number;
  name: string;
  listening: string;
  reading: string;
  speaking: string;
  writing: string;
  isNative?: boolean;
};

export type StrapiSkill = {
  id?: number;
  name: string;
};

export type StrapiCvDocument = {
  id?: number;
  documentId?: string;
  profile: StrapiProfile;
  employments?: StrapiEmployment[];
  education?: StrapiEducation[];
  languages?: StrapiLanguage[];
  skills?: StrapiSkill[];
};

export type StrapiCvResponse = {
  data: StrapiCvDocument | null;
  meta?: Record<string, unknown>;
};
