import type { Metadata } from "next";
import './globals.scss'

export const metadata: Metadata = {
  title: "Yana Green Ribbon",
  description: "Mentally healthy people, Mentally healthy community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
