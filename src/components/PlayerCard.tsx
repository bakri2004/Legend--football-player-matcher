import { useRef, useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Player, LeagueId } from '../data/players';

interface PlayerCardProps {
  player: Player;
}

const LEAGUE_SOLID_COLORS: Record<LeagueId, { bg: string; text: string }> = {
  'Premier League': {
    bg: '#2B1D3A',
    text: '#FFFFFF',
  },
  'La Liga': {
    bg: '#8B1E1E',
    text: '#FFFFFF',
  },
  'Serie A': {
    bg: '#173F6E',
    text: '#FFFFFF',
  },
  'Bundesliga': {
    bg: '#6E1E24',
    text: '#FFFFFF',
  },
  'Ligue 1': {
    bg: '#114B44',
    text: '#FFFFFF',
  },
};

export function PlayerCard({ player }: PlayerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const leagueTheme = (player.primaryLeague && LEAGUE_SOLID_COLORS[player.primaryLeague]) || {
    bg: '#1F6F43',
    text: '#FFFFFF',
  };

  const clubsDisplay =
    player.clubs && player.clubs.length > 0 ? player.clubs.join(' / ') : 'Club Career';

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    setDownloadError(null);

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#FAF8F2',
      });
      const link = document.createElement('a');
      link.download = `legend-${player.slug}-card.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      setDownloadError('Could not render image automatically. Please use a screenshot.');
    } finally {
      setDownloading(false);
    }
  };

  const copyToClipboardFallback = async (content: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(content);
      } else {
        const input = document.createElement('textarea');
        input.value = content;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Fallback
    }
  };

  const handleShare = async () => {
    const shareTitle = 'Legend';
    const shareText = `I matched with ${player.name} on Legend. Which football legend matches your game?`;
    const shareUrl = `${window.location.origin}/result/${player.slug}`;
    const fullContent = `${shareText}\n${shareUrl}`;

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        await copyToClipboardFallback(fullContent);
      }
    } else {
      await copyToClipboardFallback(fullContent);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* The Collectible Sticker Card */}
      <div
        ref={cardRef}
        id="collectible-card"
        className="bg-[#FAF8F2] border-2 border-[#111111] rounded-[2px] shadow-[4px_4px_0px_#111111] overflow-hidden text-[#111111]"
      >
        {/* Card Header Strip */}
        <div className="bg-[#111111] text-[#FAF8F2] px-4 py-2 flex items-center justify-between font-condensed tracking-widest text-xs uppercase font-bold">
          <span className="text-[#1F6F43]">#{player.shirtNumber.toString().padStart(2, '0')}</span>
          <span className="text-[11px] tracking-wider text-[#AAAAAA]">{player.era}</span>
        </div>

        {/* Flat Solid Color Block (One color per league) */}
        <div
          style={{ backgroundColor: leagueTheme.bg }}
          className="p-5 sm:p-7 relative overflow-hidden text-white"
        >
          {/* Huge Shirt Number in Condensed Type */}
          <div
            aria-hidden="true"
            className="absolute right-2 bottom-0 font-condensed font-black text-8xl sm:text-9xl leading-none text-white/20 select-none pointer-events-none"
          >
            {player.shirtNumber}
          </div>

          <div className="relative z-10">
            {/* Player Full Name */}
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight leading-tight mb-2">
              {player.name}
            </h2>

            {/* Position, Playstyle and Nationality */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-condensed uppercase tracking-wider text-sm sm:text-base text-white/90">
              <span className="font-bold">{player.position}</span>
              <span className="text-white/40">·</span>
              <span>{player.playstyle}</span>
              <span className="text-white/40">·</span>
              <span>{player.nationality}</span>
            </div>
          </div>
        </div>

        {/* Stats Strip (Foot, Height, Clubs, Number) */}
        <div className="grid grid-cols-4 border-b border-[#111111] bg-[#EAE4D4] divide-x divide-[#111111] text-center font-condensed py-2.5">
          <div className="px-1 flex flex-col justify-center">
            <span className="block text-[10px] uppercase tracking-widest text-[#555555]">
              FOOT
            </span>
            <span className="block text-sm sm:text-base font-bold text-[#111111] uppercase">
              {player.preferredFoot}
            </span>
          </div>
          <div className="px-1 flex flex-col justify-center">
            <span className="block text-[10px] uppercase tracking-widest text-[#555555]">
              HEIGHT
            </span>
            <span className="block text-sm sm:text-base font-bold text-[#111111]">
              {player.heightCm} cm
            </span>
          </div>
          <div className="px-1 flex flex-col justify-center min-h-[44px]">
            <span className="block text-[10px] uppercase tracking-widest text-[#555555]">
              CLUBS
            </span>
            <span
              className="block text-[10px] sm:text-xs font-bold text-[#111111] leading-tight line-clamp-2 px-0.5 break-words"
              title={clubsDisplay}
            >
              {clubsDisplay}
            </span>
          </div>
          <div className="px-1 flex flex-col justify-center">
            <span className="block text-[10px] uppercase tracking-widest text-[#555555]">
              NUMBER
            </span>
            <span className="block text-sm sm:text-base font-bold text-[#111111]">
              #{player.shirtNumber}
            </span>
          </div>
        </div>

        {/* Bio & Career Milestones Section */}
        <div className="p-5 sm:p-6 space-y-4 bg-[#FAF8F2]">
          {/* Short Bio */}
          <p className="text-sm sm:text-base text-[#222222] leading-relaxed border-l-2 border-[#1F6F43] pl-3 py-0.5 font-sans">
            {player.shortBio}
          </p>

          {/* 3 Career Highlights */}
          <div className="pt-2">
            <div className="font-condensed text-xs uppercase tracking-widest text-[#111111] font-bold border-b border-[#111111] pb-1 mb-2">
              Career highlights
            </div>
            <ol className="divide-y divide-[#E2DDCF]">
              {player.facts.map((fact, index) => (
                <li key={index} className="py-2.5 flex items-start gap-3">
                  <span className="font-condensed font-bold text-xs text-[#1F6F43] mt-0.5">
                    0{index + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-[#222222] leading-normal font-sans">
                    {fact}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="mt-5 flex flex-col gap-3">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full bg-[#1F6F43] hover:bg-[#165231] active:translate-y-0.5 text-[#FAF8F2] px-4 py-3 font-condensed uppercase tracking-wider font-bold text-sm rounded-[2px] transition-colors border border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
        >
          {downloading ? 'Generating Image...' : 'Download card as image'}
        </button>

        <div className="w-full">
          <button
            onClick={handleShare}
            className="w-full bg-[#FAF8F2] hover:bg-[#EAE4D4] active:translate-y-0.5 text-[#111111] px-4 py-3 font-condensed uppercase tracking-wider font-bold text-sm rounded-[2px] transition-colors border border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center justify-center gap-2 cursor-pointer"
          >
            Share
          </button>
          {copied && (
            <p className="text-xs font-condensed uppercase tracking-wider text-[#1F6F43] font-bold mt-2 text-center">
              Link copied
            </p>
          )}
        </div>
      </div>

      {downloadError && (
        <p className="text-xs text-[#B91C1C] font-condensed uppercase tracking-wider mt-2 text-center">
          {downloadError}
        </p>
      )}
    </div>
  );
}
