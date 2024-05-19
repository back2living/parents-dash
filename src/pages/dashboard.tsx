import DashboardLayout from "@/layouts/DashboardLayout";
import {QuickAccess, Tasks, Savings} from "@/components/routes/dashboard";
import MobileQuickAccess from "@/components/routes/dashboard/MobileQuickAccess";

const Dashboard = () => {
    return (
        <DashboardLayout title={"Dashboard"}>
            <div>
                <QuickAccess />
                <MobileQuickAccess />

                <div className={" lg:flex-between"}>
                    <Tasks />
                    <Savings />
                </div>

            </div>
        </DashboardLayout>
    );
};

export default Dashboard;