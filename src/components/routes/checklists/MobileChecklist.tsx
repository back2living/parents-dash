import {Dispatch, SetStateAction, useState} from "react";
import {Plus} from "lucide-react";
import {
    ChecklistMenuIcon,
    CircleCloseIcon,
    DeleteChecklistIcon,
    EditChecklistIcon
} from "@/components/shared/Svg";
import {AnimatePresence, motion} from "framer-motion";
import {mobileVariants} from "@/components/shared/Navbar/MobileNavbar";
import ChecklistCategory from "@/components/routes/checklists/ChecklistCategory";
import {FetchChecklistCategory, IChecklist, IChecklistCategory} from "@interfaces/ChecklistInterface";
import {IKid} from "@hooks/useKids";

interface IMobileChecklist {
    data: FetchChecklistCategory;
    setNewChecklistModal: Dispatch<SetStateAction<boolean>>
    setNewCategoryModal: Dispatch<SetStateAction<boolean>>
    kidData?: IKid
    handleChangeCategory: (category: IChecklistCategory, index?: number) => void
    newActiveCategory: IChecklistCategory
    handleShowDeleteChecklistModal(checklist: IChecklist): void
    handleShowEditChecklistModal(checklist: IChecklist): void
}

const MobileChecklist = ({data, setNewChecklistModal, setNewCategoryModal, handleChangeCategory, newActiveCategory, handleShowEditChecklistModal, handleShowDeleteChecklistModal}:  IMobileChecklist) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleNewCategory = () => setNewCategoryModal(true);

    return (
        <div>
            <div className={"flex-center-between mt-8"}>
                <div className={"flex-center gap-5"}>
                    <button onClick={() => setIsOpen(true)}>{ChecklistMenuIcon}</button>
                    <p className={"flex-center gap-1 text-[#515151] font-semibold"}>
                        {newActiveCategory?.title} <span className={"text-sm font-medium text-secondary"}>{newActiveCategory?.checklists?.length}</span>
                    </p>
                </div>
                <button onClick={() => setNewChecklistModal(true)} className={"text-sm font-semibold text-[#B1B1B1] flex-center gap-1"}>New Checklist <Plus size={20} className={"text-[#B1B1B1]"}/></button>
            </div>


            <div className={"mt-8 flex-column gap-2"}>
                {newActiveCategory?.checklists?.map((checklist, index: number) => <div key={index} className={"p-2 bg-primary border border-[#E8E8E8] rounded-xl"}>
                    <div className={"flex-center-between"}>
                        <p className={"font-medium text-[#363636] flex-1 flex-center gap-1"}>
                            <span>{checklist.icon}</span> <span>{checklist.title}</span>
                        </p>
                        <div className={"flex-center gap-4"}>
                            <button onClick={() => handleShowDeleteChecklistModal(checklist)} className={"text-sm text-orange font-medium"}>{DeleteChecklistIcon}</button>
                            <button onClick={() => handleShowEditChecklistModal(checklist)} className={"text-sm text-secondary font-medium"}>{EditChecklistIcon}</button>
                        </div>
                    </div>
                    <div className={"flex-center-between mt-3"}>
                        <p className={"text-green"}>Reward: {checklist?.reward}pts</p>
                        <p className={"text-orange"}>Penalty: {checklist?.penalty}pts</p>
                    </div>
                </div>)}
            </div>

            <AnimatePresence>
                {isOpen && <motion.div className={"fixed p-4 bg-black/40 top-0 left-0 z-10 h-full w-full"} initial={{opacity: 0, x: -15}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -15}}>
                    <motion.div className={"bg-white mx-auto rounded-2xl h-full max-w-[500px] p-4"} variants={mobileVariants} initial={"initial"} animate={"final"} exit={{opacity: 0}}>
                        <div className={"relative"}>
                            <button onClick={() => setIsOpen(false)} className={"absolute top-2 right-2"}>{CircleCloseIcon}</button>
                           <p className={"p-4"}>Categories</p>
                            <div className={"flex-column gap-2 font-medium"}>
                                {data?.data?.map(((item: IChecklistCategory) => <ChecklistCategory category={item} handleChangeCategory={() => handleChangeCategory(item)} isActive={newActiveCategory?._id === item?._id} key={item._id}/>))}

                                <button onClick={handleNewCategory} className={"ml-3 text-[#B1B1B1] flex-center gap-2 text-sm"}>
                                    <Plus size={20} className={"text-[#B1B1B1]"}/> New Category
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
        </div>
    );
};

export default MobileChecklist;