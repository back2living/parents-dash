import DashboardLayout from "@/layouts/DashboardLayout";
import Card from "@/components/shared/Card";
import {useState} from "react";
import Task from "@/components/routes/tasks/modal/AddTask";
import FormModal from "@/components/shared/FormModal";
import Categories from "@/components/routes/tasks/Categories";
import Tasks from "@/components/routes/tasks/Tasks";

const TasksPage = () => {
    const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

    return (
        <DashboardLayout title={"Tasks"}>
            <div>
                <div className={"flex-center-between"}>
                    <p className={"text-[#515151] text-lg font-semibold"}>Monday, 01 Apr</p>
                    <button onClick={() => setShowTaskModal(true)} className={"primary-btn max-w-[160px]"}>+ New task</button>
                </div>

                <div className={"flex-center flex-wrap gap-4 mt-6"}>
                    <Card
                        textColor={"#AF70EE"}
                        text={"Ongoing tasks"}
                        count={1}
                        img={"task-one-bg.png"}
                        className={"tasks-card"}
                    />
                    <Card
                        textColor={"#868686"}
                        text={"Tasks waiting for approval"}
                        count={1}
                        img={"task-two-bg.png"}
                        className={"tasks-card"}
                    />
                    <Card
                        textColor={"#068177"}
                        text={"Tasks completed"}
                        count={1}
                        img={"task-three-bg.png"}
                        className={"tasks-card"}
                    />
                    <Card
                        textColor={"#D39B26"}
                        text={"Incomplete tasks"}
                        count={1}
                        img={"task-four-bg.png"}
                        className={"tasks-card"}
                    />

                </div>

                <div className={"mt-10 flex items-start gap-6 rounded-2xl bg-primary p-1.5"}>
                    <Categories />
                    <Tasks />
                </div>
            </div>

            <FormModal isOpen={showTaskModal} style={"lg:w-[450px] max-h-full rounded-t-3xl overflow-y-auto lg:mb-0"}>
                <Task closeModal={() => setShowTaskModal(false)}/>
            </FormModal>
        </DashboardLayout>
    );
};
export default TasksPage;