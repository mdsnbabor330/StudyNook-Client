"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


const Navlink = ({ href, icon: Icon, children, className = "" }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all
        ${
          isActive
            ? "text-foreground font-semibold bg-secondary shadow-2xs"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
        }
        ${className}
      `}
    >
      {Icon && <Icon className="text-base shrink-0 opacity-80" />}
      <span>{children}</span>
    </Link>
  );
};

export default Navlink;