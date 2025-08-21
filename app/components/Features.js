const items = [
    { title: "Real-time Q&A", desc: "Pause any video and let an AI avatar answer on the spot." },
    { title: "Omni-channel", desc: "Use on your site, CTV, and post links across social platforms." },
    { title: "Analytics", desc: "See top questions, dwell time, and conversions." },
    { title: "Secure & Compliant", desc: "Privacy-first recording, consent prompts, and audit logs." }
  ];
  
  export default function Features() {
    return (
      <section className="container py-10">
        <h2 className="text-2xl font-bold mb-6">Why Interads</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <div key={i} className="rounded-xl border border-white/10 p-4 bg-white/5">
              <h3 className="font-semibold">{it.title}</h3>
              <p className="text-white/80 text-sm mt-2">{it.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  