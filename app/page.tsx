import { Metadata } from "next";

import ContactPage from "@/components/contact-page";

export const metadata: Metadata = {
  title: "ElHikma - DeWijsheid",
  description:
    " Vzw ElHikma - DeWijsheid - 2060 is een inspirerende non-profitorganisatie die zich inzet voor het bouwen van bruggen tussen gemeenschappen. Hun missie is om mensen samen te brengen en projecten te ontwikkelen die de barrières van identiteit, geloof, ideologie en ambities doorbreken. Door verschillen te omarmen en van elkaar te leren, streeft ElHikma naar een samenleving waarin samenwerking en wederzijds begrip centraal staan. Samen sterker, samen wijzer.",
};

export default function Home() {
  return <ContactPage />;
}
