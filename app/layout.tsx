import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'OJASS\'25 | NIT Jamshedpur',
  description: 'OJASS 2025: The 22nd edition of the Techno-Management Fest of NIT Jamshedpur. Join us from 14-16 February 2025.',
}

// cname.vercel-dns.com.
// 76.76.21.21

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>OJASS'25 | NIT Jamshedpur</title>
        <meta name="title" content="OJASS'25 | NIT Jamshedpur" />
        <meta
          name="description"
          content="OJASS 2025: The 22nd edition of the Techno-Management Fest of NIT Jamshedpur. Join us from 14-16 February 2025."
        />
        <link rel="icon" type="image/webp+png" href="/logo.webp" />
      </head>
      <body className={inter.className}>
        
        <Layout>
          <Toaster />
          {children}
        </Layout>
      </body>
    </html>
  );
}
