import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Pricing() {
  return (
    <>
      <Nav />
      <section className="container py-10">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <div className="grid sm:grid-cols-3 gap-6 mt-6">
          {["Starter", "Pro", "Enterprise"].map((t, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 p-5 bg-white/5"
            >
              <h3 className="font-semibold">{t}</h3>
              <p className="text-sm text-white/70">
                Great for{" "}
                {t === "Starter"
                  ? "tests"
                  : t === "Pro"
                  ? "growing teams"
                  : "large brands"}
                .
              </p>
              <button className="mt-4 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg">
                Choose {t}
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
