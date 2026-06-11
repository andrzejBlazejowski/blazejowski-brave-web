import { staticCvData } from "@/lib/data/cv";
import { fetchCvFromStrapi, isStrapiConfigured } from "@/lib/strapi/fetch-cv";
import type { CvData } from "@/lib/types/cv";

export async function getCvData(): Promise<CvData> {
  if (!isStrapiConfigured()) {
    return staticCvData;
  }

  return fetchCvFromStrapi();
}
