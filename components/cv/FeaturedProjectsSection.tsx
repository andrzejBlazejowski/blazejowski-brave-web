import { publicAssetPath } from "@/lib/build-target";
import type { CvEmployment } from "@/lib/types/cv";

type FeaturedProjectsSectionProps = {
  employments: CvEmployment[];
};

const FALLBACK_IMAGES = [
  publicAssetPath("/photon/images/pic02.jpg"),
  publicAssetPath("/photon/images/pic03.jpg"),
  publicAssetPath("/photon/images/pic04.jpg"),
];

function formatDateRange(start: string, end: string | "current"): string {
  const startYear = start.slice(0, 4);
  const endLabel = end === "current" ? "current" : end.slice(0, 4);
  return `${startYear} – ${endLabel}`;
}

export function FeaturedProjectsSection({
  employments,
}: FeaturedProjectsSectionProps) {
  const featuredProjects = employments
    .flatMap((employment) =>
      employment.projects
        .filter((project) => project.featured)
        .map((project) => ({ project, employment })),
    )
    .slice(0, 3);

  return (
    <section id="three" className="main style1 special">
      <div className="container">
        <header className="major">
          <h2>Featured Projects</h2>
        </header>
        <p>Highlighted work across food delivery, IPTV/VOD, and streaming SDK development.</p>
        <div className="row gtr-150">
          {featuredProjects.map(({ project, employment }, index) => (
            <div key={project.id} className="col-4 col-12-medium">
              <span className="image fit">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    project.imageUrl ??
                    FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
                  }
                  alt={project.title}
                />
              </span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <p>
                <em>
                  {employment.company} ·{" "}
                  {formatDateRange(employment.startDate, employment.endDate)}
                </em>
              </p>
              <ul className="actions special">
                <li>
                  <a href="#experience" className="button scrolly">
                    Details
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
