export function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-6" style={{marginBottom: 'var(--s-12)'}}>
      <div style={{maxWidth: '40rem'}}>
        {eyebrow ? (
          <span className="section-eyebrow">{eyebrow}</span>
        ) : null}
        <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.1}}>{title}</h2>
        {description ? (
          <p style={{marginTop: 'var(--s-4)', color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6}}>{description}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
