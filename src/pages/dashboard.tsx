import DashboardLayout from "@/layouts/DashboardLayout";
import {QuickAccess, Tasks, Savings} from "@/components/routes/dashboard";
import MobileQuickAccess from "@/components/routes/dashboard/MobileQuickAccess";
import Onboarding from "@/components/routes/dashboard/Onboarding/Onboarding";
import FormModal from "@/components/shared/FormModal";
import {useState} from "react";

const Dashboard = () => {
    const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(true);

    return (
        <DashboardLayout title={"Dashboard"}>
            <div>
                <QuickAccess />
                <MobileQuickAccess />

                <div className={"lg:flex-between"}>
                    <Tasks />
                    <Savings />
                </div>

                {showOnboardingModal && <Onboarding setShowOnboardingModal={setShowOnboardingModal}/>}
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;