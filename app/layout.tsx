import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interads — Conversational Video Ads",
  description: "Turn your video ad into a two-way conversation with AI avatars.",
  /** other descriptions or USP for the website will be "increase impressions on your video ads with two conversations with AI avatar", "speed up conversions on your ads with two conversations with AI avatar" 
   * also this can be used to gathered pressing uestions within the market concerning your product by the USP saying "gather real user painpoints with Interads"
  */
  openGraph: {
    title: "Interads — Conversational Video Ads",
    description: "AI avatars that answer questions while your ad plays.",
    url: "https://example.com",
    siteName: "Interads",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Interads" }],
    type: "website"
  },
  twitter: { card: "summary_large_image", creator: "@yourhandle" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Interads",
    "applicationCategory": "Advertising",
    "operatingSystem": "Web"
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
