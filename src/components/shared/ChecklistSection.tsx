import {Dispatch, SetStateAction, useState} from "react";
import ChecklistCategory from "@/components/routes/checklists/ChecklistCategory";
import {Plus} from "lucide-react";
import {DeleteChecklistIcon, EditChecklistIcon} from "@/components/shared/Svg";
import MobileChecklist from "@/components/routes/checklists/MobileChecklist";
import FormModal from "@/components/shared/FormModal";
import NewChecklistCategoryModal from "@/components/routes/checklists/modals/NewChecklistCategory";
import NewChecklist from "@/components/routes/checklists/modals/NewChecklist";
import EditChecklist from "@/components/routes/checklists/modals/EditChecklist";
import DeleteChecklist from "@/components/routes/checklists/modals/DeleteChecklist";
import {IKid} from "@/hooks/useKids";
import {FetchChecklistCategory, IChecklist, IChecklistCategory} from "@/interfaces/ChecklistInterface";
import {useCurrentKid} from "@store/kid/kidStore";

interface IChecklistComponent {
    // newActiveCategory: IChecklistCategory | null;
    newActiveCategory: IChecklistCategory
    setNewActiveCategory: Dispatch<SetStateAction<IChecklistCategory>>
    // setNewActiveCategory:  Dispatch<SetStateAction<IChecklistCategory | null>>;
    data: FetchChecklistCategory;
    kidData?: IKid
    setActiveTabIndex: Dispatch<SetStateAction<number>>;
}

const ChecklistSection = ({setNewActiveCategory, newActiveCategory, data, kidData, setActiveTabIndex}: IChecklistComponent) => {
    const [newCategoryModal, setNewCategoryModal] = useState<boolean>(false);
    const [newChecklistModal, setNewChecklistModal] = useState<boolean>(false);
    const [editChecklistModal, setEditChecklistModal] = useState<boolean>(false);
    const [deleteChecklistModal, setDeleteChecklistModal] = useState<boolean>(false);
    const [selectedChecklist, setSelectedChecklist] = useState<null | IChecklist>(null);
    const [categoryExists, setCategoryExists] = useState(false);

    const handleChangeCategory = (category: IChecklistCategory, index?: number) => {
        setNewActiveCategory(category);
        setActiveTabIndex(index || 0)
    }

    const handleShowEditChecklistModal = (checklist: IChecklist) => {
        setSelectedChecklist(checklist);
        setEditChecklistModal(true);
    }

    const handleShowDeleteChecklistModal = (checklist: IChecklist) => {
        setSelectedChecklist(checklist);
        setDeleteChecklistModal(true);
    }

    const currentKid = useCurrentKid();

    return (
        <div>
            {/*---------------------------DESKTOP------------------------------*/}
            <div className={"mt-10 lg:flex gap-6 rounded-2xl bg-primary p-1.5 hidden min-h-[400px] xl:min-h-[600px]"}>
                {/*------------ CATEGORIES ------------*/}
                <div className="p-2 min-w-[300px] w-[26.3%] rounded-xl max-w-[310px] bg-white overflow-auto hidden lg:block">
                    <h3 className={"p-4 text-secondary-dark font-semibold"}>Categories</h3>
                    <div className={"flex-column gap-2 font-medium"}>
                        {data?.data?.map(((item, index:number) => <ChecklistCategory
                            kidData={kidData}
                            handleChangeCategory={() => handleChangeCategory(item, index)}
                            isActive={newActiveCategory?._id === item?._id}
                            category={item}
                            key={item._id}
                        />))}
                        <button onClick={() => setNewCategoryModal(true)} className={"ml-3 text-[#B1B1B1] flex-center gap-2 text-sm"}>
                            <Plus size={20} className={"text-[#B1B1B1]"}/> New Category
                        </button>
                    </div>
                </div>

                {/*------------ TASKS ------------*/}
                <div className="flex-1 pr-6">
                    <div className={"py-4 flex-center-between"}>
                        <p className={"flex-center gap-1 text-[#515151] font-semibold"}>{newActiveCategory?.title} <span className={"text-sm font-medium text-secondary"}>{newActiveCategory?.checklists?.length}</span></p>
                        <button onClick={() => {
                            setCategoryExists(true);
                            setNewChecklistModal(true);
                        }} className={"text-sm font-semibold text-[#B1B1B1] flex-center gap-1"}>New Checklist <Plus size={20} className={"text-[#B1B1B1]"}/></button>
                    </div>

                    <div className={"mt-2 flex-column gap-2"}>
                        {newActiveCategory?.checklists?.map((checklist, index: number) => <div key={index} className={"flex-center-between p-3 bg-white border border-[#E8E8E8] rounded-xl"}>
                                <p className={"font-medium text-[#363636] flex-1 flex-center gap-1"}><span>{checklist.icon}</span> <span>{checklist.title}</span></p>
                                <div className={"flex-center gap-4 text-sm font-medium"}>
                                    <p className={"text-green"}>Reward: {checklist?.reward}pts</p>
                                    <p className={"text-orange"}>Penalty: {checklist?.penalty}pts</p>
                                    <button onClick={() => handleShowDeleteChecklistModal(checklist)} className={"text-sm text-orange font-medium"}>{DeleteChecklistIcon}</button>
                                    <button onClick={() => handleShowEditChecklistModal(checklist)} className={"text-sm text-secondary font-medium"}>{EditChecklistIcon}</button>
                                </div>
                            </div>)}
                    </div>
                </div>
            </div>

            {/*---------------------------MOBILE------------------------------*/}
            <div className={"lg:hidden"}>
                <MobileChecklist
                    setNewChecklistModal={setNewChecklistModal}
                    setNewCategoryModal={setNewCategoryModal}
                    data={data}
                    kidData={kidData}
                    handleChangeCategory={handleChangeCategory}
                    newActiveCategory={newActiveCategory}
                    handleShowDeleteChecklistModal={handleShowDeleteChecklistModal}
                    handleShowEditChecklistModal={handleShowEditChecklistModal}
                />
            </div>

            <FormModal isOpen={newCategoryModal || newChecklistModal || editChecklistModal} style={`lg:w-[550px] max-h-full overflow-y-auto lg:mb-0 rounded-t-3xl`}>
                {newCategoryModal && <NewChecklistCategoryModal
                    kidData={kidData}
                    closeModal={() => setNewCategoryModal(false)}
                />}

                {newChecklistModal && <NewChecklist
                    data={data}
                    kidId={kidData?._id}
                    activeCategory={newActiveCategory}
                    categoryExists={categoryExists}
                    closeModal={() => setNewChecklistModal(false)}
                />}

                {editChecklistModal && <EditChecklist
                    categoryExists={categoryExists}
                    activeCategory={newActiveCategory}
                    data={data}
                    kidId={currentKid?._id}
                    selectedChecklist={selectedChecklist}
                    closeModal={() => setEditChecklistModal(false)}
                />}

                {/*{newChecklistModal && <MutateChecklist data={data} kidId={kidData?._id} activeCategory={newActiveCategory} categoryExists={categoryExists} closeModal={() => setNewChecklistModal(false)}/>}*/}
                {/*{editChecklistModal && <MutateChecklist categoryExists={categoryExists} activeCategory={newActiveCategory} data={data} kidId={kidData?._id} selectedChecklist={selectedChecklist} closeModal={() => setEditChecklistModal(false)}/>}*/}

            </FormModal>
            <FormModal isOpen={deleteChecklistModal} style={`lg:w-[450px] w-[95%] max-h-full overflow-y-auto mb-8 lg:mb-0 rounded-3xl`}>
                <DeleteChecklist kidId={currentKid?._id} selectedChecklist={selectedChecklist} closeModal={() => setDeleteChecklistModal(false)} />
            </FormModal>
        </div>
    );
};
export default ChecklistSection;