import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LinkForge — Your Link-in-Bio',
  description: 'Create a beautiful link-in-bio page in minutes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}