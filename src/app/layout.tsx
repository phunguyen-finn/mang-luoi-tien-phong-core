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
  description: "Tiên Phong là mạng lưới vì tiếng nói dân tộc thiểu số Việt Nam với sứ mệnh: Cùng nhau gìn giữ bản sắc văn hóa các dân tộc, bảo tồn và phát huy tri thức bản địa. Tham gia vận động chính sách, và lan tỏa đến xã hội nhằm tạo ra sự hiểu biết đúng đắn về người dân tộc thiểu số, góp phần xây dựng một xã hội bình đẳng, đa dạng và phát triển bền vững. Truyền cảm hứng đến với mọi người về tinh thần Tự hào - Tự tin - Tự chủ nhằm bảo tồn phát huy những tri thức bản địa và giá trị văn hóa hóa truyền thống của các dân tộc thiểu số.",
  robots: 'index, follow',
  openGraph: {
    title: "Ethnicity Vietnam",
    description: "Tiên Phong là mạng lưới vì tiếng nói dân tộc thiểu số Việt Nam với sứ mệnh: Cùng nhau gìn giữ bản sắc văn hóa các dân tộc, bảo tồn và phát huy tri thức bản địa. Tham gia vận động chính sách, và lan tỏa đến xã hội nhằm tạo ra sự hiểu biết đúng đắn về người dân tộc thiểu số, góp phần xây dựng một xã hội bình đẳng, đa dạng và phát triển bền vững. Truyền cảm hứng đến với mọi người về tinh thần Tự hào - Tự tin - Tự chủ nhằm bảo tồn phát huy những tri thức bản địa và giá trị văn hóa hóa truyền thống của các dân tộc thiểu số.",
    images: ['/capture.jpg']
  },
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
