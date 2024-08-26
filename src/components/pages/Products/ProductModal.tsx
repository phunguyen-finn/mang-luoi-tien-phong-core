'use client';

import { useRouter } from 'next/navigation';
import Modal from "antd/es/modal";
import ProductPage from './ProductPage';
import { Product } from '@/services/product.service';

export default function ProductModal({ product }: { product: Product }) {
    const router = useRouter();
    const handleCancel = () => {
        router.back();
    };

    return <Modal
        open={true}
        footer={null}
        onCancel={handleCancel}
        closable={true}
        centered
        width="min(calc(100vw - 32px), 800px)"
    >
        <ProductPage product={product} />
    </Modal >;
}