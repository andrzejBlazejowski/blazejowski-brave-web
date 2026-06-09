import type { CvProfile } from "@/lib/types/cv";

type HeaderSectionProps = {
  profile: CvProfile;
};

export function HeaderSection({ profile }: HeaderSectionProps) {
  return (
    <section id="header">
      <div className="inner">
        <span className="icon solid major fa-code"></span>
        <h1>
          Hi, I&apos;m <strong>{profile.name}</strong>,<br />
          {profile.title}.
        </h1>
        <p className="header-summary">{profile.summary}</p>
        <ul className="actions special">
          <li>
            <a href="#experience" className="button scrolly">
              View Experience
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
