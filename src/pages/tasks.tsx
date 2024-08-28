import DashboardLayout from "@/layouts/DashboardLayout";
import Card from "@/components/shared/Card";
import Categories from "@/components/routes/tasks/Categories";
import Tasks from "@/components/routes/tasks/Tasks";
import {useEffect, useState} from "react";
import MobileKids from "@/components/routes/tasks/MobileKids";
import {useFetchKidsChecklistTasks} from "@/hooks/useTasks";
import TaskLoader from "@/components/routes/tasks/TaskLoader";
import {IChecklistTaskKid} from "@interfaces/TaskInterface";

const TasksPage = () => {
    const [activeKidTab, setActiveKidTab] = useState<IChecklistTaskKid>({
        __v: 0,
        _id: "",
        avatar: "",
        createdAt: "",
        device: "",
        dob: {day: 0, month: 0, year: 0},
        email: "",
        fcmTokens: [],
        firstName: "",
        gender: "",
        guardian: "",
        hasSeenOnboarding: false,
        isDeleted: false,
        isSubscribed: false,
        isVerified: false,
        lastName: "",
        password: "",
        passwordChangeAt: "",
        passwordResetToken: "",
        points: 0,
        role: "",
        suspended: false,
        tasks: [],
        updatedAt: "",
        username: ""
    });
    const {data, isPending, isRefetching} = useFetchKidsChecklistTasks();
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    useEffect(() => {
        if (!isPending || isRefetching) {
            setActiveKidTab(data?.data[activeTabIndex]);
            setActiveTabIndex(activeTabIndex);
        }
    }, [isPending, isRefetching]);

    return (
        <DashboardLayout title={"Tasks"}>
            <div>
                <div className={"flex-center flex-wrap gap-4 mt-6"}>
                    <Card
                        textColor={"#868686"}
                        text={"Tasks waiting for approval"}
                        count={1}
                        img={"task-two-bg.png"}
                        className={"tasks-card min-w-[240px]"}
                    />
                </div>
                {isPending && <TaskLoader />}
                {!isPending && <div className={"mt-10 lg:flex gap-6 rounded-2xl bg-primary p-1.5 hidden lg:min-h-[400px] xl:min-h-[600px]"}>
                    <Categories
                        data={data?.data}
                        activeKidTab={activeKidTab}
                        setActiveKidTab={setActiveKidTab}
                        setActiveTabIndex={setActiveTabIndex}
                    />
                    <Tasks activeKidTab={activeKidTab}/>
                </div>}

                {/*---------------------------MOBILE------------------------------*/}
                {!isPending && <div className={"lg:hidden"}>
                    <MobileKids data={data?.data} activeKidTab={activeKidTab} setActiveKidTab={setActiveKidTab}/>
                </div>}
            </div>
        </DashboardLayout>
    );
};
export default TasksPage;