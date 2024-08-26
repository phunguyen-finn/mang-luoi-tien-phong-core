import ProductModal from "@/components/pages/Products/ProductModal";
import ProductService, { Product } from "@/services/product.service";

export default async function PatternPage({ params: { productId } }: { params: { productId: string } }) {
    const product = await ProductService.getProduct(productId);
    return <ProductModal product={product as Product} />
}