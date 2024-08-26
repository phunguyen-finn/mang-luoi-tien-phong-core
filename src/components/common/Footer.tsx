'use client';

import Image from "next/image";
import Link from "next/link";

const groups = [[
    {
        key: 'home',
        to: '/',
        label: "Trang chủ"
    },
    {
        key: 'about-us',
        to: '/about-us',
        label: "Về chúng tôi"
    },
    {
        key: 'activities',
        to: '/activities',
        label: "Hoạt động"
    }],
[
    {
        key: 'posts-news',
        to: '/posts/news',
        label: "Tin tức"
    },
    {
        key: 'posts-knowledge',
        to: '/posts/knowledge',
        label: "Tri thức bản địa"
    },
    {
        key: 'posts-opinion',
        to: '/posts/opinion',
        label: "Quan điểm"
    },
    {
        key: 'posts-research',
        to: '/posts/research',
        label: "Nghiên cứu"
    },
],
[
    {
        key: 'products',
        to: '/products',
        label: "Sản phẩm"
    },
    {
        key: 'contact',
        to: '/contact',
        label: "Liên hệ"
    }],
]

export default function Footer() {
    return (
        <footer className='max-w-[1920px] m-auto'>

            <div className="w-full flex flex-col items-center text-xl sm:text-3xl text-white py-5 px-5 relative bg-red-700">
                <div className="sm:flex w-full md:max-w-[800px]">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={100}
                        height={100}
                        className="hidden sm:block h-auto w-[50px] mb-5 sm:w-[100px] sm:mb-0 sm:mr-8"
                    />
                    <div className="grid grid-cols-3 w-full">
                        {
                            groups.map((group, index) => (
                                <div key={`group-${index}`} className="flex col-span-1 flex-col items-center text-left">
                                    {
                                        group.map(item => (
                                            <Link key={item.key} href={item.to} className="w-full text-xs text-center sm:text-base text-white hover:text-yellow-500">
                                                {item.label}
                                            </Link>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="text-xs text-white/[0.6] mt-5">Mạng lưới Tiên phong © 2024</div>
            </div>
        </footer>
    )
}