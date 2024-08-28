import Link from "next/link";
import {
    useApproveOrRejectKidChecklistTask,
    useFetchKidChecklistTasks,
} from "@/hooks/useTasks";
import NoData from "@/components/shared/NoData";
import {useState} from "react";
import {useCurrentKid} from "@/store/kid/kidStore";
import {IChecklistTask} from "@interfaces/TaskInterface";

export const Loader = () => {
    return <div className={"mt-6 flex-column gap-2"}>
        {Array.from({length: 5}).map((_, index) => <div key={index} className={"flex-center-between bg-animate rounded-xl p-3 h-10"}></div>)}
    </div>
}

const RecentTasks = () => {
    const currentKid = useCurrentKid();
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

    const {data, isPending} = useFetchKidChecklistTasks(currentKid?._id || "");
    const {isPending: isSubmittingRequest, mutate} = useApproveOrRejectKidChecklistTask();

    const isEmpty = data?.data?.length === 0;
    const handleApproveOrRejectTask = (task: IChecklistTask, index: number, approved: boolean) => {
        setSelectedIndex(index);
        mutate({
            id: task?._id,
            approved,
            kidId: currentKid?._id
        });
    }

    return (
        <div>
            <div>
                <div className={"flex-center-between"}>
                    <p className={"text-md font-semibold text-primary"}>Recent Tasks</p>
                    {isEmpty && <Link className={"flex justify-center text-orange font-semibold text-sm underline-offset-2"}
                           href={`/kids/${currentKid?._id}/tasks`}>View all</Link>}
                </div>

                {isPending && <Loader/>}
                {isEmpty && <NoData image={"/assets/images/no-task.png"} text={"No Task Awaiting Approval"}/>}
                {!isEmpty && <div className={"flex-column gap-2 mt-6"}>
                    {data?.data?.map((task, index: number) => task.tasks?.slice(0,1)?.map((task: IChecklistTask) => <div key={task?._id} className={"flex-center-between bg-primary rounded-xl p-3"}>
                        <div className={"flex-center gap-2 lg:gap-1 xl:gap-2"}>
                            <p>{task?.checklistInfo?.icon}</p>
                            <p className={"text-primary text-sm font-medium"}>{task?.checklistInfo?.title}</p>
                        </div>

                        <div className={"flex-center text-sm gap-2 lg:gap-1.5 xl:gap-4"}>
                            {!isSubmittingRequest && <button onClick={() => handleApproveOrRejectTask(task, index, true)} className={"text-sm text-orange font-medium"}>Approve</button>}
                            {isSubmittingRequest && <button disabled={true} className={`text-sm text-orange font-medium disabled:cursor-not-allowed ${selectedIndex === index && "animate-pulse"}`}>Approve</button>}

                            {!isSubmittingRequest &&
                                <button onClick={() => handleApproveOrRejectTask(task, index, false)}
                                        className={"text-sm text-secondary font-medium"}>Decline</button>}
                            {isSubmittingRequest && <button disabled={true}
                                                            className={`text-sm text-secondary font-medium disabled:cursor-not-allowed ${selectedIndex === index && "animate-pulse"}`}>Decline</button>}
                        </div>
                    </div>))}
                </div>}

                {!isEmpty && <Link className={"mt-2 flex justify-center text-orange font-semibold text-sm underline underline-offset-2"} href={`/kids/${currentKid?._id}/tasks`}>View all</Link>}
            </div>
        </div>
    );
};

export default RecentTasks;