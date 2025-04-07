import React from "react";

import { Button } from "./ui/button";

const ContactPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/image-4.png"
          alt="Background"
          className="h-full w-full object-cover"
        />
        {/* Overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <main className="relative z-10 flex-1">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 sm:px-8">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
              ElHikma - DeWijsheid
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white">
              Vzw ElHikma - DeWijsheid - 2060 is een inspirerende
              non-profitorganisatie die zich inzet voor het bouwen van bruggen
              tussen gemeenschappen. Hun missie is om mensen samen te brengen en
              projecten te ontwikkelen die de barrières van identiteit, geloof,
              ideologie en ambities doorbreken. Door verschillen te omarmen en
              van elkaar te leren, streeft ElHikma naar een samenleving waarin
              samenwerking en wederzijds begrip centraal staan. Samen sterker,
              samen wijzer.
            </p>
          </div>

          <div className="mb-12 w-full max-w-md rounded-lg bg-white/90 p-8 shadow-md backdrop-blur-sm">
            <Button
              className="w-full"
              data-tally-open="mOkWlg"
              data-tally-layout="modal"
              data-tally-width="500"
              data-tally-emoji-text="👋"
              data-tally-emoji-animation="wave"
              data-tally-auto-close="0"
              data-umami-event="contact-button"
            >
              Contacteer ons
            </Button>

            <div className="mt-8 space-y-4 text-secondary">
              <p>
                <strong>Adres:</strong> Pesthofstraat 45, 2060 Antwerpen
              </p>
              <p>
                <strong>Email:</strong> info@elhikma2060.be
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
