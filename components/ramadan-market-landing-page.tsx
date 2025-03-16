import { MapPinIcon } from "@heroicons/react/20/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import React from "react";
import Marquee from "react-fast-marquee";

import InfoCard from "./info-card";
import Star from "./star";
import { Button } from "./ui/button";

const RamadanMarketLandingPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl font-bold text-secondary">
        Ramadan <br /> Markt
      </h1>
      <Star>€12,50 per ticket</Star>
      <p className="max-w-[580px] text-xl font-semibold text-secondary">
        Kom genieten van een sfeervolle markt vol lekker eten, ambachtelijkse
        producten en culturele beleving. Ontdek unieke kraampjes, proef
        authentieke gerechten en ervaar de magie van Ramadan met familie en
        vrienden.
      </p>
      <Button className="w-fit">Reserveer uw plaats</Button>
      <EventInfoCards />
      <RamadanMarketMarquee />
    </div>
  );
};

const EventInfoCards = () => {
  return (
    <div className="flex gap-4">
      <InfoCard icon={<MapPinIcon className="size-10" />}>
        Pesthofstraat 35, 2060 Antwerpen
        <br />
        (Stuivenbergsite)
      </InfoCard>

      <InfoCard icon={<CalendarDaysIcon className="size-10" />}>
        21/03 - 30/03
        <br />
        16:00 - 22:00
      </InfoCard>
    </div>
  );
};

const RamadanMarketMarquee = () => {
  return (
    <Marquee speed={25} className="bg-primary py-3">
      <div className="flex items-center gap-12">
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index} className="text-xl font-semibold text-secondary">
            • 12,50 euro per ticket
          </span>
        ))}
      </div>
    </Marquee>
  );
};

export default RamadanMarketLandingPage;
