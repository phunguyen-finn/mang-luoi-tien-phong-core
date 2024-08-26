import PostPage from "@/components/pages/Posts/PostPage";
import PostsPage from "@/components/pages/Posts/PostsPage";
import PostService, { POST_CATEGORY, POST_STATUS } from "@/services/post.service";
import { Timestamp } from "firebase/firestore/lite";
import { redirect } from "next/navigation";

const urlToCategoryMap: any = {
    'news': POST_CATEGORY.NEWS,
    'knowledge': POST_CATEGORY.KNOWLEDGE,
    'opinion': POST_CATEGORY.OPINION,
    'research': POST_CATEGORY.RESEARCH,
}


export async function generateMetadata(
    { params }: any,
    parent: any
): Promise<any> {
    if (Object.keys(urlToCategoryMap).includes(params.postId)) {
        const parentMetadata: any = await parent;

        return {
            ...parentMetadata,
            title: urlToCategoryMap[params.postId],
        }
    }

    const post = await PostService.getPost(params.postId);
    if (!post) {
        return {
            title: '404',
        }
    }

    return {
        title: post!.title,
        description: post!.preview,
        robots: 'index, follow',
        openGraph: {
            title: post!.title,
            description: post!.preview,
            images: [post!.thumbnailUrl],
            type: 'website',
            locale: 'vi'
        },
    }
}

export default async function Page({ params: { postId } }: { params: { postId: string } }) {
    if (Object.keys(urlToCategoryMap).includes(postId)) {
        const [initData, initCursor, initHasMore] = await PostService.getPublishedPostsByCategory(urlToCategoryMap[postId]);
        const featuredPosts = await PostService.getPublishedFeaturedPosts();

        return <PostsPage featuredPosts={featuredPosts} initPosts={initData} initCursor={initCursor} initHasMore={initHasMore} category={urlToCategoryMap[postId]} />
    }

    const post = await PostService.getPost(postId);
    if (!post) {
        return redirect('/');
    }

    let [morePosts, _, __] = await PostService.getPostsByStatus(POST_STATUS.PUBLISHED, Timestamp.fromDate(post.createdAt));
    if (morePosts.length === 0) {
        [morePosts, _, __] = await PostService.getPostsByStatus(POST_STATUS.PUBLISHED);
    }

    return <PostPage post={post} morePosts={morePosts.slice(0, 3)} />
}