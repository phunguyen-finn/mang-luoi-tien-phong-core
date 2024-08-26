'use client'

import Drawer from 'antd/es/drawer';
import Dropdown from 'antd/es/dropdown/dropdown';
import Menu from "antd/es/menu";
import Image from "next/image";
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from "react";

const items = [
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
    },
    {
        key: 'posts',
        label: "Bài viết",
        children: [
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
        ]
    },
    {
        key: 'products',
        to: '/products',
        label: "Sản phẩm"
    },
    {
        key: 'contact',
        to: '/contact',
        label: "Liên hệ"
    }
]

const Burger = (props: any) => {
    return <svg width="30px" height="30px" viewBox="0 0 12 12" enableBackground="new 0 0 12 12" version="1.1" {...props}>
        <g>
            <rect fill="#b91c1c" height="1" width="11" x="0.5" y="5.5" />
            <rect fill="#b91c1c" height="1" width="11" x="0.5" y="2.5" />
            <rect fill="#b91c1c" height="1" width="11" x="0.5" y="8.5" />
        </g>
    </svg>
};

export default function NavigationMenu() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathname])

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return <div
        className="flex flex-row w-screen h-16 lg:h-24 justify-between items-center px-6 sm:px-12 font-medium text-lg sticky top-0 left-0 max-w-[1920px] m-auto bg-white z-20">
        <>
            <Link href="/">
                <Image
                    src="/logo.png"
                    width={55}
                    height={65}
                    alt='Mạng lưới Tiên phong Logo'
                    className="hidden lg:block transition-all duration-1000 cursor-pointer"
                />
            </Link>
            <div className="justify-between lg:w-8/12 xl:w-1/2 items-center hidden lg:flex lg:flex-row transition-all duration-1000 text-black">
                {items.map(({ key, to, label, children }) => children ?
                    <Dropdown
                        key={key}
                        menu={{
                            items: children.map(({ key, to, label }) => ({
                                key,
                                label: <Link href={to}>{label}</Link>
                            }))
                        }}
                    >
                        <div className="cursor-pointer text-red-700 hover:text-red-600">{label}</div>
                    </Dropdown>
                    :
                    <Link key={key} href={to} className="text-red-700 hover:text-red-600">{label}</Link>
                )}
            </div>
        </>

        <>
            <div className="flex flex-row justify-start w-1/2 items-center lg:hidden transition-all duration-1000 top-0 left-0 sticky z-20" >
                <Link href="/">
                    <Image className="cursor-pointer block lg:hidden transition-all duration-1000" src="/logo.png" width={35} height={45} alt='Mạng lưới Tiên phong logo' />
                </Link>
            </div>
            <div className="flex flex-row justify-end w-1/2 items-center block lg:hidden transition-all duration-1000">
                <Burger onClick={showDrawer} className="cursor-pointer" />
            </div>
            <Drawer onClose={onClose} open={open} width={200} styles={{ body: { padding: 0 } }}>
                <Menu>
                    {items.map(({ key, to, label, children }) => children
                        ? (<React.Fragment key={key}>
                            {children.map(({ key, to, label }) => <Menu.Item key={key}><Link href={to}>{label}</Link></Menu.Item>)}
                        </React.Fragment>)
                        : <Menu.Item key={key}><Link href={to}>{label}</Link></Menu.Item>
                    )}
                </Menu>
            </Drawer>
        </>
    </div>;
}