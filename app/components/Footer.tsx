export default function Footer() {
    return (
      <footer className="container py-8 text-sm text-white/70">
        <div className="flex flex-col sm:flex-row justify-between gap-3 border-t border-white/10 pt-6">
          <div>© {new Date().getFullYear()} Interads</div>
          <div className="space-x-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="mailto:hello@interads.example" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    );
  }
  