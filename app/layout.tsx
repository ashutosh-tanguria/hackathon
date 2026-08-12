import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "StudyOS - AI Powered Learning Companion",
    template: "%s | StudyOS",
  },
  description:
    "Personalized AI learning platform that helps students set goals, build roadmaps, practice, reflect, and improve their learning journey.",
  keywords: [
    "AI Learning",
    "Study Assistant",
    "Personalized Learning",
    "Education AI",
    "StudyOS",
  ],
  authors: [
    {
      name: "StudyOS",
    },
  ],
  creator: "StudyOS",
  openGraph: {
    title: "StudyOS - AI Powered Learning Companion",
    description:
      "Your intelligent study companion for personalized learning.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyOS - AI Powered Learning Companion",
    description:
      "Build better learning habits with AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
        {children}
        </Providers>
        </body>
    </html>
  );
}
