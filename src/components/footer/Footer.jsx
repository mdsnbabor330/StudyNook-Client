"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiBookOpen, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

function Footer() {
  const year = 2026;
  const { data: session} = authClient.useSession();
  const user = session?.user;

  return (
    <footer className="bg-background text-foreground border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-b border-border">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                <FiBookOpen size={16} />
              </div>

              <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
                StudyNook
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              Find, book, and list verified private study rooms in universities
              and public libraries. Enjoy quiet spaces with simple and smart
              booking.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="w-9 h-9 rounded-full bg-secondary text-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <FaXTwitter size={14} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-secondary text-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <FaFacebookF size={13} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-secondary text-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <FaLinkedinIn size={13} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-secondary text-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-base font-bold text-foreground mb-4">
              Explore
            </h4>

            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/rooms"
                  className="hover:text-primary transition-colors"
                >
                  Browse All Rooms
                </Link>
              </li>

              {user && (
                <>
                  <li>
                    <Link
                      href="/add-room"
                      className="hover:text-primary transition-colors"
                    >
                      List Your Room
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/my-listings"
                      className="hover:text-primary transition-colors"
                    >
                      My Listings
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  href="/#why-studynook"
                  className="hover:text-primary transition-colors"
                >
                  Why StudyNook
                </Link>
              </li>

              <li>
                <Link
                  href="/#how-it-works"
                  className="hover:text-primary transition-colors"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Member Portal */}
          <div>
            <h4 className="font-serif text-base font-bold text-foreground mb-4">
              {user ? "My Account" : "Member Portal"}
            </h4>

            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              {!user ? (
                <>
                  <li>
                    <Link
                      href="/signin"
                      className="hover:text-primary transition-colors"
                    >
                      Sign In
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/register"
                      className="hover:text-primary transition-colors"
                    >
                      Create Account
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/rooms"
                      className="hover:text-primary transition-colors"
                    >
                      Browse Rooms
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/profile"
                      className="hover:text-primary transition-colors"
                    >
                      Profile Settings
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/my-bookings"
                      className="hover:text-primary transition-colors"
                    >
                      My Bookings
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/my-listings"
                      className="hover:text-primary transition-colors"
                    >
                      My Listings
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/add-room"
                      className="hover:text-primary transition-colors"
                    >
                      Add Room Listing
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-bold text-foreground mb-4">
              Contact & Support
            </h4>

            <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <FiMail className="text-primary shrink-0" />
                <span>support@studynook.app</span>
              </li>

              <li className="flex items-center gap-2.5">
                <FiPhone className="text-primary shrink-0" />
                <span>+1 (800) 456-NOOK</span>
              </li>

              <li className="flex items-start gap-2.5">
                <FiMapPin className="text-primary shrink-0 mt-0.5" />
                <span>Library Commons, Cambridge, MA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground text-center sm:text-left">
          <p>© {year ?? "2026"} StudyNook. All rights reserved.</p>

          <p>Built for students, scholars, and library patrons.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
