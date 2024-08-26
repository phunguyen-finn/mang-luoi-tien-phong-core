import ProductPage from "@/components/pages/Products/ProductPage";
import ProductService, { Product } from "@/services/product.service";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata(
    { params }: any,
): Promise<any> {
    const product = await ProductService.getProduct(params.productId);
    if (!product) {
        return {
            title: '404',
        }
    }

    return {
        title: product!.name,
        description: product!.description,
        robots: 'index, follow',
        openGraph: {
            title: product!.name,
            description: product!.description,
            images: [product!.imageUrls[0]],
            type: 'website',
            locale: 'vi'
        },
    }
}

export default async function Page({ params: { productId } }: { params: { productId: string } }) {
    const product = await ProductService.getProduct(productId);

    if (!product) {
        redirect('/');
    }

    return <>
        <Breadcrumb items={
            [
                { title: <Link href="/">Trang chủ</Link> },
                { title: <Link href="/products">Sản phẩm</Link> },
                { title: product.name }
            ]
        } />
        <ProductPage product={product as Product} />
    </>
}