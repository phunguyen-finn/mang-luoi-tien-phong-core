import Contact from "@/components/pages/Contact/Contact";

export async function generateMetadata({ params, searchParams }: any, parent: any): Promise<any> {
    const parentMetadata: any = await parent;

    return {
        ...parentMetadata,
        title: 'Liên hệ',
    }
}

export default async function Page() {
    return <Contact />
}