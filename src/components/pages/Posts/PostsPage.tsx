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
}

export default function PostsPage({ initPosts, initCursor, initHasMore, category }: PostListsProps) {
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
            <div className="w-full flex flex-col overflow-y-auto items-center">
                <div className="w-11/12 md:w-8/12 lg:w-[700px] no-scrollbar">
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
                            <div className="hidden md:grid grid-cols-3 w-full gap-3">
                                {
                                    posts.slice(0, 3).map(post => (
                                        <Link key={post.id + "latest"} href={`/posts/${post.id}`} className="group col-span-1 aspect-square relative">
                                            <h3 className="group-hover:text-blue-500 absolute bottom-0 text-white text-sm z-10 line-clamp-2 text-ellipsis font-bold max-h-[50px] p-2">{post.title}</h3>
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
                            <Divider className="w-full m-0 hidden md:block" />
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
                                        {index !== posts.length - 1 && <Divider className="w-full m-0" key={post.id} />}
                                    </React.Fragment>
                                ))
                            }
                        </InfiniteScroll>)
                    }
                </div>
            </div>
        </div>
    );
}