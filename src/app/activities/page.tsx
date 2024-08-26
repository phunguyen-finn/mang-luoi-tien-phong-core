import ActivitiesPage from "@/components/pages/Activities/ActivitiesPage";
import ActivityService, { ACTIVITY_STATUS } from "@/services/activity.service";
import AlbumService from "@/services/album.service";

export async function generateMetadata({ params, searchParams }: any, parent: any): Promise<any> {
    const parentMetadata: any = await parent;

    return {
        ...parentMetadata,
        title: 'Hoạt động',
    }
}


export default async function Page() {
    const [activities, cursor, hasMore] = await ActivityService.getActivitiesByStatus(ACTIVITY_STATUS.PUBLISHED);
    const categories = await ActivityService.getCategories();
    const featuredActivities = await ActivityService.getPublishedFeaturedActivities();
    const [albums, album_cusor, album_hasMore] = await AlbumService.getAlbums();
    return <ActivitiesPage
        featuredActivities={featuredActivities}
        initActivities={activities}
        initCursor={cursor}
        initHasMore={hasMore}
        categories={categories}
        initAlbums={albums}
        initAlbumCursor={album_cusor}
        initAlbumHasMore={album_hasMore}
    />
}