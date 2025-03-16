import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Toaster } from 'sonner'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'El Hikma',
  description:
    'Vzw ElHikma - DeWijsheid - 2060 is een inspirerende non-profitorganisatie die zich inzet voor het bouwen van bruggen tussen gemeenschappen. Hun missie is om mensen samen te brengen en projecten te ontwikkelen die de barrières van identiteit, geloof, ideologie en ambities doorbreken. Door verschillen te omarmen en van elkaar te leren, streeft ElHikma naar een samenleving waarin samenwerking en wederzijds begrip centraal staan. Samen sterker, samen wijzer.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  )
}
