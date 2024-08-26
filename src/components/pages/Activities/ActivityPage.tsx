'use client';

import { Activity } from "@/services/activity.service";
import Divider from "antd/es/divider";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ActivityPage({ activity, moreActivities }: { activity: Activity, moreActivities: Activity[] }) {
    return <div className="w-screen max-w-[1920px] m-auto bg-white pt-5 flex flex-col items-center">
        <div className="w-11/12 md:w-8/12 lg:w-[700px]">
            <h1 className="text-xl md:text-4xl text-black font-bold">{activity.title}</h1>
            <p className="text-sm md:text-sm text-black text-gray-600">Đăng vào {activity.createdAt.toLocaleDateString()}</p>

            <p className="text-sm md:text-sm text-black text-gray-600 italic mb-5 mt-2">{activity.preview}</p>
            <Divider />
            <div className="mb-5" dangerouslySetInnerHTML={{ __html: activity.body }} />
            <Divider />
            <h1 className="text-xl md:text-4xl text-black font-bold mb-10" >Đọc thêm từ Mạng lưới</h1>
            {
                moreActivities.map((activity, index) => (
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
                                <p className="text-gray-400 text-xs sm:text-base">Đăng vào {activity.createdAt.toLocaleDateString()}</p>
                                <p className="text-xs line-clamp-2 text-gray-600 max-w-full leading-none max-h-[50px] text-ellipsis overflow-hidden mt-5 sm:text-base">{activity.preview}</p>
                            </div>
                        </Link>
                        {index !== moreActivities.length - 1 && <Divider className="w-full m-0" key={activity.id} />}
                    </React.Fragment>
                ))
            }
            <div className="mt-10" />
        </div>
    </div>
}
