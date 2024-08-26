'use client';

import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { Timestamp } from "firebase/firestore/lite";
import Image from "next/image";
import Divider from "antd/es/divider";
import { SmileOutlined } from "@ant-design/icons";
import Result from "antd/es/result";
import ProductService, { Product } from "@/services/product.service";
import Link from "next/link";


interface ProductsListProps {
    initProducts: Product[];
    initCursor?: Timestamp;
    initHasMore: boolean;
}

export function ProductsList({ initProducts, initCursor, initHasMore }: ProductsListProps) {
    const [products, setProducts] = useState(initProducts);
    const [cursor, setCursor] = useState<undefined | Timestamp>(initCursor);
    const [hasMore, setHasMore] = useState(initHasMore);

    const handleLoadMore = async () => {
        const [newproducts, newCursor, newHasMore] = await ProductService.getProducts(cursor);
        setProducts([...products, ...newproducts]);
        setCursor(newCursor);
        setHasMore(newHasMore);
    }

    return <>
        {
            products.length == 0 && <Result
                icon={<SmileOutlined />}
                title="Chúng mình vẫn đang cập nhật, vui lòng quay lại sau nhé!"
            />
        }
        {
            products.length > 0 && <div id="scrollableDiv" className="w-full no-scrollbar">
                <InfiniteScroll
                    dataLength={products.length}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    loader={<h4>Đang tải...</h4>}
                    endMessage={<Divider plain>Đã hết danh sách</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <div className="w-full grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 mt-5 sm:gap-2 gap-2">
                        {
                            products.map((product) => (
                                <Link href={`/products/${product.id}`} key={product.id} className="group col-span-1 aspect-square flex flex-col items-center justify-center relative">
                                    <div className="w-full h-full">
                                        <Image
                                            src={product.imageUrls[0]}
                                            alt={product.name}
                                            width={300}
                                            height={300}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        />
                                    </div>
                                    <span className="group-hover:text-blue-500 overflow-hidden text-ellipsis w-full max-w-full max-h-[50px] line-clamp-1 text-center mt-2 text-sm">{product.name}</span>
                                </Link>
                            ))
                        }
                    </div>
                </InfiniteScroll>
            </div>
        }
    </>
}