import {useState} from 'react';
import DashboardLayout from "@/layouts/DashboardLayout";
import FormModal from "@/components/shared/FormModal";
import AddSavingGoals from "@/components/routes/savings/modal/AddSavingGoals";
import {cn} from "@/lib/utils";
import OngoingSavings from "@/components/routes/savings/OngoingSavings";
import CompletedSavings from "@/components/routes/savings/CompletedSavings";
import SavingRequests from "@/components/routes/savings/SavingRequests";

const Savings = () => {
    const [addSavingGoalsModal, setAddSavingGoalsModal] = useState(false);
    const [activeTab, setActiveTab] = useState("ongoing");

    const handleTabClick = (tab: string) => setActiveTab(tab);

    return (
        <DashboardLayout title={"Savings"}>
            <div>
                <div className={"flex-center-between"}>
                    <p className={"text-lg font-semibold text-[#515151]"}>Savings goals</p>
                    <button onClick={() => setAddSavingGoalsModal(true)} className={"primary-btn w-fit font-semibold"}>+ New savings goals</button>
                </div>

                <div className={"mt-6 flex-center gap-2"}>
                    <button onClick={() => handleTabClick("ongoing")} className={cn(activeTab === "ongoing" ? "active-btn" : "inactive-btn")}>Ongoing</button>
                    <button onClick={() => handleTabClick("completed")} className={cn(activeTab === "completed" ? "active-btn" : "inactive-btn")}>Completed</button>
                    <button onClick={() => handleTabClick("requests")} className={cn(activeTab === "requests" ? "active-btn" : "inactive-btn")}>Requests <sup>4</sup></button>
                </div>

                {activeTab === "ongoing" && <OngoingSavings />}
                {activeTab === "completed" && <CompletedSavings />}
                {activeTab === "requests" && <SavingRequests />}

                <FormModal isOpen={addSavingGoalsModal} style={"lg:w-[550px] max-h-full rounded-t-3xl overflow-y-auto lg:mb-0"}>
                    <AddSavingGoals closeModal={() => setAddSavingGoalsModal(false)}/>
                </FormModal>
            </div>
        </DashboardLayout>
    );
};

export default Savings;