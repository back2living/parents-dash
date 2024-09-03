import {ChevronDown} from "lucide-react";
import {useState} from "react";
import {useApproveOrRejectKidChecklistTask} from "@/hooks/useTasks";
import {IChecklistTask} from "@interfaces/TaskInterface";

const AwaitingApproval = ({tasks}: {tasks: IChecklistTask[]}) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(true);
    const openDropdown = () => setShowDropdown(prevState => !prevState);
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

    const {isPending, mutate} = useApproveOrRejectKidChecklistTask();

    const handleApproveOrRejectTask = (task: IChecklistTask, index: number, approved: boolean) => {
        setSelectedIndex(index);
        mutate({
            id: task?._id,
            approved
        });
    }

    return (
        <div className={"mt-6"}>
            <div onClick={openDropdown} className={"flex-center-between cursor-pointer"}>
                <p className={"flex-center gap-1 text-secondary-dark font-semibold text-sm"}>⏳ Awaiting approval <span className={"font-medium text-secondary"}>{tasks?.length}</span></p>
                <ChevronDown size={16} className={"text-[#B1B1B1]"}/>
            </div>
            {showDropdown && <div className={"mt-2 flex-column gap-2 h-[500px] overflow-auto"}>

                {tasks?.length === 0 && <div className={"flex-column items-center gap-4 mt-6"}>
                    <img className={"w-16 h-16"} src="/assets/images/menu-board.png" alt=""/>
                    <div className={"text-center text-sm lg:text-base"}>
                        <p className={"text-primary font-semibold"}>Ooops nothing to show here</p>
                        <p className={"text-secondary mt-1"}>Encourage your kid to start working on tasks.</p>
                    </div>
                </div>}



                {tasks?.length > 0 && tasks?.map((task, index: number) => <div key={task?._id}
                    className={"flex-center-between p-3 bg-white border border-[#E8E8E8] rounded-xl"}>
                    <div className={"flex-center gap-2"}>
                        <span>{task?.checklistInfo?.icon}</span>
                        <p className={"font-medium text-[#363636] flex-1 capitalize"}>{task?.checklistInfo?.title}</p>
                    </div>

                    <div className={"flex-center gap-4"}>
                        {!isPending && <button onClick={() => handleApproveOrRejectTask(task, index, true)} className={"text-sm text-orange font-medium"}>Approve</button>}
                        {isPending && <button disabled={true} className={`text-sm text-orange font-medium disabled:cursor-not-allowed ${selectedIndex === index && "animate-pulse"}`}>Approve</button>}

                        {!isPending && <button onClick={() => handleApproveOrRejectTask(task, index, false)} className={"text-sm text-secondary font-medium"}>Decline</button>}
                        {isPending && <button disabled={true} className={`text-sm text-secondary font-medium disabled:cursor-not-allowed ${selectedIndex === index && "animate-pulse"}`}>Decline</button>}
                    </div>
                </div>)}
            </div>}
        </div>
    );
};

export default AwaitingApproval;