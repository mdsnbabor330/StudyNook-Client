import Link from "next/link";
import React from "react";
import { FiBookOpen, FiHome, FiSearch } from "react-icons/fi";

export const metadata = {
  title: "StudyNook Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-300 w-full bg-card border border-border rounded-2xl p-8 sm:p-10 text-center shadow-xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center text-3xl">
          <FiBookOpen />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-accent uppercase tracking-widest">
            ERROR 404
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Study Room Not Found
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Oops! The page or study corner you were looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-colors shadow-sm"
          >
            <FiHome size={16} />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/rooms"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs sm:text-sm transition-colors"
          >
            <FiSearch size={16} />
            <span>Browse Rooms</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
