import Link from "next/link";

export default function Hero() {
  return (
    <section className="container py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Make your ads <span className="text-cyan-300">talk back</span>.</h1>
          <p className="mt-4 text-white/80 max-w-xl">Interads turns any video ad into a two-way conversation. Viewers ask questions. The ad pauses. An AI avatar answers. Then the video resumes.</p>
          <div className="mt-6 flex gap-3">
            <Link href="/studio" className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-5 py-3 rounded-xl">Launch Studio</Link>
            <Link href="/player" className="border border-white/20 hover:bg-white/10 px-5 py-3 rounded-xl">See Live Demo</Link>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-3 shadow-xl fade-in">
          <video className="rounded-xl w-full" src="/sample-ad.mp4" controls playsInline />
        </div>
      </div>
    </section>
  );
}
