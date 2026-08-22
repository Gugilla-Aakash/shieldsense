import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "ShieldSense — AI-Powered Digital Security Guard",
    template: "%s | ShieldSense",
  },
  description:
    "Investigate links, files, and messages with heuristic detection and AI reasoning. Don’t just know it is dangerous—know why.",
  keywords: [
    "Cybersecurity",
    "AI Security Agent",
    "Phishing Detector",
    "Threat Investigation",
    "Malware Analysis",
    "URL Scanner",
  ],
  authors: [{ name: "ShieldSense Team" }],
  creator: "ShieldSense",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#06060a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-screen bg-[var(--bg-base)] font-sans antialiased text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
