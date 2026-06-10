import type { CvEmployment } from "@/lib/types/cv";

import "./experience-timeline.css";

type ExperienceTimelineSectionProps = {
  employments: CvEmployment[];
};

function formatDateRange(start: string, end: string | "current"): string {
  const formatPart = (value: string) => {
    const [year, month] = value.split("-");
    return `${month}/${year}`;
  };

  const endLabel = end === "current" ? "Current" : formatPart(end);
  return `${formatPart(start)} – ${endLabel}`;
}

function getEventTypeClass(index: number): string {
  const typeIndex = index % 3;
  if (typeIndex === 1) {
    return "experience-timeline__event--type2";
  }
  if (typeIndex === 2) {
    return "experience-timeline__event--type3";
  }
  return "";
}

export function ExperienceTimelineSection({
  employments,
}: ExperienceTimelineSectionProps) {
  return (
    <section id="experience" className="main style1">
      <div className="container">
        <header className="major special">
          <h2>Work Experience</h2>
        </header>

        <div className="experience-timeline">
          {employments.map((employment, index) => (
            <article
              key={employment.id}
              className={`experience-timeline__event ${getEventTypeClass(index)}`.trim()}
            >
              <div className="experience-timeline__icon" aria-hidden="true">
                <i className="fa fa-briefcase" />
              </div>

              <div className="experience-timeline__date">
                <span>{formatDateRange(employment.startDate, employment.endDate)}</span>
                <span className="experience-timeline__date-location">
                  {employment.location}
                </span>
              </div>

              <div className="experience-timeline__content">
                <h3 className="experience-timeline__title">{employment.role}</h3>
                <p className="experience-timeline__company">{employment.company}</p>

                {employment.projects.map((project) => (
                  <div key={project.id} className="experience-timeline__project">
                    <h4 className="experience-timeline__project-title">
                      {project.title}
                    </h4>
                    <p className="experience-timeline__project-summary">
                      {project.summary}
                    </p>
                    <ul className="experience-timeline__highlights">
                      {project.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <div className="experience-timeline__tech">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="experience-timeline__tech-tag"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
