import DashboardLayout from "@/layouts/DashboardLayout";
import {useState} from "react";
import FilterDropdown from "@/components/shared/FilterDropdown";
import {
    useApproveOrRejectKidChecklistTask,
    useFetchAKidChecklistTasks,
} from "@/hooks/useTasks";
import {useCurrentKid} from "@/store/kid/kidStore";
import {Loader} from "@/components/routes/kids/kid/RecentTasks";
import NoData from "@/components/shared/NoData";
import {IChecklistTask} from "@interfaces/TaskInterface";
import Pagination from "@components/shared/Pagination";

const filterArray = ["pending", "approved", "denied"];
const SelectedIcon = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="8" fill="#09C2B2" stroke="#09C2B2" strokeWidth="2"/>
    <path d="M6 9.77778L8.22222 12L11.5556 7" stroke="white" strokeWidth="1.5" strokeLinecap="round"
          strokeLinejoin="round"/>
</svg>

interface ITaskItem {
    task: IChecklistTask;
    kidId: string;
    status: string;
}
const TaskItem = ({task, kidId, status}: ITaskItem) => {
    const {isPending, mutate} = useApproveOrRejectKidChecklistTask();

    const handleApproveOrRejectTask = (task: IChecklistTask, approved: boolean) => {
        mutate({
            id: task?._id,
            approved,
            kidId,
            status
        });
    }

    return (
        <div className={"flex-center-between bg-primary rounded-xl p-3"}>
            <div className={"flex-center gap-2 lg:gap-1 xl:gap-2"}>
                <p>{task?.checklistInfo?.icon}</p>
                <p className={"text-primary text-sm font-medium"}>{task?.checklistInfo?.title}</p>
            </div>

            {task.status === "pending" && <div className={"flex-center text-sm gap-2 lg:gap-1.5 xl:gap-4 font-medium"}>
                <button disabled={isPending} onClick={() => handleApproveOrRejectTask(task, true)} className={`text-orange ${isPending && "opacity-50 animate-pulse"}`}>Approve</button>
                <button disabled={isPending} onClick={() => handleApproveOrRejectTask(task, false)} className={`text-secondary ${isPending && "opacity-50 animate-pulse"}`}>Decline</button>
            </div>}
            {task.status === "approved" && <div className={"flex-center gap-2 font-semibold text-sm text-green"}>
                <p>{SelectedIcon}</p>
                <p>+ {task?.checklistInfo?.reward} pts</p>
            </div>}
            {task.status === "denied" && <div className={"flex-center gap-2 text-sm font-semibold text-gray-500"}>
                <p>Denied</p>
                <p>- {task?.checklistInfo?.penalty} pts</p>
            </div>}
        </div>
    )
}

const KidTasksPage = () => {
    const currentKid = useCurrentKid();
    const [isFocus, setIsFocus] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(filterArray[0]);
    const [pageNum, setPageNum] = useState(1);

    const {data, isPending} = useFetchAKidChecklistTasks(currentKid?._id || "", selectedFilter, pageNum);
    const isEmpty = data?.data?.length === 0;

    return (
        <DashboardLayout showBack title={"Kid"}>
            <div className={"lg:justify-between flex lg:flex-row flex-col justify-start gap-4 lg:gap-0"}>
                <p className={"text-[#515151] text-md lg:text-lg font-semibold"}>{currentKid?.firstName}’s Tasks</p>
                <FilterDropdown filterOptionArray={filterArray} setSelected={setSelectedFilter} selected={selectedFilter} setIsFocus={setIsFocus} isFocus={isFocus}/>
            </div>
            <div className={"lg:mt-10 max-w-[500px] mx-auto"}>
                {isPending && <Loader />}
                {isEmpty && <NoData image={"/assets/images/no-task.png"} text={`No ${selectedFilter} tasks.`}/>}
                {!isEmpty && <div className={"flex-column gap-2 mt-6"}>
                    {data?.data?.map((task) => <TaskItem kidId={currentKid?._id || ""} task={task} status={selectedFilter} key={task?._id}/>)}
                </div>}

                <Pagination setPageNum={setPageNum} pageNum={pageNum} totalPages={data?.meta?.pages} />
            </div>
        </DashboardLayout>
    );
};

export default KidTasksPage;