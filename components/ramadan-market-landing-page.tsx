import { MapPinIcon } from "@heroicons/react/20/solid";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import React from "react";

import InfoCard from "./info-card";
import Program from "./program";
import Star from "./star";
import { Button } from "./ui/button";
// import Marquee from "react-fast-marquee";

const RamadanMarketLandingPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-beige pb-12">
      <div className="xs:justify-start pointer-events-none absolute inset-0 flex px-4 sm:justify-end sm:px-8 md:justify-between">
        <div className="flex gap-2 sm:hidden md:flex">
          <img
            className="h-[150px] w-[60px] sm:h-[250px] sm:w-[100px]"
            src="./Frame1.png"
            alt="Decoration"
          />
          <img
            className="h-[40px] w-[150px] sm:h-[60px] sm:w-[300px]"
            src="./Rounded.png"
            alt="Decoration"
          />
        </div>

        <div className="hidden gap-2 sm:flex sm:gap-4">
          <img
            className="h-[40px] w-[150px] sm:h-[60px] sm:w-[300px]"
            src="./Rounded.png"
            alt="Decoration"
          />
          <img
            className="h-[150px] w-[60px] sm:h-[250px] sm:w-[100px]"
            src="./Frame.png"
            alt="Decoration"
          />
        </div>
      </div>

      <div className="relative flex flex-col space-y-8 px-4 pt-16 sm:px-8 sm:pt-24">
        <div className="container mx-auto flex flex-col items-center justify-between gap-12 px-6 lg:flex-row lg:px-24">
          <div className="w-full space-y-6 lg:w-3/5 lg:text-left">
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:gap-4 md:justify-center lg:flex-row lg:items-start lg:gap-16">
              <h1 className="font-berkshire-swash text-4xl font-bold text-secondary sm:text-5xl lg:text-7xl">
                Ramadan <br /> Market
              </h1>
              <Star
                className="self-end sm:self-auto"
                size={170}
                textClassName="leading-normal  font-extrabold text-[24px] lg:font-extrabold"
              >
                Gratis <br /> Inkom
              </Star>
            </div>
            <p className="mx-auto text-lg font-semibold text-secondary sm:text-xl lg:mx-0">
              Kom genieten van een sfeervolle markt vol lekker eten,
              ambachtelijke producten en culturele beleving. Ontdek unieke
              kraampjes, proef authentieke gerechten en ervaar de magie van
              Ramadan met familie en vrienden.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button className="w-full sm:w-auto">
                <a
                  href="https://www.eventbrite.be/e/ramadan-markt-2060-tickets-1278040987999"
                  rel="noopener noreferrer"
                  className="flex h-full w-full items-center justify-center"
                >
                  Reserveer of doneer een iftar
                </a>
              </Button>
              <Button
                variant="link"
                className="text-secondary underline"
                data-tally-open="w5MLZN"
                data-tally-layout="modal"
                data-tally-width="500"
                data-tally-emoji-text="👋"
                data-tally-emoji-animation="wave"
                data-tally-auto-close="0"
              >
                Inschrijven als vrijwilliger
              </Button>
            </div>
            <EventInfoCards />
          </div>

          <div className="flex w-full justify-center lg:w-2/5">
            <img
              className="hidden xl:block h-auto w-[110%] max-w-[750px] sm:w-[85%] md:w-[400px] lg:w-[400px] xl:w-[550px]"
              src="./Group.png"
              alt="Ramadan Market"
            />
          </div>


        </div>
        <div className="container mx-auto flex flex-col items-center justify-between gap-12 px-6 lg:flex-row lg:px-24">
            <Program />
          </div>
      </div>

      {/* <RamadanMarketMarquee /> */}
    </div>
  );
};

const EventInfoCards = () => {
  return (
    <div className="flex w-full flex-col gap-4 xl:flex-row">
      <InfoCard
        className="flex h-full w-full items-center text-base sm:w-auto sm:text-lg"
        icon={<MapPinIcon className="size-8 sm:size-10" />}
      >
        Pesthofstraat 45 (via inkom 5), 2060 Antwerpen
        <br />
        (Stuivenbergsite)
      </InfoCard>

      <InfoCard
        className="flex w-full items-center whitespace-nowrap text-base sm:w-auto sm:text-lg"
        icon={<CalendarDaysIcon className="size-8 sm:size-10" />}
      >
        21/03 - 30/03
        <br />
        16:00 - 22:00
      </InfoCard>
    </div>
  );
};

// const RamadanMarketMarquee = () => {
//   return (
//     <Marquee speed={25} className="mt-14 bg-primary py-2 sm:py-3">
//       <div className="flex items-center gap-8 sm:gap-12">
//         {Array.from({ length: 10 }).map((_, index) => (
//           <span
//             key={index}
//             className="text-lg font-semibold text-secondary sm:text-xl"
//           >
//             • 12,50 euro per ticket
//           </span>
//         ))}
//       </div>
//     </Marquee>
//   );
// };

export default RamadanMarketLandingPage;
