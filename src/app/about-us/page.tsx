import AboutUs from "@/components/pages/AboutUs/AboutUs";

export async function generateMetadata({ params, searchParams }: any, parent: any): Promise<any> {
    const parentMetadata: any = await parent;

    return {
        ...parentMetadata,
        title: 'Về chúng tôi',
    }
}


export default function Page() {
    return <AboutUs />
}