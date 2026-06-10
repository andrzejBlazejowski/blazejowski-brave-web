import type { CvEducation, CvLanguage } from "@/lib/types/cv";

type SkillsSectionProps = {
  skills: string[];
  languages: CvLanguage[];
  education: CvEducation[];
};

const SKILL_ICONS = [
  { icon: "fa-react", variant: "brands" },
  { icon: "fa-server", variant: "solid" },
  { icon: "fa-laptop-code", variant: "solid" },
  { icon: "fa-js-square", variant: "brands" },
  { icon: "fa-cogs", variant: "solid" },
  { icon: "fa-tv", variant: "solid" },
] as const;

export function SkillsSection({
  skills,
  languages,
  education,
}: SkillsSectionProps) {
  return (
    <section id="two" className="main style2">
      <div className="container">
        <div className="row gtr-150">
          <div className="col-6 col-12-medium">
            <ul className="major-icons">
              {SKILL_ICONS.map(({ icon, variant }, index) => (
                <li key={icon}>
                  <span
                    className={`icon ${variant} style${(index % 6) + 1} major ${icon}`}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="col-6 col-12-medium">
            <header className="major">
              <h2>
                Skills &amp; Education
              </h2>
            </header>
            <p>{skills.join(" · ")}</p>
            {education.map((edu) => (
              <p key={edu.institution}>
                <strong>{edu.degree}</strong> — {edu.institution}
                <br />
                {edu.startDate} – {edu.endDate}
              </p>
            ))}
            <div className="table-wrapper">
              <table className="alt">
                <thead>
                  <tr>
                    <th>Language</th>
                    <th>Listening</th>
                    <th>Reading</th>
                    <th>Speaking</th>
                    <th>Writing</th>
                  </tr>
                </thead>
                <tbody>
                  {languages.map((lang) => (
                    <tr key={lang.name}>
                      <td>
                        {lang.name}
                        {lang.isNative ? " (native)" : ""}
                      </td>
                      <td>{lang.listening}</td>
                      <td>{lang.reading}</td>
                      <td>{lang.speaking}</td>
                      <td>{lang.writing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
