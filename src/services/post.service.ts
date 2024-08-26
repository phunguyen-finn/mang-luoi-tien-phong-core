import { collection, doc, getDoc, getDocs, where, orderBy, query, setDoc, addDoc, startAfter, limit, Timestamp, deleteField, deleteDoc } from "firebase/firestore/lite";
import { Db } from "./firebase";
import { Auth } from "./firebase";

const MAX_POSTS = 5;

export enum POST_CATEGORY {
    NEWS = 'Tin tức',
    KNOWLEDGE = 'Tri thức bản địa',
    OPINION = 'Quan điểm',
    RESEARCH = 'Nghiên cứu'
}

export enum POST_STATUS {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED',
}

export interface Post {
    id: string;
    title: string;
    preview: string
    body: string;
    thumbnailUrl: string;
    isFeatured: boolean;
    status: POST_STATUS;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    category: POST_CATEGORY;
    createdBy?: string;
}

export const PostService = {
    getPostsByStatus: async (status: POST_STATUS, cursor?: Timestamp): Promise<[Post[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "post"),
            where("status", "==", status),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_POSTS));
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate(),
            publishedAt: doc.data().publishedAt ? doc.data().publishedAt.toDate() : undefined
        })) as any;
        const hasMore = posts.length === MAX_POSTS;
        if (posts.length === 0) return [[], undefined, false];
        return [posts, posts[posts.length - 1].createdAt, hasMore];
    },
    getPublishedPostsByCategory: async (category: POST_CATEGORY, cursor?: Timestamp): Promise<[Post[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "post"),
            where("status", "==", POST_STATUS.PUBLISHED),
            where("category", "==", category),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_POSTS));
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate(),
            publishedAt: doc.data().publishedAt ? doc.data().publishedAt.toDate() : undefined
        })) as any;
        const hasMore = posts.length === MAX_POSTS;
        if (posts.length === 0) return [[], undefined, false];
        return [posts, posts[posts.length - 1].createdAt, hasMore];
    },
    getPublishedFeaturedPosts: async (): Promise<Post[]> => {
        const q = query(collection(Db, "post"),
            where("isFeatured", "==", true),
            orderBy("publishedAt", "desc"),
            limit(3));
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate(),
            publishedAt: doc.data().publishedAt ? doc.data().publishedAt.toDate() : undefined
        }) as any);
        return posts;
    },
    getPost: async (id: string): Promise<Post | null> => {
        const post = await getDoc(doc(Db, "post", id));
        if (!post.exists()) return Promise.reject(new Error("Resource not found"));
        return {
            id: post.id,
            ...post.data(),
            createdAt: post.data().createdAt.toDate(),
            updatedAt: post.data().updatedAt.toDate(),
            publishedAt: post.data().publishedAt ? post.data().publishedAt.toDate() : undefined
        } as any;
    }
};

export default PostService;