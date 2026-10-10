import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-[#111111] bg-[#F4F0E6] sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group inline-flex flex-col">
          <span className="font-serif text-3xl sm:text-4xl text-[#111111] tracking-tight leading-none group-hover:text-[#1F6F43] transition-colors">
            LEGEND
          </span>
          <span className="font-condensed text-[11px] uppercase tracking-[0.2em] text-[#555555] font-semibold mt-0.5">
            Player Matcher
          </span>
        </Link>

        {/* Menu button only */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="border border-[#111111] px-3.5 py-1.5 text-xs font-condensed uppercase tracking-wider font-bold text-[#111111] bg-[#FAF8F2] hover:bg-[#EAE4D4] rounded-[2px] transition-colors cursor-pointer"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Navigation Drawer */}
      {menuOpen && (
        <nav
          aria-label="Main navigation"
          className="border-t border-[#111111] bg-[#FAF8F2] px-4 py-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]"
        >
          <div className="max-w-5xl mx-auto flex flex-col gap-3">
            <Link
              to="/quiz"
              onClick={() => setMenuOpen(false)}
              className="py-2 text-base font-condensed uppercase tracking-wider font-bold text-[#1F6F43] border-b border-[#D8D2C2] hover:text-[#165231]"
            >
              Start Quiz (4 Questions)
            </Link>

            <div className="py-2 border-b border-[#D8D2C2]">
              <span className="text-xs font-condensed uppercase tracking-widest text-[#555555] block mb-1.5 font-bold">
                Leagues
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm font-condensed uppercase tracking-wider text-[#111111]">
                <Link
                  to="/league/premier-league"
                  onClick={() => setMenuOpen(false)}
                  className="py-1 hover:text-[#1F6F43]"
                >
                  Premier League
                </Link>
                <Link
                  to="/league/la-liga"
                  onClick={() => setMenuOpen(false)}
                  className="py-1 hover:text-[#1F6F43]"
                >
                  La Liga
                </Link>
                <Link
                  to="/league/serie-a"
                  onClick={() => setMenuOpen(false)}
                  className="py-1 hover:text-[#1F6F43]"
                >
                  Serie A
                </Link>
                <Link
                  to="/league/bundesliga"
                  onClick={() => setMenuOpen(false)}
                  className="py-1 hover:text-[#1F6F43]"
                >
                  Bundesliga
                </Link>
                <Link
                  to="/league/ligue-1"
                  onClick={() => setMenuOpen(false)}
                  className="py-1 hover:text-[#1F6F43]"
                >
                  Ligue 1
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-1 text-sm font-condensed uppercase tracking-wider text-[#111111]">
              <Link
                to="/how-it-works"
                onClick={() => setMenuOpen(false)}
                className="py-1 hover:text-[#1F6F43]"
              >
                How It Works
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="py-1 hover:text-[#1F6F43]"
              >
                About
              </Link>
              <Link
                to="/privacy"
                onClick={() => setMenuOpen(false)}
                className="py-1 hover:text-[#1F6F43]"
              >
                Privacy
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="py-1 hover:text-[#1F6F43]"
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
