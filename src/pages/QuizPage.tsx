import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Foot, HeightRange, Position, Playstyle, LeagueId } from '../data/players';
import { matchPlayer, QuizAnswers } from '../utils/matcher';
import { SEOHead } from '../components/SEOHead';

interface OptionItem<T> {
  value: T;
  label: string;
  subtext: string;
}

export function QuizPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const leagueParam = searchParams.get('league') as LeagueId | null;
  const activeLeague: 'All' | LeagueId =
    leagueParam && ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1'].includes(leagueParam)
      ? leagueParam
      : 'All';

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [foot, setFoot] = useState<Foot | null>(null);
  const [height, setHeight] = useState<HeightRange | null>(null);
  const [position, setPosition] = useState<Position | null>(null);
  const [playstyle, setPlaystyle] = useState<Playstyle | null>(null);

  const footOptions: OptionItem<Foot>[] = [
    { value: 'Left', label: 'Left', subtext: 'Natural balance, rare angles, and surgical curl' },
    { value: 'Right', label: 'Right', subtext: 'Classic precision, explosive drive, and reliable power' },
    { value: 'Both', label: 'Both', subtext: 'Ambidextrous dual-threat; equally comfortable on either side' },
  ];

  const heightOptions: OptionItem<HeightRange>[] = [
    { value: 'Under 170 cm', label: 'Under 170 cm', subtext: 'Low center of gravity, rapid turns, and razor-sharp agility' },
    { value: '170-179 cm', label: '170-179 cm', subtext: 'Balanced athletic profile and versatile physical endurance' },
    { value: '180-189 cm', label: '180-189 cm', subtext: 'Commanding stride length, aerial reach, and strong presence' },
    { value: '190 cm+', label: '190 cm+', subtext: 'Imposing physical colossus with dominant aerial supremacy' },
  ];

  const positionOptions: OptionItem<Position>[] = [
    { value: 'Striker', label: 'Striker', subtext: 'Central finisher, penalty box threat, and primary goalscorer' },
    { value: 'Winger', label: 'Winger', subtext: 'Flank speed, 1-on-1 isolation, and wide creation' },
    { value: 'Midfielder', label: 'Midfielder', subtext: 'Engine room, transitional control, and distribution' },
    { value: 'Defender', label: 'Defender', subtext: 'Backline stopper, defensive anticipation, and discipline' },
    { value: 'Goalkeeper', label: 'Goalkeeper', subtext: 'Command of the penalty box, reflex shot-stopping, and last line' },
  ];

  const playstyleOptions: OptionItem<Playstyle>[] = [
    { value: 'Dribbler', label: 'Dribbler', subtext: 'Quick feet, close control, and beating defenders 1v1' },
    { value: 'Playmaker', label: 'Playmaker', subtext: 'Vision, decisive through balls, and orchestrating tempo' },
    { value: 'Finisher', label: 'Finisher', subtext: 'Clinical instincts, ice-cold finishing, and goal poaching' },
    { value: 'Powerhouse', label: 'Powerhouse', subtext: 'Stamina, raw physical power, and explosive bursts' },
    { value: 'Wall', label: 'Wall (defensive)', subtext: 'Anticipation, interception mastery, and unshakeable resilience' },
  ];

  const handleNext = (finalPlaystyle?: Playstyle) => {
    if (currentStep === 1 && foot) {
      setCurrentStep(2);
    } else if (currentStep === 2 && height) {
      setCurrentStep(3);
    } else if (currentStep === 3 && position) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      const chosenPlaystyle = finalPlaystyle || playstyle;
      if (foot && height && position && chosenPlaystyle) {
        const answers: QuizAnswers = {
          foot,
          height,
          position,
          playstyle: chosenPlaystyle,
          leagueFilter: activeLeague,
        };

        const result = matchPlayer(answers);

        try {
          sessionStorage.setItem('legend_last_result', JSON.stringify(result));
        } catch {
          // ignore
        }

        navigate(`/result/${result.topMatch.slug}`, {
          state: { result },
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const isCurrentStepValid = () => {
    if (currentStep === 1) return !!foot;
    if (currentStep === 2) return !!height;
    if (currentStep === 3) return !!position;
    if (currentStep === 4) return !!playstyle;
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <SEOHead
        title={`Question ${currentStep} of 4 – Legend Player Matcher`}
        description="Answer 4 quick questions about your physical attributes and playstyle to discover your football match."
      />

      {/* Progress */}
      <div className="border-b border-[#111111] pb-4 mb-6">
        <div className="flex items-center justify-between font-condensed tracking-widest text-xs uppercase mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[#555555]">PROGRESS:</span>
            <span className="font-bold text-[#111111] text-base">
              {currentStep} / 4
            </span>
          </div>

          {activeLeague !== 'All' && (
            <div className="text-[#1F6F43] font-bold">
              MATCHING WITHIN: {activeLeague.toUpperCase()}
            </div>
          )}
        </div>

        {/* 1px Progress Bar */}
        <div className="w-full bg-[#D8D2C2] h-1.5 rounded-[1px] overflow-hidden">
          <div
            className="bg-[#1F6F43] h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {/* Step 1: Foot */}
        {currentStep === 1 && (
          <div>
            <div className="font-condensed text-xs uppercase tracking-[0.2em] font-bold text-[#1F6F43] mb-1">
              Question 1 of 4
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] tracking-tight mb-2">
              What is your preferred playing foot?
            </h1>
            <p className="text-sm text-[#555555] mb-6">
              Select the foot with which you strike, pass, or control the ball most naturally.
            </p>

            <div className="space-y-3">
              {footOptions.map((opt) => {
                const isSelected = foot === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFoot(opt.value)}
                    className={`w-full text-left p-4 sm:p-5 rounded-[2px] border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FAF8F2] border-[#1F6F43] shadow-[3px_3px_0px_#1F6F43]'
                        : 'bg-[#FAF8F2] border-[#CCCCCC] hover:border-[#111111] shadow-[2px_2px_0px_#111111]'
                    }`}
                  >
                    <div>
                      <div className="font-serif text-2xl text-[#111111]">{opt.label}</div>
                      <div className="text-xs text-[#555555] mt-1 font-sans">{opt.subtext}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 ${
                        isSelected ? 'border-[#1F6F43] bg-[#1F6F43] text-white' : 'border-[#999999]'
                      }`}
                    >
                      {isSelected && <span className="text-xs font-bold">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Height */}
        {currentStep === 2 && (
          <div>
            <div className="font-condensed text-xs uppercase tracking-[0.2em] font-bold text-[#1F6F43] mb-1">
              Question 2 of 4
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] tracking-tight mb-2">
              What is your height bracket?
            </h1>
            <p className="text-sm text-[#555555] mb-6">
              Select the height range that best matches your stature.
            </p>

            <div className="space-y-3">
              {heightOptions.map((opt) => {
                const isSelected = height === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setHeight(opt.value)}
                    className={`w-full text-left p-4 sm:p-5 rounded-[2px] border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FAF8F2] border-[#1F6F43] shadow-[3px_3px_0px_#1F6F43]'
                        : 'bg-[#FAF8F2] border-[#CCCCCC] hover:border-[#111111] shadow-[2px_2px_0px_#111111]'
                    }`}
                  >
                    <div>
                      <div className="font-serif text-2xl text-[#111111]">{opt.label}</div>
                      <div className="text-xs text-[#555555] mt-1 font-sans">{opt.subtext}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 ${
                        isSelected ? 'border-[#1F6F43] bg-[#1F6F43] text-white' : 'border-[#999999]'
                      }`}
                    >
                      {isSelected && <span className="text-xs font-bold">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Position */}
        {currentStep === 3 && (
          <div>
            <div className="font-condensed text-xs uppercase tracking-[0.2em] font-bold text-[#1F6F43] mb-1">
              Question 3 of 4
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] tracking-tight mb-2">
              Which position best fits your instincts?
            </h1>
            <p className="text-sm text-[#555555] mb-6">
              Position carries the highest algorithmic weight in matching your game.
            </p>

            <div className="space-y-3">
              {positionOptions.map((opt) => {
                const isSelected = position === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPosition(opt.value)}
                    className={`w-full text-left p-4 sm:p-5 rounded-[2px] border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FAF8F2] border-[#1F6F43] shadow-[3px_3px_0px_#1F6F43]'
                        : 'bg-[#FAF8F2] border-[#CCCCCC] hover:border-[#111111] shadow-[2px_2px_0px_#111111]'
                    }`}
                  >
                    <div>
                      <div className="font-serif text-2xl text-[#111111]">{opt.label}</div>
                      <div className="text-xs text-[#555555] mt-1 font-sans">{opt.subtext}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 ${
                        isSelected ? 'border-[#1F6F43] bg-[#1F6F43] text-white' : 'border-[#999999]'
                      }`}
                    >
                      {isSelected && <span className="text-xs font-bold">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Playstyle */}
        {currentStep === 4 && (
          <div>
            <div className="font-condensed text-xs uppercase tracking-[0.2em] font-bold text-[#1F6F43] mb-1">
              Question 4 of 4
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] tracking-tight mb-2">
              What is your signature playstyle?
            </h1>
            <p className="text-sm text-[#555555] mb-6">
              How do you influence matches and assert yourself on the pitch?
            </p>

            <div className="space-y-3">
              {playstyleOptions.map((opt) => {
                const isSelected = playstyle === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPlaystyle(opt.value)}
                    className={`w-full text-left p-4 sm:p-5 rounded-[2px] border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FAF8F2] border-[#1F6F43] shadow-[3px_3px_0px_#1F6F43]'
                        : 'bg-[#FAF8F2] border-[#CCCCCC] hover:border-[#111111] shadow-[2px_2px_0px_#111111]'
                    }`}
                  >
                    <div>
                      <div className="font-serif text-2xl text-[#111111]">{opt.label}</div>
                      <div className="text-xs text-[#555555] mt-1 font-sans">{opt.subtext}</div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-4 ${
                        isSelected ? 'border-[#1F6F43] bg-[#1F6F43] text-white' : 'border-[#999999]'
                      }`}
                    >
                      {isSelected && <span className="text-xs font-bold">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#111111]">
        <button
          type="button"
          onClick={handleBack}
          className="border border-[#111111] bg-[#FAF8F2] hover:bg-[#EAE4D4] px-5 py-3 font-condensed uppercase tracking-wider font-bold text-sm text-[#111111] rounded-[2px] transition-colors cursor-pointer"
        >
          {currentStep === 1 ? '← Back to Home' : '← Previous'}
        </button>

        <button
          type="button"
          onClick={() => handleNext()}
          disabled={!isCurrentStepValid()}
          className="bg-[#1F6F43] hover:bg-[#165231] active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed text-[#FAF8F2] px-7 py-3 font-condensed uppercase tracking-wider font-bold text-base rounded-[2px] border border-[#111111] shadow-[2px_2px_0px_#111111] transition-all cursor-pointer flex items-center gap-2"
        >
          <span>{currentStep === 4 ? 'See My Match' : 'Next Question'}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
