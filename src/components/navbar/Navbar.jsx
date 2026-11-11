"use client";

import React from "react";
import Navlink from "./Navlink";
import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";
import {
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlinePlusCircle,
  HiOutlineFolder,
  HiOutlineBookmark,
} from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useTheme } from "../theme/ThemeContext";
import { toast } from "react-toastify";


const Navbar = () => {
 const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const { theme, toggle } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            router.push("/signin");
            router.refresh();
          },
        },
      });
    } catch (e) {
      toast.error("Failed to log out");
    }
  };

  const navLinks = (
    <>
      <Navlink href="/" icon={HiOutlineHome}>
        Home
      </Navlink>
      <Navlink href="/rooms" icon={HiOutlineSquares2X2}>
        All Rooms
      </Navlink>
      {user && (
        <> 
          <Navlink href="/add-room" icon={HiOutlinePlusCircle}>
            Add Room
          </Navlink>
          <Navlink href="/my-listings" icon={HiOutlineFolder}>
            My Listings
          </Navlink>
          <Navlink href="/my-bookings" icon={HiOutlineBookmark}>
            My Bookings
          </Navlink>
        </>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Mobile Drawer */}
        <div className="flex items-center gap-3">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="w-9 h-9 rounded-xl border border-border bg-secondary flex items-center justify-center text-foreground cursor-pointer"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-card text-card-foreground rounded-2xl z-50 mt-3 w-56 p-3 shadow-xl border border-border gap-1.5"
            >
              {navLinks}
              {!user && (
                <div className="pt-2 border-t border-border flex flex-col gap-1.5 mt-1">
                  <Link
                    href="/signin"
                    className="text-foreground font-semibold px-3 py-1.5 text-xs rounded-xl hover:bg-secondary transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="text-primary-foreground bg-primary hover:opacity-90 px-3 py-1.5 text-xs rounded-xl font-semibold text-center shadow-xs transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
            </ul>
          </div>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <FiBookOpen size={16} />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
              StudyNook
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav Items with Clean Icons */}
        <div className="hidden lg:flex items-center gap-1.5">{navLinks}</div>

        {/* Right: Theme Toggle & User Profile / Auth */}
        <div className="flex items-center gap-3">
          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={toggle}
            aria-label="Toggle dark/light mode"
            className="w-9 h-9 rounded-full flex items-center justify-center text-foreground hover:bg-secondary border border-transparent hover:border-border transition-all cursor-pointer"
          >
            {theme === "dark" ? (
              <FaSun className="text-amber-400 text-base" />
            ) : (
              <FaMoon className="text-foreground text-sm" />
            )}
          </button>

          {isPending ? (
            <span className="text-xs text-muted-foreground animate-pulse">
              ...
            </span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-secondary/80 hover:bg-secondary border border-border cursor-pointer transition-all shadow-2xs"
              >
                {/* Avatar with image or clean initial letter badge */}
                <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold overflow-hidden shrink-0">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={24}
                      height={24}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    (user.name?.[0]).toUpperCase()
                  )}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground max-w-25 truncate hidden sm:block">
                  {user.name}
                </span>
                <IoIosArrowDown
                  size={13}
                  className="text-muted-foreground shrink-0"
                />
              </div>

              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-card text-card-foreground border border-border rounded-2xl z-50 mt-3 w-60 p-2.5 shadow-xl gap-1.5"
              >
                <li className=" py-1.5 border-b border-border text-xs text-muted-foreground">
                  Signed in as <br />
                  <span className="font-semibold text-foreground truncate block">
                    {user.email}
                  </span>
                </li>

                <li>
                  <Link
                    href="/profile"
                    className="rounded-xl px-3 py-2 text-xs font-medium hover:bg-secondary"
                  >
                    Profile Settings
                  </Link>
                </li>

                <li>
                  <Link
                    href="/my-bookings"
                    className="rounded-xl px-3 py-2 text-xs font-medium hover:bg-secondary"
                  >
                    My Bookings
                  </Link>
                </li>

                <li>
                  <Link
                    href="/my-listings"
                    className="rounded-xl px-3 py-2 text-xs font-medium hover:bg-secondary"
                  >
                    My Listings
                  </Link>
                </li>

                <li>
                  <Link
                    href="/add-room"
                    className="rounded-xl px-3 py-2 text-xs font-medium hover:bg-secondary"
                  >
                    Add Room Listing
                  </Link>
                </li>

                <li className="pt-1 border-t border-border mt-1">
                  <button
                    className="w-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground font-medium rounded-xl text-xs py-2 text-center transition-colors cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="text-foreground font-semibold px-3.5 py-1.5 text-xs sm:text-sm rounded-full hover:bg-secondary transition-colors "
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-primary-foreground bg-primary hover:opacity-90 px-4 py-1.5 text-xs sm:text-sm rounded-full font-semibold shadow-xs transition-all hidden sm:inline-flex items-center gap-1.5"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
