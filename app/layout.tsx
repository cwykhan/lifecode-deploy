import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "K-UPFATE | Korean Saju · 나를 알아가는 사주",
  description: "Explore your personality, strengths, and relationships through Korean Saju. English readings with Korean translations. 한국 전통 사주를 영문과 한글로 만나보세요.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
