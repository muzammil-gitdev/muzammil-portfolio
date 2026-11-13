import {
  Space_Grotesk,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Syed Muzammil Ali | Full-Stack MERN & Next.js Architect",
  description:
    "Full-Stack MERN & Next.js Developer specializing in scalable digital ecosystems with MongoDB, Express.js, React, Node.js, Next.js, PostgreSQL, Supabase, and Docker.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-[#050505] text-[#F4F4F6] antialiased selection:bg-[#FF0033] selection:text-white">
        {children}
      </body>
    </html>
  );
}
