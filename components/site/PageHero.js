export default function PageHero({ eyebrow, title }) {
  return (
    <section className="bg-emerald-deep text-white">
      <div className="container-x py-16 sm:py-20">
        {eyebrow && <span className="eyebrow text-gold-light">{eyebrow}</span>}
        <h1 className="font-display text-4xl sm:text-5xl mt-4">{title}</h1>
      </div>
      <div className="arch-row text-sand" />
    </section>
  );
}
