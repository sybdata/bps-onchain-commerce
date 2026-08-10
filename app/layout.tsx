import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BPS Onchain Commerce Lab',
  description: 'Experimental BPS payment verification flow on Base Sepolia.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
