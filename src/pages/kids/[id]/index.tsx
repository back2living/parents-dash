import DashboardLayout from "@/layouts/DashboardLayout";
import {cn} from "@/lib/utils";
import KidProfile from "@/components/routes/kids/kid/KidProfile";
import KidChecklist from "@/components/routes/kids/kid/KidChecklist";
import KidDoCards from "@/components/routes/kids/kid/do-cards/KidDoCards";
import {useFetchKid} from "@/hooks/useKids";
import {useCurrentKid, useKidActiveTab, useSetKidActiveTab} from "@/store/kid/kidStore";

const KidPage = () => {
    const activeTab = useKidActiveTab();
    const setActiveTab = useSetKidActiveTab();

    const handleTabClick = (tab: string) => setActiveTab(tab);

    const currentKid = useCurrentKid();
    const {data, isPending} = useFetchKid(currentKid?._id || "");
    
    if (isPending) {
        return (
            <DashboardLayout showBack title={currentKid?.firstName || "Kid..."}>
                <div className={"mt-6 flex-center flex-wrap gap-2 mb-10"}>
                    <button className={"h-14 w-44 rounded-full bg-animate"} />
                    <button className={"h-14 w-44 rounded-full bg-animate"} />
                    <button className={"h-14 w-44 rounded-full bg-animate"} />
                </div>

                <div className={"grid grid-cols-1 lg:grid-cols-2 lg:gap-20"}>
                    <div className={"max-w-[600px]"}>
                        <div className={"mt-10 rounded-2xl bg-animate hidden md:block lg:min-h-[100px]"}/>
                        <div className={"mt-10 rounded-2xl bg-animate hidden md:block lg:min-h-[200px]"}/>
                        <div className={"mt-10 rounded-2xl bg-animate hidden md:block lg:min-h-[400px]"}/>

                    </div>

                    <div className={"max-w-[600px]"}>
                        <div className={"mt-10 rounded-2xl bg-animate hidden md:block lg:min-h-[350px]"}/>
                        <div className={"mt-10 rounded-2xl bg-animate hidden md:block lg:min-h-[350px]"}/>
                        <div className={"mt-10 rounded-2xl bg-animate hidden md:block lg:min-h-[350px]"}/>

                    </div>
                </div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout showBack title={currentKid?.firstName}>
            <div className={"mt-6 flex-center flex-wrap gap-2 mb-10"}>
                <button onClick={() => handleTabClick("profile")}
                        className={cn(activeTab === "profile" ? "active-btn" : "inactive-btn")}>Profile
                </button>
                <button onClick={() => handleTabClick("checklists")}
                        className={cn(activeTab === "checklists" ? "active-btn" : "inactive-btn")}>Checklists
                </button>
                <button onClick={() => handleTabClick("do-cards")} className={cn(activeTab === "do-cards" ? "active-btn" : "inactive-btn")}>Do-Cards</button>
            </div>

            {activeTab === "profile" && <KidProfile />}
            {activeTab === "checklists" && <KidChecklist kidData={data?.data} />}
            {activeTab === "do-cards" && <KidDoCards kidData={data?.data} />}

        </DashboardLayout>
    );
};

export default KidPage;