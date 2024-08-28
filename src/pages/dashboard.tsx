import DashboardLayout from "@/layouts/DashboardLayout";
import {QuickAccess, Tasks} from "@/components/routes/dashboard";
import MobileQuickAccess from "@/components/routes/dashboard/MobileQuickAccess";
import Onboarding from "@/components/routes/dashboard/Onboarding/Onboarding";
import RecentDoCards from "@/components/routes/dashboard/RecentDoCards";
import {useFetchStats} from "@/hooks/useUsers";
import {useCurrentUser} from "@/store/auth/authStore";

const Dashboard = () => {
    const currentUser = useCurrentUser();
    const showOnboardingModal = !currentUser?.hasSeenOnboarding;
    const {data} = useFetchStats();

    return (
        <DashboardLayout title={"Dashboard"}>
            <div>
                <QuickAccess stats={data?.data} />
                <MobileQuickAccess stats={data?.data} />

                <div className={"lg:flex lg:gap-10 xl:gap-20"}>
                    <Tasks />
                    <RecentDoCards />
                </div>

                {showOnboardingModal && <Onboarding/>}
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;