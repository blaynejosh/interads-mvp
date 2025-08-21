// pages/api/share/facebook.js
import { uploadToFacebook } from "../../../lib/facebook";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { videoUrl } = req.body;

    // call the helper
    const result = await uploadToFacebook(videoUrl);

    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to share video" });
  }
}
