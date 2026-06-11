import { mapStrapiCvToCvData } from "@/lib/strapi/map-cv";
import type { CvData } from "@/lib/types/cv";
import type { StrapiCvResponse } from "@/lib/strapi/types";

const CV_POPULATE_QUERY = new URLSearchParams([
  ["status", "published"],
  ["populate[0]", "profile"],
  ["populate[1]", "employments"],
  ["populate[2]", "employments.projects"],
  ["populate[3]", "employments.projects.highlights"],
  ["populate[4]", "employments.projects.technologies"],
  ["populate[5]", "education"],
  ["populate[6]", "languages"],
  ["populate[7]", "skills"],
]);

function getStrapiConfig() {
  const url = process.env.STRAPI_URL?.replace(/\/$/, "");
  const token = process.env.STRAPI_API_TOKEN;

  if (!url) {
    return null;
  }

  return { url, token };
}

export function isStrapiConfigured(): boolean {
  return getStrapiConfig() !== null;
}

export async function fetchCvFromStrapi(): Promise<CvData> {
  const config = getStrapiConfig();

  if (!config) {
    throw new Error("STRAPI_URL is not configured");
  }

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (config.token) {
    headers.Authorization = `Bearer ${config.token}`;
  }

  const response = await fetch(
    `${config.url}/api/cv?${CV_POPULATE_QUERY.toString()}`,
    {
      headers,
      next: { revalidate: false },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Strapi request failed (${response.status} ${response.statusText})`,
    );
  }

  const payload = (await response.json()) as StrapiCvResponse;

  if (!payload.data) {
    throw new Error("Strapi returned no CV document");
  }

  return mapStrapiCvToCvData(payload.data);
}
