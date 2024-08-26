import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NextTopLoader from "nextjs-toploader";
import NavigationMenu from "@/components/common/NavigationMenu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/components/common/Footer";

const inter = Fira_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Mạng lưới Tiên phong",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <AntdRegistry>
        <body className={`${inter.className} no-scrollbar`} style={{ overflowX: 'hidden' }}>
          <NextTopLoader showSpinner={false} />
          <NavigationMenu />
          {children}
          <Footer />
        </body>
      </AntdRegistry>
    </html >
  );
}
