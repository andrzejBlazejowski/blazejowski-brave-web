import type { CvProfile } from "@/lib/types/cv";

type AboutSectionProps = {
  profile: CvProfile;
};

export function AboutSection({ profile }: AboutSectionProps) {
  const photoUrl = profile.photoUrl ?? "/photon/images/pic01.jpg";

  return (
    <section id="one" className="main style1">
      <div className="container">
        <div className="row gtr-150">
          <div className="col-6 col-12-medium">
            <header className="major">
              <h2>
                About me
              </h2>
            </header>
            <p>{profile.summary}</p>
            <p>
              <strong>Location:</strong> {profile.location}
              <br />
              <strong>Email:</strong>{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <br />
              <strong>Phone:</strong> {profile.phone}
            </p>
          </div>
          <div className="col-6 col-12-medium imp-medium">
            <span className="image fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoUrl} alt={profile.name} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
