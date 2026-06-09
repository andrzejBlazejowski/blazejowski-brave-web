import { staticCvData } from "@/lib/data/cv";
import type { CvData } from "@/lib/types/cv";

export async function getCvData(): Promise<CvData> {
  // Phase 1: static data
  // Phase 2: if (process.env.STRAPI_URL) fetch from Strapi and map to CvData
  return staticCvData;
}
