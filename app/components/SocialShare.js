import { useState } from "react";

export default function SocialShare({ videoUrl }) {
  const [loading, setLoading] = useState(false);

  async function handleShare(platform) {
    setLoading(true);
    try {
      const res = await fetch(`/api/share/${platform}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error("Error sharing video:", err);
      alert("Something went wrong while sharing.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-lg">Share your ad:</p>
      <div className="flex space-x-4">
        <button onClick={() => handleShare("facebook")} className="btn">
          Facebook
        </button>
        <button onClick={() => handleShare("instagram")} className="btn">
          Instagram
        </button>
        <button onClick={() => handleShare("twitter")} className="btn">
          Twitter
        </button>
        <button onClick={() => handleShare("tiktok")} className="btn">
          Tiktok
        </button>
      </div>
      {loading && <p>Uploading...</p>}
    </div>
  );
}
