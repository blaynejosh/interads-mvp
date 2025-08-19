"use client";
import { useRef, useState } from "react";

async function postJSON(url: string, data: any) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default function Player() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      const parts: Blob[] = [];
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) parts.push(e.data);
      };
      mr.onstop = async () => {
        const blob = new Blob(parts, { type: "audio/webm" });
        const fd = new FormData();
        fd.append("file", blob, "question.webm");
        // Pause the main video
        if (videoRef.current) videoRef.current.pause();
        showOverlay("Transcribing…");
        // 1) Transcribe
        const tRes = await fetch("/api/transcribe", { method: "POST", body: fd });
        const tJson = await tRes.json();
        const text = tJson.text || "";
        if (!text) {
          hideOverlay();
          if (videoRef.current) videoRef.current.play();
          return;
        }
        showOverlay("Thinking…");
        // 2) Ask LLM
        const { answer } = await postJSON("/api/ask", { question: text });
        showOverlay("Answering…");
        // 3) TTS
        const { audioDataUrl } = await postJSON("/api/tts", { text: answer });
        // Optional: call /api/avatar to get a video overlay (not yet wired for synchronous play)
        // Play audio
        await playAudio(audioDataUrl || "");
        hideOverlay();
        if (videoRef.current) videoRef.current.play();
      };
      mr.start();
      setMediaRecorder(mr);
      setRecording(true);
    } catch (err) {
      alert("Mic access denied or unavailable.");
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  async function playAudio(dataUrl: string) {
    if (!dataUrl) return;
    const audio = new Audio(dataUrl);
    await audio.play().catch(() => {});
    await new Promise<void>((res) => (audio.onended = () => res()));
  }

  function showOverlay(msg: string) {
    if (!overlayRef.current) return;
    overlayRef.current.querySelector("[data-label]")!.textContent = msg;
    overlayRef.current.classList.remove("hidden");
  }
  function hideOverlay() {
    overlayRef.current?.classList.add("hidden");
  }

  return (
    <div className="container py-8">
      <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10">
        <video ref={videoRef} src="/sample-ad.mp4" controls playsInline className="w-full" />
        <div ref={overlayRef} className="absolute inset-0 bg-black/60 hidden items-center justify-center">
          <div className="bg-black/70 border border-white/10 rounded-xl px-5 py-3">
            <span data-label>Answering…</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        {!recording ? (
          <button onClick={startRecording} className="bg-cyan-500 hover:scale-105 transition-transform text-black font-semibold px-5 py-3 rounded-xl">
            🎙️ Ask a question
          </button>
        ) : (
          <button onClick={stopRecording} className="bg-red-500 hover:scale-105 transition-transform text-white font-semibold px-5 py-3 rounded-xl">
            ⏹ Stop
          </button>
        )}
        <p className="text-white/70 self-center">Speak, then stop. The ad pauses, answers, then resumes.</p>
      </div>
    </div>
  );
}
