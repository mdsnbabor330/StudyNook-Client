import React from "react";
import { FiShield, FiZap, FiStar, FiUsers } from "react-icons/fi";

const WhyStudyNook = () => {
  const promises = [
    {
      id: 1,
      icon: FiShield,
      iconBg: "bg-[#EBF3F5]",
      iconColor: "text-primary",
      title: "Verified Spaces",
      description:
        "Every room is inspected and rated by real students. Accuracy guaranteed or your booking is refunded.",
    },
    {
      id: 2,
      icon: FiZap,
      iconBg: "bg-[#E8F4EC]",
      iconColor: "text-[#2D6A4F]",
      title: "Instant Confirmation",
      description:
        "No waiting for approval. Book in seconds and get your confirmation before you close the tab.",
    },
    {
      id: 3,
      icon: FiStar,
      iconBg: "bg-[#FAF3E5]",
      iconColor: "text-[#B07D3C]",
      title: "Curated Selection",
      description:
        "We partner only with institutions that maintain high standards of comfort and connectivity.",
    },
    {
      id: 4,
      icon: FiUsers,
      iconBg: "bg-[#F0ECF8]",
      iconColor: "text-[#6C5CE7]",
      title: "Solo or Group",
      description:
        "From private carrels for one to seminar halls for twenty — the right space for every study need.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#2D6A4F] uppercase">
          OUR PROMISE
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
          Why StudyNook?
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          We built StudyNook because finding a good study space should never be
          harder than the work you do in it.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {promises.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-card border border-border rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                {/* Icon Badge */}
                <div
                  className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-6`}
                >
                  <Icon className={`text-xl ${item.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-card-foreground mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyStudyNook;
