import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aura Link | Universal Multimodal Bridge for Societal Benefit",
  description: "A functional application that accepts messy, unstructured real-world inputs and converts them into structured, verified, and actionable outputs using Gemini AI.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
