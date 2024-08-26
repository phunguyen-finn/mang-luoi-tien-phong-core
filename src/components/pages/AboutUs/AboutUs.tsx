'use client';

import Image from "next/image";

export default function AboutUs() {
    return (
        <div className='max-w-[1920px] m-auto'>
            <div className="w-full flex flex-col items-center font-medium text-xl sm:text-3xl px-5 relative">
                <div className="w-full md:max-w-[800px]">
                    <h3 className="py-10 text-white">Về chúng tôi</h3>
                </div>
                <div className="w-full h-full absolute bg-red-700/[0.7] -z-[9]" />
                <Image
                    src="/hero.jpg"
                    alt="Banner Về chúng tôi"
                    layout="fill"
                    objectFit="cover"
                    className="absolute -z-10"
                />
            </div>
            <div className="w-full flex flex-col items-center text-white py-5 px-5 relative bg-red-700">
                <div className="w-full md:max-w-[800px]">
                    <h3 className="text-base">Tiên Phong là mạng lưới vì tiếng nói dân tộc thiểu số Việt Nam với sứ mệnh: Cùng nhau gìn giữ bản sắc văn hóa các dân tộc, bảo tồn và phát huy tri thức bản địa. Tham gia vận động chính sách, và lan tỏa đến xã hội nhằm tạo ra sự hiểu biết đúng đắn về người dân tộc thiểu số, góp phần xây dựng một xã hội bình đẳng, đa dạng và phát triển bền vững. Truyền cảm hứng đến với mọi người về tinh thần Tự hào - Tự tin - Tự chủ nhằm bảo tồn phát huy những tri thức bản địa và giá trị văn hóa hóa truyền thống của các dân tộc thiểu số.</h3>
                </div>
            </div>
            <div className="w-full flex flex-col items-center text-white py-5 px-5 relative bg-[#F6A320]">
                <div className="w-full md:max-w-[800px] flex flex-col">
                    <h1 className=" text-xl sm:text-3xl font-medium mb-3">Mạng lưới của chúng tôi</h1>
                    <h3 className="text-base">Tiên Phong là mạng lưới vì tiếng nói dân tộc thiểu số Việt Nam với sứ mệnh: Cùng nhau gìn giữ bản sắc văn hóa các dân tộc, bảo tồn và phát huy tri thức bản địa. Tham gia vận động chính sách, và lan tỏa đến xã hội nhằm tạo ra sự hiểu biết đúng đắn về người dân tộc thiểu số, góp phần xây dựng một xã hội bình đẳng, đa dạng và phát triển bền vững. Truyền cảm hứng đến với mọi người về tinh thần Tự hào - Tự tin - Tự chủ nhằm bảo tồn phát huy những tri thức bản địa và giá trị văn hóa hóa truyền thống của các dân tộc thiểu số.</h3>
                    <div className="px-5 py-10 bg-white text-black self-start my-5" style={{ borderRadius: "0 30px 0 30px" }}>
                        Mạng lưới kết nối 20 tỉnh, thành phố khắp Việt Nam
                    </div>
                    <div className="px-5 py-10 bg-white text-black self-end mb-5" style={{ borderRadius: "30px 0 30px 0" }}>
                        Có 17 dân tộc đã tham gia vào Mạng lưới Tiên Phong
                    </div>
                    <div style={{ width: '100%' }}>
                        <div style={{ position: 'relative', paddingBottom: '76.77%', paddingTop: 0, height: 0 }}>
                            <iframe title="Bản đồ Mạng lưới Tiên Phong" width="1920px" height="1474px" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} src="https://view.genially.com/6221882704295b001819819a" type="text/html" allowScriptAccess="always" allowFullScreen allowNetworking="all"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}