import { useEffect, useState } from "react";

const KEY = "dispensary-verified";

export function AgeGate() {
  const [shouldRender, setShouldRender] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(KEY) === "true") setShouldRender(false);
  }, []);

  const handleVerify = (over21: boolean) => {
    if (over21) {
      window.sessionStorage.setItem(KEY, "true");
      setFadeOut(true);
      setTimeout(() => setShouldRender(false), 700);
    } else {
      window.location.href = "https://www.responsibility.org/";
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-[9999] bg-black flex items-center justify-center overflow-hidden select-none transition-opacity duration-700 ease-in-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-105"
      >
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="relative z-20 w-[90%] max-w-lg mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl flex flex-col items-center justify-center">
        <h1
          className="font-black tracking-tighter text-white uppercase leading-none mb-2"
          style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}
        >
          Munchies
        </h1>

        <p className="text-xs md:text-sm font-bold tracking-widest text-emerald-400 uppercase mb-8">
          First Legal Cannabis Dispensary
        </p>

        <div className="w-12 h-[2px] bg-gradient-to-r from-pink-500 via-amber-400 to-emerald-500 mb-8" />

        <p className="text-sm md:text-base font-semibold tracking-wide text-white/90 max-w-sm mb-8 leading-relaxed">
          ARE YOU 21 OR OLDER TO ENTER THE ROCKAWAYS' PREMIER DISPENSARY?
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <button
            onClick={() => handleVerify(true)}
            className="w-full sm:w-40 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-black tracking-wider uppercase rounded-xl shadow-lg transition-all duration-200 transform active:scale-95 text-sm border border-emerald-300/20"
          >
            Yes, I am 21+
          </button>

          <button
            onClick={() => handleVerify(false)}
            className="w-full sm:w-40 py-4 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white font-bold tracking-wider uppercase rounded-xl transition-all duration-200 transform active:scale-95 text-sm border border-white/10"
          >
            No
          </button>
        </div>

        <p className="text-[10px] text-white/40 tracking-wider uppercase mt-8">
          Rockaway Beach Vibes &bull; 21+ Only &bull; NY Licensed
        </p>
      </div>
    </div>
  );
}