export default function SectionHeading({ eyebrow, title, description, align = 'left', light = false }) {
  return (
    <div className={align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'}>
      {eyebrow && (
        <span className={`eyebrow ${light ? 'text-gold-light' : 'text-gold'}`}>{eyebrow}</span>
      )}
      <h2 className={`font-display text-3xl sm:text-4xl mt-3 leading-tight ${light ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      <div className={`h-px w-14 mt-5 ${align === 'center' ? 'mx-auto' : ''} ${light ? 'bg-gold-light' : 'bg-gold'}`} />
      {description && (
        <p className={`mt-5 leading-relaxed ${light ? 'text-sand/70' : 'text-ink/65'}`}>{description}</p>
      )}
    </div>
  );
}
