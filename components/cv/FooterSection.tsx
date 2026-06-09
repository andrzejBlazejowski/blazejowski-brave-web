import type { CvProfile } from "@/lib/types/cv";

type FooterSectionProps = {
  profile: CvProfile;
};

export function FooterSection({ profile }: FooterSectionProps) {
  const year = new Date().getFullYear();

  return (
    <section id="footer">
      <ul className="icons">
        {profile.githubUrl ? (
          <li>
            <a
              href={profile.githubUrl}
              className="icon brands alt fa-github"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="label">GitHub</span>
            </a>
          </li>
        ) : null}
        {profile.linkedinUrl ? (
          <li>
            <a
              href={profile.linkedinUrl}
              className="icon brands alt fa-linkedin-in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="label">LinkedIn</span>
            </a>
          </li>
        ) : null}
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="icon solid alt fa-envelope"
          >
            <span className="label">Email</span>
          </a>
        </li>
      </ul>
      <ul className="copyright">
        <li>&copy; {year} {profile.name}</li>
        <li>
          Design: <a href="https://html5up.net">HTML5 UP</a>
        </li>
      </ul>
    </section>
  );
}
