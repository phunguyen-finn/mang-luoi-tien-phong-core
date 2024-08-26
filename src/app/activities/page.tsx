import ActivitiesPage from "@/components/pages/Activities/ActivitiesPage";
import ActivityService, { ACTIVITY_STATUS } from "@/services/activity.service";

export default async function Page() {
    const [activities, cursor, hasMore] = await ActivityService.getActivitiesByStatus(ACTIVITY_STATUS.PUBLISHED);
    const categories = await ActivityService.getCategories();

    return <ActivitiesPage initActivities={activities} initCursor={cursor} initHasMore={hasMore} categories={categories} />
}