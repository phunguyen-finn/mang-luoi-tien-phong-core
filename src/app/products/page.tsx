import { ProductsList } from "@/components/pages/Products/ProductsList";
import ProductService from "@/services/product.service";
import { Breadcrumb } from "antd";
import Link from "next/link";

export default async function Product() {
    const [initProducts, initCursor, initHasMore] = await ProductService.getProducts();
    return <div
        style={{ minHeight: 'max(800px, 100vh)' }}
        className='w-screen overflow-y-auto flex flex-col items-center relative max-w-[1920px] m-auto pt-5 pb-[5px] bg-white'>
        <div className="w-11/12 xl:w-8/12 flex flex-col relative">
            <Breadcrumb items={
                [
                    { title: <Link href="/">Trang chủ</Link> },
                    { title: "Sản phẩm" }
                ]
            } />
            <ProductsList initProducts={initProducts} initCursor={initCursor} initHasMore={initHasMore} />
        </div>
    </div>
}