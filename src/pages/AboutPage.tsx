import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <SEOHead
        title="About Legend – Football Player Matcher"
        description="Legend is a small independent project matching your game to a football legend in four quick questions."
      />

      <div className="border-b border-[#111111] pb-4 mb-6">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#111111] tracking-tight">
          About Legend
        </h1>
        <p className="text-sm sm:text-base text-[#444444] mt-2 font-sans">
          Legend is a small independent project. Answer four quick questions and it finds the football legend whose game is closest to yours.
        </p>
      </div>

      <div className="space-y-6 font-sans text-[#222222] leading-relaxed text-sm sm:text-base">
        {/* How the match works */}
        <div className="border border-[#111111] bg-[#FAF8F2] p-6 rounded-[2px] shadow-[3px_3px_0px_#111111]">
          <h2 className="font-serif text-2xl text-[#111111] mb-2">
            How the match works
          </h2>
          <p className="text-[#444444]">
            You pick your preferred foot, height range, position, and playstyle. Each player in our database has the same four attributes. Position and playstyle count most, then foot, then height. You get your closest match plus two runners-up, with a collectible-style card you can download or share.
          </p>
        </div>

        {/* Where the facts come from */}
        <div className="border border-[#111111] bg-[#FAF8F2] p-6 rounded-[2px]">
          <h2 className="font-serif text-2xl text-[#111111] mb-2">
            Where the facts come from
          </h2>
          <p className="text-[#444444]">
            Player details (clubs, honours, nationality, height) come from publicly available career records and are checked by hand. Mistakes can still slip in. If you spot one, please tell us through the{' '}
            <Link to="/contact" className="text-[#1F6F43] underline font-bold">
              contact page
            </Link>{' '}
            and we&apos;ll fix it.
          </p>
        </div>

        {/* Not affiliated */}
        <div className="border border-[#111111] bg-[#FAF8F2] p-6 rounded-[2px]">
          <h2 className="font-serif text-2xl text-[#111111] mb-2">
            Not affiliated
          </h2>
          <p className="text-[#444444]">
            Legend is not affiliated with or endorsed by any club, league, federation, or player. Names are used for information and entertainment only.
          </p>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <Link
            to="/quiz"
            className="bg-[#1F6F43] hover:bg-[#165231] text-[#FAF8F2] font-condensed uppercase tracking-wider font-bold px-6 py-3 text-sm rounded-[2px] border border-[#111111] transition-colors"
          >
            Take the quiz →
          </Link>
          <Link
            to="/contact"
            className="text-xs font-condensed uppercase tracking-wider text-[#111111] hover:underline"
          >
            Contact us →
          </Link>
        </div>
      </div>
    </div>
  );
}
