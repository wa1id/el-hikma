import { Metadata } from 'next'

import ComingSoon from '@/components/coming-soon'

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'Onze website komt binnenkort. Blijf op de hoogte!',
}

export default function Home() {
  return <ComingSoon />
}
