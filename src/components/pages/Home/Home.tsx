'use client';

import useMediaQuery from "@/components/hooks/useMediaQuery";
import { Post } from "@/services/post.service";
import { Static } from "@/services/static.service";
import { Divider } from "antd";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import React from 'react';

export default function Home({ data, posts }: { data: Static, posts: Post[] }) {
    const isBreakPoint = useMediaQuery(768);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: isBreakPoint ? 1 : 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true,
    };

    return (
        <div className='max-w-[1920px] m-auto'>
            <div className="w-full h-screen max-h-[900px] relative min-h-[600px] flex flex-col justify-center items-center">
                <div className="w-full h-full absolute -z-[9] bg-white/[0.8]" />
                <Image
                    src="/hero.jpg"
                    alt="hero"
                    layout="fill"
                    objectFit="cover"
                    className="absolute -z-10"
                />

                <h1 className="text-3xl sm:text-4xl md:text-7xl mb-1 sm:mb-3 font-medium text-red-700">Mạng lưới Tiên phong</h1>
                <h3 className="text-sm sm:text-xl text-red-700">Vì tiếng nói của người dân tộc thiểu số</h3>
            </div>
            <div className="w-full py-5 px-5 bg-red-700 p-0 flex flex-col items-center">
                <div className="w-full h-full md:max-w-[800px] flex flex-col items-center md:flex-row">
                    <h3 className="text-xl font-medium sm:text-3xl text-white mb-3 md:mb-0 w-full text-center">
                        Tự hào - Tự tin - Tự chủ
                    </h3>
                    <Link href='/about-us' className="rounded-md w-full text-xl text-center bg-yellow-500 hover:bg-yellow-400 text-white py-2">
                        Đọc thêm về <br />
                        Tiên Phong
                    </Link>
                </div>
            </div>
            <video src='intro.mp4' muted loop width="100%" autoPlay />
            <div className="w-full flex flex-col items-center text-xl sm:text-3xl text-red-700 py-5 px-5 relative bg-white">
                <div className="w-full md:max-w-[800px]">
                    <h3 className="mb-3 font-medium">Cập nhật</h3>
                    {
                        <div className="hidden md:grid grid-cols-3 w-full gap-3">
                            {
                                posts.slice(0, 3).map(post => (
                                    <Link key={post.id + "latest"} href={`/posts/${post.id}`} className="group col-span-1 aspect-square relative">
                                        <h3 className="group-hover:text-blue-500 absolute bottom-[45px] text-white text-sm z-10 line-clamp-2 text-ellipsis font-bold max-h-[50px] m-5">{post.title}</h3>
                                        <h3 className="group-hover:text-blue-500 absolute bottom-0 text-white text-sm z-10 line-clamp-2 text-ellipsis max-h-[50px] m-5">{post.preview}</h3>
                                        <div className="w-full h-full absolute z-[1] bg-gradient-to-t from-gray-900 to-transparent" />
                                        <Image
                                            src={post.thumbnailUrl}
                                            alt={post.title}
                                            objectFit="cover"
                                            layout="fill"
                                            className="z-0"
                                        />
                                    </Link>
                                ))
                            }
                        </div>
                    }
                    {
                        posts.slice(0, 3).map((post, index) => (
                            <div key={post.id} className="block md:hidden">
                                <Link href={`/posts/${post.id}`} className="group cursor-pointer w-full flex items-center h-[100px] sm:h-[130px] overflow-hidden text-ellipsis">
                                    <div className="w-[100px] min-w-[100px] sm:w-[130px] sm:min-w-[130px] h-full relative flex">
                                        <Image
                                            src={post.thumbnailUrl}
                                            alt={post.title}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="flex flex-col ml-5">
                                        <h3 className="line-clamp-1 text-ellipsis font-bold max-h-[50px] text-xs sm:text-base group-hover:text-blue-500">{post.title}</h3>
                                        <p className="text-gray-400 text-xs sm:text-base">Đăng vào {post.publishedAt.toLocaleDateString()}</p>
                                        <p className="text-xs line-clamp-2 text-gray-600 max-w-full leading-none max-h-[50px] text-ellipsis overflow-hidden mt-5 sm:text-base">{post.preview}</p>
                                    </div>
                                </Link>
                                {index !== 2 && <Divider className="w-full m-0" key={post.id} />}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="bg-white w-full flex flex-col items-center h-auto text-xl sm:text-3xl text-red-700 py-5 px-5 relative">
                <div className="w-full md:max-w-[800px]">
                    <h3 className="font-medium">Hoạt động</h3>
                    <div className="relative mt-3 pb-[75%] h-[0] oveflow-hidden">
                        <iframe loading="lazy" className="absolute w-full h-full" width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/qI9jz0EP_FU?si=WdumvdfHAKLZ7dKn" title="Văn Hoá Của Mình" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center text-xl sm:text-3xl text-white py-5 px-5 relative bg-red-700">
                <div className="w-full md:max-w-[800px]">
                    <h3 className="font-medium">Đối tác của chúng tôi</h3>
                    <div className="flex mt-3 w-full justify-center">
                        {data.partnerLogoUrls.map((url) => (
                            <div key={url} className="flex justify-center items-center flex-wrap">
                                <Image
                                    src={url}
                                    alt="partner"
                                    width={200}
                                    height={200}
                                    className="h-[70px] sm:h-[100px] w-auto"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-white w-full flex flex-col items-center text-xl sm:text-3xl py-5 px-5 relative">
                <div className="w-full md:max-w-[800px]">
                    <h3 className="mb-3 font-medium text-red-700">Chia sẻ của người tham gia</h3>
                    <Slider
                        {...settings}
                    >
                        {data.testimonials.map((testimonial) => (
                            <div>
                                <div key={testimonial.name} className="flex relative flex-col justify-center items-center rounded-lg relative">
                                    <div className="flex flex-col items-center">
                                        <div className="w-[75px] h-[75px] rounded-full relative mb-3">
                                            <Image
                                                src={testimonial.thumbnailUrl}
                                                alt="avatar"
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div className="bg-red-700 rounded-lg text-white p-5 mx-3">
                                            <p className="text-sm mb:text-base mb-3 text-center font-bold">{testimonial.name}</p>
                                            <p className="text-sm mb:text-base text-center">{testimonial.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}