'use client';

// Infinite auto-scrolling logo row. Duplicates the list so the CSS
// translateX(-50%) loop is seamless regardless of how many logos there are.
export default function LogoMarquee({ partners }) {
  const loop = [...partners, ...partners];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
      <div className="flex w-max animate-marquee">
        {loop.map((p, i) => (
          <div key={`${p.id}-${i}`} className="flex items-center justify-center px-10 shrink-0">
            {p.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.logo} alt={p.name} className="h-9 w-auto grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition" />
            ) : (
              <span className="text-sm font-medium text-ink/50 whitespace-nowrap">{p.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
