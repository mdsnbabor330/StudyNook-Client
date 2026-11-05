import Image from "next/image";
import Link from "next/link";
import { FiCheckSquare } from "react-icons/fi";
import BannerMain from "@/assets/Banner_main.jpg";
import BannerSecondary from "@/assets/Banner_secondary.jpg";

const Banner = () => {
  return (
    <section className="relative w-full pt-20 sm:pt-44 pb-16 sm:pb-24 overflow-hidden bg-background transition-colors duration-300">
      {/* Subtle ambient lighting effect */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-amber-100/30 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-slate-200/40 dark:bg-slate-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14">
          {/* Left Column: Heading, Description, CTA, Stats */}
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-7 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#efece6] dark:bg-slate-800/90 border border-[#e4ded5] dark:border-slate-700/80 px-3.5 py-1 rounded-full text-xs font-semibold text-[#4a453e] dark:text-slate-200 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-amber-400"></span>
              <span>🎓 UNIVERSITY LIBRARY NETWORK</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-foreground tracking-tight leading-[1.08]">
              Find Your Perfect <br className="hidden sm:inline" />
              Study Room
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              Browse and book quiet, private study rooms in your library. List your
              own room and earn. Real-time availability, instant confirmation,
              zero hassle.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-semibold text-sm shadow-md hover:opacity-90 transition-all cursor-pointer group"
              >
                <span>Explore Rooms</span>
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/add-room"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white dark:bg-card border border-border text-foreground hover:bg-secondary font-semibold text-sm shadow-xs transition-all cursor-pointer"
              >
                List Your Room
              </Link>
            </div>

            {/* Statistics */}
            <div className="pt-6 border-t border-border/60 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  500+
                </p>
                <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mt-0.5">
                  Rooms Listed
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  12k+
                </p>
                <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mt-0.5">
                  Bookings Made
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  98%
                </p>
                <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mt-0.5">
                  Satisfaction
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Visual Cards matching reference */}
          <div className="w-full lg:w-1/2 flex justify-center items-center pt-4 lg:pt-0 pb-6 sm:pb-8">
            <div className="relative w-full max-w-120">
              {/* Main Room Image Card */}
              <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden shadow-2xl border border-border/80 bg-secondary">
                <Image
                  src={BannerMain}
                  alt="Modern Sunlit Study Room"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover transition-transform duration-700 hover:scale-102"
                />
              </div>

              {/* Floating Top Right Badge: Instant Booking */}
              <div className="absolute -top-4 sm:-top-5 -right-2 sm:-right-4 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700/80 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 animate-fade-in">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-foreground shrink-0">
                  <FiCheckSquare size={18} />
                </div>
                <div>
                  <p className="font-bold text-xs sm:text-sm text-foreground leading-tight">
                    Instant Booking
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Confirmed in seconds
                  </p>
                </div>
              </div>

              {/* Floating Bottom Right Card: Bookshelf Preview */}
              <div className="absolute -bottom-6 sm:-bottom-8 right-2 sm:right-4 z-20 w-44 sm:w-52 aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-900 bg-secondary">
                <Image
                  src={BannerSecondary}
                  alt="Cozy library bookshelves"
                  fill
                  sizes="208px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
