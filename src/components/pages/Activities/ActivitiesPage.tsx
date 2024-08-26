'use client';

import ActivityService, { Activity, ACTIVITY_STATUS } from "@/services/activity.service";
import Divider from "antd/es/divider";
import Skeleton from "antd/es/skeleton";
import { Timestamp } from "firebase/firestore/lite";
import Image from "next/image";
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import React from "react";
import Link from "next/link";
import { SmileOutlined } from "@ant-design/icons";
import { Result, Select } from "antd";

interface ActivityListsProps {
    initActivities: Activity[];
    initCursor?: Timestamp;
    initHasMore: boolean;
    categories: string[];
}

export default function ActivitiesPage({ initActivities, initCursor, initHasMore, categories }: ActivityListsProps) {
    const [activities, setActivities] = useState<Activity[]>(initActivities);
    const [cursor, setCursor] = useState<Timestamp | undefined>(initCursor);
    const [hasMore, setHasMore] = useState<boolean>(initHasMore);
    const [category, setCategory] = useState<string>('all');

    const handleLoadMore = async () => {
        if (category === 'all') {
            const [nextActivities, nextCursor, nextHasMore] = await ActivityService.getActivitiesByStatus(ACTIVITY_STATUS.PUBLISHED, cursor);
            setActivities([...activities, ...nextActivities]);
            setCursor(nextCursor);
            setHasMore(nextHasMore);
        } else {
            const [nextActivities, nextCursor, nextHasMore] = await ActivityService.getPublishedActivitiesByCategory(category, cursor);
            setActivities([...activities, ...nextActivities]);
            setCursor(nextCursor);
            setHasMore(nextHasMore);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (category === 'all') {
                const [nextActivities, nextCursor, nextHasMore] = await ActivityService.getActivitiesByStatus(ACTIVITY_STATUS.PUBLISHED);
                setActivities([...nextActivities]);
                setCursor(nextCursor);
                setHasMore(nextHasMore);
            } else {
                const [nextActivities, nextCursor, nextHasMore] = await ActivityService.getPublishedActivitiesByCategory(category);
                setActivities([...nextActivities]);
                setCursor(nextCursor);
                setHasMore(nextHasMore);
            }
        };
        fetchData();
    }, [category]);

    return (
        <div className="w-screen max-w-[1920px] min-h-[80vh] m-auto bg-white pt-[5px] flex flex-col items-center">
            <div className="w-full flex flex-col overflow-y-auto items-center">
                <div className="w-11/12 md:w-8/12 lg:w-[700px] no-scrollbar flex flex-col">
                    <Select
                        showSearch
                        placeholder="Chọn danh mục"
                        defaultValue={'all'}
                        onSelect={(value) => setCategory(value)}
                        rootClassName="capitalize w-[300px] self-end"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={[
                            {
                                value: 'all',
                                label: 'Tất cả',
                            },
                            ...categories.map(category => ({
                                value: category,
                                label: category
                            }))
                        ]}
                    />
                    {
                        activities.length == 0 ? <Result
                            icon={<SmileOutlined />}
                            title='Chưa có bài viết mục này, hãy quay lại sau nhé!'
                        /> : (<InfiniteScroll
                            dataLength={activities.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={<Skeleton avatar paragraph={{ rows: 3 }} active />}
                            endMessage={<Divider plain>Đã hết bài viết rồi bạn ơi!</Divider>}
                        >
                            <div className="hidden md:grid grid-cols-3 w-full gap-3">
                                {
                                    activities.slice(0, 3).map(activity => (
                                        <Link key={activity.id + "latest"} href={`/activities/${activity.id}`} className="group col-span-1 aspect-square relative">
                                            <h3 className="group-hover:text-blue-500 absolute bottom-0 text-white text-sm z-10 line-clamp-2 text-ellipsis font-bold max-h-[50px] p-2">{activity.title}</h3>
                                            <div className="w-full h-full absolute z-[1] bg-gradient-to-t from-gray-900 to-transparent" />
                                            <Image
                                                src={activity.thumbnailUrl}
                                                alt={activity.title}
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
                                activities.map((activity, index) => (
                                    <React.Fragment key={activity.id}>
                                        <Link href={`/activities/${activity.id}`} className="group cursor-pointer w-full flex items-center h-[100px] sm:h-[130px] overflow-hidden text-ellipsis">
                                            <div className="w-[100px] min-w-[100px] sm:w-[130px] sm:min-w-[130px] h-full relative flex">
                                                <Image
                                                    src={activity.thumbnailUrl}
                                                    alt={activity.title}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                            <div className="flex flex-col ml-5">
                                                <h3 className="line-clamp-1 text-ellipsis font-bold max-h-[50px] text-xs sm:text-base group-hover:text-blue-500">{activity.title}</h3>
                                                <p className="text-gray-400 text-xs sm:text-base">Đăng vào {activity.publishedAt.toLocaleDateString()}</p>
                                                <p className="text-xs line-clamp-2 text-gray-600 max-w-full leading-none max-h-[50px] text-ellipsis overflow-hidden mt-5 sm:text-base">{activity.preview}</p>
                                            </div>
                                        </Link>
                                        {index !== activities.length - 1 && <Divider className="w-full m-0" key={activity.id} />}
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