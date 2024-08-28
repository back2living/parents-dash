import AwaitingApproval from "@/components/routes/tasks/AwaitingApproval";
import {IChecklistTaskKid} from "@interfaces/TaskInterface";

const Tasks = ({activeKidTab}: { activeKidTab: IChecklistTaskKid }) => {
    return (
        <div className="flex-1 pr-6">
            <div className={"py-4 flex-center-between"}>
                <p className={"flex-center gap-1 text-[#515151] font-semibold"}>{activeKidTab?.firstName} Tasks <span className={"text-sm font-medium text-secondary"}>{activeKidTab?.tasks?.length}</span></p>
            </div>

            <AwaitingApproval tasks={activeKidTab?.tasks} />
        </div>
    );
};

export default Tasks;