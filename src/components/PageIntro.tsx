/** Początek podstrony: tytuł i jedno zdanie po lewej, obraz lub zdjęcie po prawej. */
export default function PageIntro({ title, lead, media, children }: { title: string; lead: string; media?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className={media ? "intro" : "intro intro-text"}>
      <div className="wide intro-in">
        <div className="intro-text-col">
          <h1 className="intro-title">{title}</h1>
          <p className="intro-lead">{lead}</p>
          {children}
        </div>
        {media && <div className="intro-media">{media}</div>}
      </div>
    </section>
  );
}
