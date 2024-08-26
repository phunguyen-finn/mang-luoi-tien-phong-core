
'use client';

import Divider from 'antd/es/divider';
import Image from 'next/image';
import { Product } from '@/services/product.service';
import { useState } from 'react';
import clsx from 'clsx';

export default function ProductPage({ product }: { product: Product }) {
    const [image, setImage] = useState<string>(product.imageUrls[0]);

    return <><div className='flex flex-col h-full sm:grid sm:grid-cols-3 items-left w-full py-6 gap-x-4'>
        <div className='sm:col-span-1'>
            <Image src={product.imageUrls[0]} alt={product.name} width={800} height={800} style={{
                width: '100%',
                height: 'auto',
            }} />
        </div>
        <div className='sm:col-span-2 flex flex-col break-all'>
            <h1 className='mt-3 font-bold '>{product.name}</h1>
            <p className='text-gray-600'>Đăng vào {product.createdAt.toLocaleDateString()}</p>
            <Divider style={{ margin: '10px 0px' }} />
            <div className='flex w-full'><p>{product.description}</p></div>
            <div className='flex w-full flex-wrap'>
                {
                    product.imageUrls.map((url, index) => (
                        <div key={index} className={clsx('w-[100px] h-[100px] relative', image == url ? "border-2 border-red-700" : null)} onClick={() => setImage(url)}>
                            <Image src={url} alt={product.name} layout='fill' objectFit='cover' onClick={() => setImage(url)} />
                        </div>
                    ))
                }
            </div>
            <a target='_blank' href={product.purchaseLink}>
                <button className='mt-5 p-2 w-full bg-red-600 text-white rounded-lg hover:bg-red-400 sm:w-[150px]'>Mua ngay</button>
            </a>
        </div>
    </div>
    </>
}