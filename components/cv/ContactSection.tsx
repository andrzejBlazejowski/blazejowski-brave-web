import type { CvProfile } from "@/lib/types/cv";

type ContactSectionProps = {
  profile: CvProfile;
};

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section id="four" className="main style2 special">
      <div className="container">
        <header className="major">
          <h2>Get in touch</h2>
        </header>
        <p>
          Interested in working together? Reach out via email — I&apos;m based in{" "}
          {profile.location}.
        </p>
        <ul className="actions special">
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="button wide primary"
            >
              Email Me
            </a>
          </li>
          <li>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="button wide">
              Call Me
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
