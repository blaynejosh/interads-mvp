import "../styles/globals.css";

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
        <title>Interads — Conversational Video Ads</title>
        <meta
          name="description"
          content="Turn any video ad into a two-way conversation with real-time AI avatars."
        />

        {/* OpenGraph */}
        <meta property="og:title" content="Interads — Conversational Video Ads" />
        <meta
          property="og:description"
          content="AI avatars that answer questions while your ad plays."
        />
        <meta property="og:url" content="https://example.com" />
        <meta property="og:site_name" content="Interads" />
        <meta property="og:image" content="/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@yourhandle" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
