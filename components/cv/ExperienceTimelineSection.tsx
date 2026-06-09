import type { CvEmployment } from "@/lib/types/cv";

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

export function ExperienceTimelineSection({
  employments,
}: ExperienceTimelineSectionProps) {
  return (
    <section id="experience" className="main style1">
      <div className="container">
        <header className="major special">
          <h2>Work Experience</h2>
        </header>

        {employments.map((employment) => (
          <section key={employment.id}>
            <header>
              <h3>
                {employment.role} — {employment.company}
              </h3>
              <p>
                {formatDateRange(employment.startDate, employment.endDate)} ·{" "}
                {employment.location}
              </p>
            </header>

            {employment.projects.map((project) => (
              <div key={project.id}>
                <h4>{project.title}</h4>
                <p>{project.summary}</p>
                <ul>
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <p>
                  <strong>Key Technologies:</strong>{" "}
                  {project.technologies.join(", ")}
                </p>
              </div>
            ))}
            <hr />
          </section>
        ))}
      </div>
    </section>
  );
}
