import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingMobileCTA } from "@/components/layout/FloatingMobileCTA";
import { landingContent } from "@/content/landing";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000044",
};

export const metadata: Metadata = {
  title: landingContent.meta.title,
  description: landingContent.meta.description,
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: landingContent.meta.title,
    description: landingContent.meta.description,
    type: "website",
    locale: "pt_BR",
  },
  other: {
    "facebook-domain-verification": "dn2jkyx57gcp6r448gbhihxkvkrfij",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${barlowCondensed.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag Manager */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M43QGSC9');`,
          }}
        />
        {/* End Google Tag Manager */}
        <meta
          name="facebook-domain-verification"
          content="dn2jkyx57gcp6r448gbhihxkvkrfij"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#000044] text-[#FEFEFE]">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M43QGSC9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <FloatingMobileCTA />
      </body>
    </html>
  );
}
