import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Event {
  time: string;
  title: string;
}

interface DaySchedule {
  date: string;
  events: Event[];
}

const program: DaySchedule[] = [
  {
    date: "Vrijdag 21 maart 2025",
    events: [
      { time: "Vanaf 16u", title: "Rizart - schrijf iets op een rijstkorrel" },
      { time: "Vanaf 16u", title: "Bert Lezy - laat een portret maken van jezelf" },
      { time: "19u", title: "Verwelkoming door Leyla Bajramovic" },
      { time: "20u - 21u", title: "The Mystic Racoons: Fre Madou en Vincent Brijs" },
    ],
  },
  {
    date: "Zaterdag 22 maart 2025",
    events: [
      { time: "16u - 19u", title: "Grimme door Ingescreativity" },
      { time: "16u - 22u", title: "Dj Hans Millet" },
      { time: "20u - 21u", title: "stand up comedy: Manu Moreau" },
    ],
  },
  {
    date: "Zondag 23 maart 2025",
    events: [
      { time: "16u - 19u", title: "Grimme door Ingescreativity" },
      { time: "Vanaf 16u", title: "Bert Lezy - laat een portret maken van jezelf" },
      { time: "20u - 22u", title: "Yasser Al Jawabra & Tim Charlier" },
    ],
  },
  {
    date: "Maandag 24 maart 2025",
    events: [
      { time: "Vanaf 16u", title: "Grimme door Ingescreativity" },
      { time: "20u", title: "Tba" },
    ],
  },
  {
    date: "Dinsdag 25 maart 2025",
    events: [
      { time: "20u", title: "Film The Old Oak ism Cinema Klappei" },
    ],
  },
  {
    date: "Woensdag 26 maart 2025",
    events: [
      { time: "17u-18u", title: "Zahra Eljadid" },
      { time: "20u - 21u", title: "Sevda Sogutlu" },
      { time: "21u - 22u", title: "Micha Milants" },
    ],
  },
  {
    date: "Donderdag 27 maart 2025",
    events: [
      { time: "Vanaf 16u", title: "Henna door Hennaya Selma" },
      { time: "20u - 21u", title: "Turkse dans door Burak Keskin" },
      { time: "21u - 22u", title: "Charlotte Angels" },
    ],
  },
  {
    date: "Vrijdag 28 maart 2025",
    events: [
      { time: "Vanaf 16u", title: "Henna door Hennaya Selma" },
      { time: "Vanaf 17u", title: "Workshop schilderen via Anka" },
      { time: "20u - 22u", title: "Sally Ghanoum" },
    ],
  },
  {
    date: "Zaterdag 29 maart 2025",
    events: [
      { time: "Vanaf 16u", title: "Henna door Hennaya Selma" },
      { time: "16u - 19u", title: "Cyanotype met Joanna van Atelier Rojo" },
      { time: "20u - 22u", title: "Mc Manu Moreau met oa Kelia Kaniki Masengo en nog 2 comedians tba" },
    ],
  },
  {
    date: "Zondag 30 maart 2025",
    events: [
      { time: "Vanaf 16u", title: "Bert Lezy - laat een portret maken van jezelf" },
      { time: "16u - 19u", title: "Cyanotype met Joanna van Atelier Rojo" },
      { time: "18u30 - 19u", title: "Omid Musica" },
      { time: "19u", title: "Conversatietafel met organisatoren tijdens de Iftar" },
      { time: "20u", title: "Documentaire Louis, de bedelaar ism Filmhuis De Klappei" },
      { time: "21u - 22u", title: "Omid Musica & Ramos" },
    ],
  },
];

const Program = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <CalendarDaysIcon className="size-6 text-secondary" />
        <h2 className="font-berkshire-swash text-4xl text-secondary">Programma</h2>
      </div>
      <Tabs defaultValue={program[0].date} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
          {program.map((day, index) => {
            const [, date, month] = day.date.split(" ");
            return (
              <TabsTrigger
                key={index}
                value={day.date}
                className="whitespace-normal text-xs sm:text-sm"
              >
                {date} {month}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {program.map((day, index) => (
          <TabsContent key={index} value={day.date}>
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-berkshire-swash text-2xl text-secondary">{day.date}</h3>
              <div className="space-y-3">
                {day.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="flex items-start gap-4">
                    <span className="min-w-[100px] font-semibold text-secondary">{event.time}</span>
                    <span className="text-gray-700">{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Program; 