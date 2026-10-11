
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amplify | Talent Discovery",
  description:
    "Discover talent through skills, projects, and experience with AI-powered matching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
