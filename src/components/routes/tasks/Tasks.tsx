import {Plus} from "lucide-react";
import AwaitingApproval from "@/components/routes/tasks/AwaitingApproval";
import OngoingTasks from "@/components/routes/tasks/OngoingTasks";
import CompletedTasks from "@/components/routes/tasks/CompletedTasks";

const Tasks = () => {
    return (
        <div className="flex-1 pr-6">
            <div className={"py-4 flex-center-between"}>
                <p className={"flex-center gap-1 text-[#515151] font-semibold"}>🌞 Morning tasks <span
                    className={"text-sm font-medium text-secondary"}>7</span></p>
                <button className={"text-sm font-semibold text-[#B1B1B1] flex-center gap-1"}>New task <Plus
                    size={20} className={"text-[#B1B1B1]"}/></button>
            </div>


            <AwaitingApproval />
            <OngoingTasks />
            <CompletedTasks />

        </div>
    );
};

export default Tasks;