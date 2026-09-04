import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Elector | Administration Platform',
  description:
    'Elector is an Administration platform that provides a suite of tools and services for building, deploying, and managing AI applications. It offers a user-friendly interface, powerful APIs, and robust infrastructure to help developers and businesses leverage the power of artificial intelligence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground h-f`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
