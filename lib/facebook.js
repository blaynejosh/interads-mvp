export async function uploadToFacebook(videoUrl) {
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  const uploadUrl = `https://graph-video.facebook.com/${pageId}/videos`;

  const response = await fetch(uploadUrl, {
    method: "POST",
    body: new URLSearchParams({
      access_token: pageAccessToken,
      file_url: videoUrl,
      description: "Posted via Interads 🚀",
    }),
  });

  if (!response.ok) {
    throw new Error("Facebook upload failed");
  }

  return response.json();
}
