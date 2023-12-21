import Navbar from '@/components/Navbar'
import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { dark } from '@clerk/themes'

const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Next Clerk',
  description: 'Pikachu Next Clerk Auth.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <main>
            <Navbar />
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
