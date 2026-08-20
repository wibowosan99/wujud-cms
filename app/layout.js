import "@fontsource/spectral/400.css";
import "@fontsource/spectral/500.css";
import "@fontsource/spectral/600.css";
import "@fontsource/spectral/700.css";
import "@fontsource/spectral/400-italic.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "./globals.css";
import SiteChrome from "@/components/site/SiteChrome";
import { getSettings } from "@/lib/data";

export async function generateMetadata() {
  const settings = getSettings();
  return {
    title: `${settings.tagline || "Umroh, Haji & Halal Tour"} | ${settings.site_name || "Wujud Tour & Travel"}`,
    description: settings.about_short || "Wujud Tour & Travel - Penyelenggara Umroh dan Haji terpercaya.",
  };
}

export default function RootLayout({ children }) {
  const settings = getSettings();
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-sand text-ink">
        <SiteChrome settings={settings}>{children}</SiteChrome>
      </body>
    </html>
  );
}
