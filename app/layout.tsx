import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const title = "YOUR NAME｜产品经理作品集";
  const description = "关注用户体验、产品策略与软硬件协同的产品探索者。互联网产品经理与硬件产品经理求职作品集。";

  return {
    metadataBase: baseUrl,
    title: { default: title, template: "%s｜YOUR NAME" },
    description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      title,
      description,
      images: [{ url: new URL("/og.png", baseUrl), width: 1536, height: 906, alt: "YOUR NAME Product Portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/og.png", baseUrl)],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
