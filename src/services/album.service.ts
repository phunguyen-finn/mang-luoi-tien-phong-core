import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, addDoc, startAfter, limit, Timestamp, deleteDoc } from "firebase/firestore/lite";
import { Db } from "./firebase";

const MAX_ALBUMS = 1;

export interface Album {
    id: string;
    name: string;
    images: string[];
    createdAt: Date;
}

export const AlbumService = {
    getAlbums: async (cursor?: Timestamp): Promise<[Album[], Timestamp | undefined, boolean]> => {
        if (!cursor) cursor = Timestamp.now();
        const q = query(collection(Db, "album"),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(MAX_ALBUMS));
        const snapshot = await getDocs(q);
        const albums = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
        })) as any;
        const hasMore = albums.length === MAX_ALBUMS;
        if (albums.length === 0) return [[], undefined, false];
        return [albums, albums[albums.length - 1].createdAt, hasMore];
    },
    getAlbum: async (id: string): Promise<Album | null> => {
        const album = await getDoc(doc(Db, "album", id));
        if (!album.exists()) return Promise.reject(new Error("Resource not found"));
        return {
            id: album.id,
            ...album.data(),
            createdAt: album.data().createdAt.toDate(),
        } as any;
    }
};

export default AlbumService;