import { Inter } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import Footer from "@/components/footer/Footer";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudyNook - Smart Study Room Booking",
  description: "Browse and book private, verified study rooms across universities and libraries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning className={`${interSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
