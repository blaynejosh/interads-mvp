"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const path = usePathname();
  const link = (href: string, label: string) => (
    <Link href={href} className={`px-3 py-2 rounded-xl hover:bg-white/10 ${path === href ? "bg-white/10" : ""}`}>
      {label}
    </Link>
  );
  return (
    <nav className="container py-4 flex items-center justify-between">
      <Link href="/" className="font-bold text-xl">Interads</Link>
      <div className="flex items-center gap-2">
        {link("/", "Home")}
        {link("/studio", "Studio")}
        {link("/player", "Demo Player")}
        {link("/pricing", "Pricing")}
      </div>
    </nav>
  );
}
