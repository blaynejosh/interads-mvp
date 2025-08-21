"use client";

import { useRef, useState } from "react";

async function postJSON(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function Player() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <div>
      <video ref={videoRef} width="600" controls>
        <source src="/sample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button onClick={handlePlayPause}>
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
}
