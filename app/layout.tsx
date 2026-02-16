import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Kalyani Fine Jewellery - AI Assistant',
  description: 'Discover your perfect bridal jewellery with our AI-powered personal assistant. Explore traditional kundan, polki, and diamond jewelry tailored to your wedding vision.',
  generator: 'nkkndkeowjdow',
  icons: {
    icon: [
      {
        url: '/A.jpg ',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/B.jpg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/C.jpg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/D.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
