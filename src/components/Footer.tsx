import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-[#111111] bg-[#EAE4D4] mt-16 pt-10 pb-12 text-[#111111]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#D8D2C2]">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-serif text-2xl tracking-tight block">LEGEND</span>
            <span className="font-condensed text-xs uppercase tracking-widest text-[#555555] block mt-1">
              Player Matcher
            </span>
            <p className="text-xs text-[#555555] mt-3 leading-relaxed">
              Match your game to a football legend.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-condensed text-xs uppercase font-bold tracking-widest text-[#111111] mb-3">
              The Matcher
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/quiz" className="hover:text-[#1F6F43] transition-colors underline-offset-2 hover:underline">
                  Take the quiz
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[#1F6F43] transition-colors underline-offset-2 hover:underline">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/players" className="hover:text-[#1F6F43] transition-colors underline-offset-2 hover:underline">
                  All Players
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#1F6F43] transition-colors underline-offset-2 hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* League indexes */}
          <div>
            <h4 className="font-condensed text-xs uppercase font-bold tracking-widest text-[#111111] mb-3">
              Leagues
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/league/premier-league" className="hover:text-[#1F6F43] transition-colors underline-offset-2 hover:underline">
                  Premier League
                </Link>
              </li>
              <li>
                <Link to="/league/la-liga" className="hover:text-[#1F6F43] transition-colors underline-offset-2 hover:underline">
                  La Liga
                </Link>
              </li>
              <li>
                <Link to="/league/serie-a" className="hover:text-[#1F6F43] transition-colors underline-offset-2 hover:underline">
                  Serie A
                </Link>
              </li>
              <li>
                <Link to="/league/bundesliga" className="hover:text-[#1F6F43] transition-colors underline-offset-2 hover:underline">
                  Bundesliga
                </Link>
              </li>
              <li>
                <Link to="/league/ligue-1" className="hover:text-[#1F6F43] transition-colors underline-offset-2 hover:underline">
                  Ligue 1
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Trust */}
          <div>
            <h4 className="font-condensed text-xs uppercase font-bold tracking-widest text-[#111111] mb-3">
              About
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/privacy" className="hover:text-[#1F6F43] transition-colors underline-offset-2 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#1F6F43] transition-colors underline-offset-2 hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newspaper Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-[#666666] font-condensed tracking-wider uppercase">
          <div>
            © {new Date().getFullYear()} LEGEND PLAYER MATCHER · ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
}
