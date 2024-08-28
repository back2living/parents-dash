import {Dispatch, SetStateAction, useState} from "react";
import {Plus} from "lucide-react";
import {
    ChecklistMenuIcon,
    CircleCloseIcon,
} from "@/components/shared/Svg";
import {AnimatePresence, motion} from "framer-motion";
import {mobileVariants} from "@/components/shared/Navbar/MobileNavbar";
import {categoryStyle} from "@/components/routes/tasks/Category";
import FormModal from "@/components/shared/FormModal";
import AssignChecklist from "@/components/routes/tasks/modal/AssignChecklist";
import {IChecklistTaskKid} from "@interfaces/TaskInterface";

interface IMobileKids {
    data: IChecklistTaskKid[];
    activeKidTab: IChecklistTaskKid;
    setActiveKidTab:  Dispatch<SetStateAction<IChecklistTaskKid>>;
}


const MobileKids = ({activeKidTab, setActiveKidTab, data}:  IMobileKids) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showAssignChecklistModal, setShowAssignChecklistModal] = useState<boolean>(false);

    const handleKidClick = (item: IChecklistTaskKid) => setActiveKidTab(item);

    return (
        <div>
            <div className={"flex-center-between mt-8"}>
                <div className={"flex-center gap-1"}>
                    <button onClick={() => setIsOpen(true)}>{ChecklistMenuIcon}</button>
                    <p className={"flex-center gap-1 text-[#515151] font-semibold"}>{activeKidTab?.firstName} {activeKidTab?.lastName} <span
                        className={"text-sm font-medium text-secondary"}>{activeKidTab?.tasks?.length}</span></p>
                </div>
                <button className={"text-sm font-semibold text-[#B1B1B1] flex-center gap-1"}>New Checklist <Plus
                    size={20} className={"text-[#B1B1B1]"}/></button>
            </div>
            <div className={"mt-8 flex-column gap-2"}>
                {activeKidTab?.tasks?.map((task, index: number) => <div key={index} className={"flex-center-between p-3 bg-white border border-[#E8E8E8] rounded-xl"}>
                    <div className={"flex-center gap-1 text-sm"}>
                        <span>{task?.checklistInfo?.icon}</span>
                        <p className={"font-medium text-[#363636] flex-1"}>{task?.checklistInfo?.title}</p>
                    </div>

                    <div className={"flex-center gap-2"}>
                        <button className={"text-sm text-orange font-medium"}>Approve</button>
                        <button className={"text-sm text-secondary font-medium"}>Decline</button>
                    </div>
                </div>)}
            </div>

            <AnimatePresence>
                {isOpen && <motion.div className={"fixed p-4 bg-black/40 top-0 left-0 z-10 h-full w-full"}
                                       initial={{opacity: 0, x: -15}} animate={{opacity: 1, x: 0}}
                                       exit={{opacity: 0, x: -15}}>
                    <motion.div className={"bg-white mx-auto rounded-2xl h-full max-w-[500px] p-4"}
                                variants={mobileVariants} initial={"initial"} animate={"final"} exit={{opacity: 0}}>
                        <div className={"relative"}>
                        <button onClick={() => setIsOpen(false)} className={"absolute top-2 right-2"}>{CircleCloseIcon}</button>
                           <p className={"p-4"}>Kids</p>
                            <div className={"flex-column gap-2 font-medium"}>
                                {data?.map((kid) => <div onClick={() => handleKidClick(kid)} className={activeKidTab?._id === kid?._id ? categoryStyle.active : categoryStyle.inactive}>
                                    <div className={"flex-center gap-2"}>
                                        <img className={"w-6 h-6 rounded-lg object-cover"} src={kid?.avatar} alt=""/>
                                        <div className={"text-[#363636]"}>{kid?.firstName} {kid?.lastName}</div>
                                    </div>
                                    <p className={"text-sm text-secondary"}>{kid?.tasks?.length}</p>
                                </div>)}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>


            <FormModal isOpen={showAssignChecklistModal} style={`lg:w-[550px] max-h-full overflow-y-auto lg:mb-0 rounded-t-3xl`}>
                <AssignChecklist closeModal={() => setShowAssignChecklistModal(false)} />
            </FormModal>
        </div>
    );
};

export default MobileKids;