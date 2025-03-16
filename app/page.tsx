import { Metadata } from "next";

import RamadanMarketLandingPage from "@/components/ramadan-market-landing-page";

export const metadata: Metadata = {
  title: "Coming Soon",
  description: "Onze website komt binnenkort. Blijf op de hoogte!",
};

export default function Home() {
  return <RamadanMarketLandingPage />;
}
