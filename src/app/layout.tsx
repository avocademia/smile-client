import type { Metadata } from "next";
import './globals.scss'
import { Quicksand,Rancho } from 'next/font/google'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-quicksand'
})

const rancho = Rancho({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-rancho'
})

export const metadata: Metadata = {
  title: "SMILE",
  description: "Supporting Minors to Improve Life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${rancho.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
