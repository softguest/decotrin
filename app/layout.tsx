import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TraumaCareHub',
  description: 'The Best Trauma Care Community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* <Toaster /> */}
          {children}
        </Providers>
        {/* <Toaster /> */}
      </body>
    </html>
  )
}
