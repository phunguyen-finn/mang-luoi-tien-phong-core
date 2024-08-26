import { collection, doc, getDoc, getDocs, where, orderBy, query, setDoc, addDoc, startAfter, limit, Timestamp, deleteField, deleteDoc } from "firebase/firestore/lite";
import { Db } from "./firebase";
import { Auth } from "./firebase";

const MAX_ACTIVITIES = 5;

export enum ACTIVITY_STATUS {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED',
}


export interface Activity {
    id: string;
    title: string;
    preview: string;
    body: string;
    thumbnailUrl: string;
    isFeatured: boolean;
    status: ACTIVITY_STATUS;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    category: string;
    createdBy?: string;
}

export const ActivityService = {
    getActivitiesByStatus: async (status: ACTIVITY_STATUS, cursor?: Timestamp): Promise<[Activity[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "activity"),
            where("status", "==", status),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_ACTIVITIES));
        const snapshot = await getDocs(q);
        const activities = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate(),
            publishedAt: doc.data().publishedAt ? doc.data().publishedAt.toDate() : undefined
        })) as any;
        const hasMore = activities.length === MAX_ACTIVITIES;
        if (activities.length === 0) return [[], undefined, false];
        return [activities, activities[activities.length - 1].createdAt, hasMore];
    },
    getPublishedFeaturedActivities: async (): Promise<Activity[]> => {
        const q = query(collection(Db, "activity"),
            where("isFeatured", "==", true),
            orderBy("publishedAt", "desc"),
            limit(3));
        const snapshot = await getDocs(q);
        const activities = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate(),
            publishedAt: doc.data().publishedAt ? doc.data().publishedAt.toDate() : undefined
        }) as any);
        return activities;
    },
    getPublishedActivitiesByCategory: async (category: string, cursor?: Timestamp): Promise<[Activity[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "activity"),
            where("category", "==", category),
            orderBy("publishedAt", "desc"),
            startAfter(cursor),
            limit(MAX_ACTIVITIES));
        const snapshot = await getDocs(q);
        const activities = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
            updatedAt: doc.data().updatedAt.toDate(),
            publishedAt: doc.data().publishedAt ? doc.data().publishedAt.toDate() : undefined
        }) as any);
        const hasMore = activities.length === MAX_ACTIVITIES;
        if (activities.length === 0) return [[], undefined, false];
        return [activities, activities[activities.length - 1].createdAt, hasMore];
    },
    getActivity: async (id: string): Promise<Activity | null> => {
        const activity = await getDoc(doc(Db, "activity", id));
        if (!activity.exists()) return Promise.reject(new Error("Resource not found"));
        return {
            id: activity.id,
            ...activity.data(),
            createdAt: activity.data().createdAt.toDate(),
            updatedAt: activity.data().updatedAt.toDate(),
            publishedAt: activity.data().publishedAt ? activity.data().publishedAt.toDate() : undefined
        } as any;
    },
    getCategories: async (): Promise<string[]> => {
        const q = query(collection(Db, "category"),
            orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const categories = snapshot.docs.map(doc => doc.id);
        return categories;
    }
};

export default ActivityService;