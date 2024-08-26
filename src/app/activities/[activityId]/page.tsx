import ActivityPage from "@/components/pages/Activities/ActivityPage";
import ActivityService, { ACTIVITY_STATUS } from "@/services/activity.service";
import { Timestamp } from "firebase/firestore/lite";
import { redirect } from "next/navigation";

export async function generateMetadata(
    { params }: any
): Promise<any> {
    const activities = await ActivityService.getActivity(params.activityId);
    if (!activities) {
        return {
            title: '404',
        }
    }

    return {
        title: activities!.title,
        description: activities!.preview,
        robots: 'index, follow',
        openGraph: {
            title: activities!.title,
            description: activities!.preview,
            images: [activities!.thumbnailUrl],
            type: 'website',
            locale: 'vi'
        },
    }
}

export default async function Page({ params: { activityId } }: { params: { activityId: string } }) {
    const activity = await ActivityService.getActivity(activityId);
    if (!activity) {
        return redirect('/');
    }

    let [moreActivities, _, __] = await ActivityService.getActivitiesByStatus(ACTIVITY_STATUS.PUBLISHED, Timestamp.fromDate(activity.createdAt));
    if (moreActivities.length === 0) {
        [moreActivities, _, __] = await ActivityService.getActivitiesByStatus(ACTIVITY_STATUS.PUBLISHED);
    }

    return <ActivityPage activity={activity} moreActivities={moreActivities.slice(0, 3)} />
}