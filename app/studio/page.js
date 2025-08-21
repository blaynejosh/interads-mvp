import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Link from "next/link";

export default function StudioPage() {
  return (
    <>
      <Nav />
      <section className="container py-10">
        <h1 className="text-3xl font-bold">Studio (MVP)</h1>
        <p className="text-white/80 mt-2 max-w-2xl">
          Upload your video, paste product FAQs (used as context), and choose an avatar voice.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 p-4 bg-white/5">
            <h3 className="font-semibold mb-2">Upload Video</h3>
            <input type="file" accept="video/*" className="block w-full text-sm" />
            <p className="text-xs text-white/60 mt-2">
              Uploads are not persisted in MVP. Replace public/sample-ad.mp4 locally to test.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 p-4 bg-white/5">
            <h3 className="font-semibold mb-2">Knowledge Base</h3>
            <textarea
              className="w-full h-32 rounded-lg bg-black/40 border border-white/10 p-2"
              placeholder="Paste product FAQs here"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
