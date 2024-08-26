import Home from "@/components/pages/Home/Home";
import PostService, { POST_STATUS } from "@/services/post.service";
import StaticService from "@/services/static.service";

export default async function Page() {
  const _static = await StaticService.getStatic();
  const posts = await PostService.getPostsByStatus(POST_STATUS.PUBLISHED);

  return <Home data={_static} posts={posts[0]} />;
}
