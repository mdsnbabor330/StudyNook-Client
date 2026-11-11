import React from "react";
import Link from "next/link";
import { FiSearch, FiClock, FiCheckCircle, FiArrowRight } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      stepNumber: 1,
      icon: FiSearch,
      title: "Browse Available Rooms",
      description:
        "Search by date, capacity, amenities, or floor. Every room comes with detailed info and verified photos.",
    },
    {
      stepNumber: 2,
      icon: FiClock,
      title: "Reserve Your Slot",
      description:
        "Pick your time window and receive instant confirmation. Transparent pricing — no hidden fees.",
    },
    {
      stepNumber: 3,
      icon: FiCheckCircle,
      title: "Show Up & Focus",
      description:
        "Check in with your booking reference. Your space is ready and waiting, exactly as described.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-accent uppercase">
          SIMPLE PROCESS
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
          How It Works
        </h2>
      </div>

      {/* Steps Container */}
      <div className="mt-12 sm:mt-16 relative">
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-1 bg-border z-0" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative z-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                className="flex flex-col items-center text-center group"
              >
                {/* Step Icon Box with Badge */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                    <Icon className="text-primary-foreground text-3xl" />
                  </div>
                  {/* Step Number Badge */}
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-[#B07D3C] text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-background shadow-xs">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12 sm:mt-16 text-center">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base shadow-md transition-all duration-300 hover:gap-3 cursor-pointer"
        >
          <span>Start Booking Now</span>
          <FiArrowRight className="text-lg" />
        </Link>
      </div>
    </section>
  );
};

export default HowItWorks;
