import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, addDoc, startAfter, limit, Timestamp, deleteDoc, where } from "firebase/firestore/lite";
import { Db } from "./firebase";

const MAX_PRODUCTS = 5;

export interface Product {
    id: string;
    name: string;
    description: string;
    imageUrls: string[];
    createdAt: Date;
    updatedAt: Date;
    category: string;
    purchaseLink: string;
}

export const ProductService = {
    getProducts: async (cursor?: Timestamp): Promise<[Product[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "product"),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_PRODUCTS));
        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate(),
        })) as any;
        const hasMore = products.length === MAX_PRODUCTS;
        if (products.length === 0) return [[], undefined, false];
        return [products, products[products.length - 1].createdAt, hasMore];
    },
    getProduct: async (id: string): Promise<Product | null> => {
        const product = await getDoc(doc(Db, "product", id));
        if (!product.exists()) return Promise.reject(new Error("Resource not found"));
        return {
            id: product.id,
            ...product.data(),
            createdAt: product.data().createdAt.toDate(),
            updatedAt: product.data().updatedAt.toDate(),
        } as any;
    },
    getCategories: async (): Promise<string[]> => {
        const q = query(collection(Db, "productCategory"),
            orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const categories = snapshot.docs.map(doc => doc.id);
        return categories;
    },
};

export default ProductService;