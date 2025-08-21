import "../styles/globals.css";

export const metadata = {
  title: "Interads — Conversational Video Ads",
  description: "Turn any video ad into a two-way conversation with real-time AI avatars.",
  openGraph: {
    title: "Interads — Conversational Video Ads",
    description: "AI avatars that answer questions while your ad plays.",
    url: "https://example.com",
    siteName: "Interads",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Interads" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", creator: "@yourhandle" },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Interads",
    applicationCategory: "Advertising",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
