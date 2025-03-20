"use client"

import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { compareAsc, parse } from "date-fns";
import React, { useMemo, useState } from "react";

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
  // Find the closest date to today
  const closestDate = useMemo(() => {
    const today = new Date();
    
    // Convert program dates to Date objects
    const programDates = program.map(day => {
      // Parse the Dutch date format "Vrijdag 21 maart 2025" to Date object
      return {
        dateString: day.date,
        dateObj: parse(day.date.split(" ").slice(1).join(" "), "d MMMM yyyy", new Date())
      };
    });
    
    // Sort dates by closeness to today
    programDates.sort((a, b) => {
      const diffA = Math.abs(compareAsc(a.dateObj, today));
      const diffB = Math.abs(compareAsc(b.dateObj, today));
      return diffA - diffB;
    });
    
    // Return the closest date string
    return programDates[0]?.dateString || program[0].date;
  }, []);
  
  const [selectedDate, setSelectedDate] = useState(closestDate);
  
  // Handle the mobile select change
  const handleMobileSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <CalendarDaysIcon className="size-6 text-secondary" />
        <h2 className="font-berkshire-swash text-4xl text-secondary">Programma</h2>
      </div>
      
      {/* Desktop view - only visible on sm and up */}
      <div className="hidden sm:block">
        <Tabs defaultValue={closestDate} className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-1 rounded-lg bg-white p-1 shadow-sm md:grid-cols-5 lg:grid-cols-10">
            {program.map((day, index) => {
              const [, date, month] = day.date.split(" ");
              return (
                <TabsTrigger
                  key={index}
                  value={day.date}
                  className="whitespace-normal rounded-md text-xs font-medium text-secondary transition-colors hover:bg-primary/10 sm:text-sm"
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
      
      {/* Mobile view - only visible below sm breakpoint */}
      <div className="sm:hidden">
        <div className="mb-4">
          <select 
            value={selectedDate}
            onChange={handleMobileSelectChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {program.map((day, index) => (
              <option key={index} value={day.date}>
                {day.date}
              </option>
            ))}
          </select>
        </div>
        
        <div className="rounded-lg bg-white p-6 shadow-sm">
          {program
            .filter(day => day.date === selectedDate)
            .map((day, index) => (
              <div key={index}>
                <h3 className="mb-4 font-berkshire-swash text-2xl text-secondary">{day.date}</h3>
                <div className="space-y-4">
                  {day.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="border-b border-gray-100 pb-3 last:border-0">
                      <p className="font-semibold text-secondary mb-1">{event.time}</p>
                      <p className="text-gray-700">{event.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Program; 