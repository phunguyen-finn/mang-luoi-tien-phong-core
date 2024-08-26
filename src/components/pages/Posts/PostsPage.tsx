'use client';

import PostService, { Post, POST_CATEGORY } from "@/services/post.service";
import Divider from "antd/es/divider";
import Skeleton from "antd/es/skeleton";
import { Timestamp } from "firebase/firestore/lite";
import Image from "next/image";
import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import React from "react";
import Link from "next/link";
import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";

interface PostListsProps {
    initPosts: Post[];
    initCursor?: Timestamp;
    initHasMore: boolean;
    category: POST_CATEGORY;
    featuredPosts: Post[];
}

export default function PostsPage({ initPosts, initCursor, initHasMore, category, featuredPosts }: PostListsProps) {
    const [posts, setPosts] = useState<Post[]>(initPosts);
    const [cursor, setCursor] = useState<Timestamp | undefined>(initCursor);
    const [hasMore, setHasMore] = useState<boolean>(initHasMore);

    const handleLoadMore = async () => {
        const [nextPosts, nextCursor, nextHasMore] = await PostService.getPublishedPostsByCategory(category, cursor);
        setPosts([...posts, ...nextPosts]);
        setCursor(nextCursor);
        setHasMore(nextHasMore);
    }

    return (
        <div className="w-screen max-w-[1920px] min-h-[80vh] m-auto bg-white pt-[5px] flex flex-col items-center">
            <div className="w-full flex flex-col overflow-y-auto items-center md:bg-[url(/hero-min.jpg)] bg-contain bg-no-repeat">
                <div className="w-11/12 md:w-9/12 lg:w-[900px] my-5 hidden md:block">
                    <h1 className="text-xl font-medium md:text-white lg:text-3xl">Bài viết nổi bật</h1>
                </div>
                <div className="hidden md:w-9/12 lg:w-[900px] md:grid grid-cols-4 gap-5 mb-5">
                    <Link key={featuredPosts[0].id + "latest"} href={`/posts/${featuredPosts[0].id}`} className="group col-span-3 relative">
                        <h3 className="group-hover:text-blue-500 absolute bottom-[45px] text-white text-sm z-10 line-clamp-2 text-ellipsis font-bold max-h-[50px] m-5">{featuredPosts[0].title}</h3>
                        <h3 className="group-hover:text-blue-500 absolute bottom-0 text-white text-sm z-10 line-clamp-2 text-ellipsis max-h-[50px] m-5">{featuredPosts[0].preview}</h3>
                        <div className="w-full h-full absolute z-[1] bg-gradient-to-t from-gray-900 to-transparent" />
                        <Image
                            src={featuredPosts[0].thumbnailUrl}
                            alt={featuredPosts[0].title}
                            objectFit="cover"
                            layout="fill"
                            className="z-0"
                        />
                    </Link>
                    <div className="col-span-1 relative flex flex-wrap gap-5">
                        {
                            featuredPosts.slice(1, 3).map(post => (
                                <Link key={post.id + "latest"} href={`/posts/${post.id}`} className="group w-full aspect-square relative">
                                    <h3 className="group-hover:text-blue-500 absolute bottom-[45px] text-white text-sm z-10 line-clamp-2 text-ellipsis font-bold max-h-[50px] m-5">{post.title}</h3>
                                    <h3 className="group-hover:text-blue-500 absolute bottom-0 text-white text-sm z-10 line-clamp-2 text-ellipsis max-h-[50px] m-5">{post.preview}</h3>
                                    <div className="w-full h-full absolute z-[1] bg-gradient-to-t from-gray-900 to-gray-900/[0.3]" />
                                    <Image
                                        src={post.thumbnailUrl}
                                        alt={post.title}
                                        objectFit="cover"
                                        layout="fill"
                                        className="z-1"
                                    />
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className="w-11/12 block md:hidden">
                    <div className="full mb-5">
                        <h1 className="text-xl font-medium lg:text-3xl mb-3">Nổi bật</h1>
                        {
                            featuredPosts.map((post, index) => (
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
                                            <p className="text-gray-400 text-xs sm:text-base">Đăng vào {post.publishedAt.toLocaleDateString()}</p>
                                            <p className="text-xs line-clamp-2 text-gray-600 max-w-full leading-none max-h-[50px] text-ellipsis overflow-hidden mt-5 sm:text-base">{post.preview}</p>
                                        </div>
                                    </Link>
                                    {index !== featuredPosts.length - 1 && <Divider key={post.id} />}
                                </React.Fragment>
                            ))
                        }
                    </div>
                </div>
                <Divider />
                <div className="w-11/12 md:w-8/12 lg:w-[700px]">
                    <div className="full lg:w-[900px] mb-5">
                        <h1 className="text-xl font-medium lg:text-3xl">{category}</h1>
                    </div>
                    {
                        initPosts.length == 0 ? <Result
                            icon={<SmileOutlined />}
                            title='Chưa có bài viết mục này, hãy quay lại sau nhé!'
                        /> : (<InfiniteScroll
                            dataLength={posts.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={<Skeleton avatar paragraph={{ rows: 3 }} active />}
                            endMessage={<Divider plain>Đã hết bài viết rồi bạn ơi!</Divider>}
                        >
                            {
                                posts.map((post, index) => (
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
                                                <p className="text-gray-400 text-xs sm:text-base">Đăng vào {post.publishedAt.toLocaleDateString()}</p>
                                                <p className="text-xs line-clamp-2 text-gray-600 max-w-full leading-none max-h-[50px] text-ellipsis overflow-hidden mt-5 sm:text-base">{post.preview}</p>
                                            </div>
                                        </Link>
                                        {index !== posts.length - 1 && <Divider key={post.id} />}
                                    </React.Fragment>
                                ))
                            }
                        </InfiniteScroll>)
                    }
                </div>
                <div />
            </div>
        </div >
    );
}