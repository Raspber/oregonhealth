import { Poppins } from 'next/font/google'
import './globals.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

  const poppins = Poppins(
    {
      weight: [ '300','400','500','600','700'],
      subsets: ['latin'],
      style: ['normal', 'italic']
    }
  );

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Oregon Health',
  description: 'The fastest way to create an appointment with your physician.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-indigo-300 text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  )
}
