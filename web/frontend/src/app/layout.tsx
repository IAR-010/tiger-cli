import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tiger Framework — Next-Gen 3D Glassmorphic Full-Stack Meta-Framework",
  description: "Scaffold high-performance FastAPI/Express backends, Next.js 14 frontends, automated database migrations, and 3D Glassmorphic UI in seconds — powered by Tiger CLI.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
