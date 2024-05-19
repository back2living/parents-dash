import DashboardLayout from "@/layouts/DashboardLayout";
import Account from "@/components/routes/settings/Account";
import Security from "@/components/routes/settings/Security";
import Subscription from "@/components/routes/settings/Subscription";
import BillingHistory from "@/components/routes/settings/BillingHistory";
import {useState} from "react";
import {cn} from "@/lib/utils";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("account");

    const handleTabClick = (tab: string) => setActiveTab(tab);

    return (
        <DashboardLayout title={"Settings"}>
            <div>
                <div className={"mt-6 flex-center flex-wrap gap-2"}>
                    <button onClick={() => handleTabClick("account")} className={cn(activeTab === "account" ? "active-btn" : "inactive-btn")}>Account</button>
                    <button onClick={() => handleTabClick("subscription")} className={cn(activeTab === "subscription" ? "active-btn" : "inactive-btn")}>Subscription</button>
                    <button onClick={() => handleTabClick("security")} className={cn(activeTab === "security" ? "active-btn" : "inactive-btn")}>Security</button>
                </div>


                <div className={"mt-10"}>
                    {activeTab === "account" && <Account/>}
                    {activeTab === "security" && <Security/>}
                    {activeTab === "subscription" && <div>
                        <Subscription/>
                        <BillingHistory/>
                    </div>}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;