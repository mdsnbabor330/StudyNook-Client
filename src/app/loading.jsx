"use client";

import React from "react";
import { FiBookOpen } from "react-icons/fi";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg animate-bounce">
          <FiBookOpen size={24} />
        </div>
        <div className="absolute -inset-2 rounded-2xl border-2 border-primary/30 animate-ping pointer-events-none" />
      </div>
      <p className="text-sm font-medium text-muted-foreground animate-pulse mt-2">
        Loading StudyNook...
      </p>
    </div>
  );
}
