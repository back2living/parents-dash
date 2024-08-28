import Link from "next/link";
import {useApproveOrRejectKidChecklistTask, useFetchKidsChecklistTasks} from "@/hooks/useTasks";
import {useState} from "react";
import NoData from "@/components/shared/NoData";
import {Loader} from "@/components/routes/kids/kid/RecentTasks";
import {IChecklistTask} from "@interfaces/TaskInterface";

const Tasks = () => {
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

    const {isPending, data} = useFetchKidsChecklistTasks();
    const {isPending: isSubmittingRequest, mutate} = useApproveOrRejectKidChecklistTask();

    const isEmpty = data?.data?.map((kid) => kid?.tasks).flat().length === 0;
    const handleApproveOrRejectTask = (task: IChecklistTask, index: number, approved: boolean, kidId: string) => {
        setSelectedIndex(index);
        mutate({
            id: task?._id,
            approved,
            kidId
        });
    }

    return (
        <div className={"w-full lg:w-[41.5%] max-w-[600px] mt-6 lg:mt-14"}>
            <div className={"flex-center-between"}>
                <p className={"text-md lg:text-lg font-semibold text-[#515151]"}>Tasks</p>
                <p className={"text-orange font-semibold text-sm"}>Pending</p>
            </div>

            <div className={"flex-column gap-2"}>
                {isPending && <Loader />}
                {isEmpty && <NoData image={"/assets/images/no-task.png"} text={"No Task Awaiting Approval"}/>}
                {!isEmpty && <div className={"flex-column gap-2 mt-6"}>
                    {data?.data?.map((kid, index: number) => (kid.tasks).flat().slice(0, 2)?.map(task => <div key={task._id} className={"flex-center-between bg-primary rounded-xl p-3"}>
                        <div className={"flex-center gap-4 lg:gap-2 xl:gap-6"}>
                            <div className="flex-center gap-2 lg:gap-1 xl:gap-2">
                                <div className={"w-10 lg:w-6 xl:w-10"}>
                                    <img className={"w-full h-full rounded-3xl object-cover"} src={kid.avatar} alt=""/>
                                </div>
                                <p className={"text-primary text-sm font-semibold hidden lg:block"}>{kid.firstName}</p>
                            </div>

                            <div className={"flex-center gap-2 lg:gap-1 xl:gap-2"}>
                                <p>{task.checklistInfo?.icon}</p>
                                <p className={"text-primary text-sm font-medium"}>{task.checklistInfo?.title}</p>
                            </div>
                        </div>
                        <div className={"flex-center text-sm gap-2 lg:gap-1.5 xl:gap-4"}>
                            {!isSubmittingRequest && <button onClick={() => handleApproveOrRejectTask(task, index, true, kid._id)} className={"text-sm text-orange font-medium"}>Approve</button>}
                            {isSubmittingRequest && <button disabled={true} className={`text-sm text-orange font-medium disabled:cursor-not-allowed ${selectedIndex === index && "animate-pulse"}`}>Approve</button>}

                            {!isSubmittingRequest && <button onClick={() => handleApproveOrRejectTask(task, index, false, kid._id)} className={"text-sm text-secondary font-medium"}>Decline</button>}
                            {isSubmittingRequest && <button disabled={true} className={`text-sm text-secondary font-medium disabled:cursor-not-allowed ${selectedIndex === index && "animate-pulse"}`}>Decline</button>}
                        </div>
                    </div>))}
                </div>}
            </div>

            {!isPending && !isEmpty && <Link className={"mt-2 flex justify-center text-orange font-semibold text-sm"} href={"/tasks"}>View all</Link>}
        </div>
    );
};
export default Tasks;