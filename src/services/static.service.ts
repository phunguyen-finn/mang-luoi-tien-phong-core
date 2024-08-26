import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { Db } from "./firebase";

interface Testimonial {
    name: string;
    content: string;
    thumbnailUrl: string;
}

export interface Static {
    partnerLogoUrls: string[];
    testimonials: Testimonial[];
}

export const StaticService = {
    getStatic: async (): Promise<Static> => {
        const staticData = await getDoc(doc(Db, "static", "data"));
        return staticData.data() as Static;
    }
}

export default StaticService;