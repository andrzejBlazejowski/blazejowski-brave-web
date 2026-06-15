import type { Metadata } from "next";
import { publicAssetPath } from "@/lib/build-target";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andrzej Błażejowski – Middle / acting as Senior Frontend Developer",
  description:
    "CV portfolio of Andrzej Błażejowski – Middle / acting as Senior Frontend Developer specializing in React, TypeScript, Next.js, and cross-platform applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href={publicAssetPath("/photon/assets/css/fontawesome-all.min.css")}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300italic,400,400italic"
        />
        <link
          rel="stylesheet"
          href={publicAssetPath("/photon/assets/css/main.css")}
        />
        <link rel="stylesheet" href={publicAssetPath("/app-overrides.css")} />
      </head>
      <body className="is-preload">{children}</body>
    </html>
  );
}
