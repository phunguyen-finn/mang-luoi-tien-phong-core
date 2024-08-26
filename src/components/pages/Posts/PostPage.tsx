'use client';

import { Post } from "@/services/post.service";
import Divider from "antd/es/divider";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PostPage({ post, morePosts }: { post: Post, morePosts: Post[] }) {
    return <div className="w-screen max-w-[1920px] m-auto bg-white pt-5 flex flex-col items-center">
        <div className="w-11/12 md:w-8/12 lg:w-[700px]">
            <h1 className="text-xl md:text-4xl text-black font-bold">{post.title}</h1>
            <p className="text-sm md:text-sm text-black text-gray-600">Đăng vào {post.createdAt.toLocaleDateString()}</p>

            <p className="text-sm md:text-sm text-black text-gray-600 italic mb-5 mt-2">{post.preview}</p>
            <Divider />
            <div className="mb-5" dangerouslySetInnerHTML={{ __html: post.body }} />
            <Divider />
            <h1 className="text-xl md:text-4xl text-black font-bold mb-10" >Đọc thêm từ Mạng lưới</h1>
            {
                morePosts.map((post, index) => (
                    <React.Fragment key={post.id}>
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
                                <p className="text-gray-400 text-xs sm:text-base">Đăng vào {post.createdAt.toLocaleDateString()}</p>
                                <p className="text-xs line-clamp-2 text-gray-600 max-w-full leading-none max-h-[50px] text-ellipsis overflow-hidden mt-5 sm:text-base">{post.preview}</p>
                            </div>
                        </Link>
                        {index !== morePosts.length - 1 && <Divider className="w-full m-0" key={post.id} />}
                    </React.Fragment>
                ))
            }
            <div className="mt-10" />
        </div>
    </div>
}
