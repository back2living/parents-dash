import DashboardLayout from "@/layouts/DashboardLayout";
import {useEffect, useState} from "react";
import FormModal from "@/components/shared/FormModal";
import NewChecklistCategoryModal from "@/components/routes/checklists/modals/NewChecklistCategory";
import NewChecklist from "@/components/routes/checklists/modals/NewChecklist";
import {useFetchChecklistsCategories} from "@/hooks/useChecklists";
import ChecklistSection from "@/components/shared/ChecklistSection";
import ChecklistLoader from "@/components/routes/checklists/Loader";
import {IChecklistCategory} from "@interfaces/ChecklistInterface";

const Checklists = () => {
    const [newCategoryModal, setNewCategoryModal] = useState<boolean>(false);
    const [newChecklistModal, setNewChecklistModal] = useState<boolean>(false);
    const [newActiveCategory, setNewActiveCategory] = useState<IChecklistCategory>({
        __v: 0,
        _id: "",
        checklists: [],
        createdAt: "",
        guardian: "",
        icon: "",
        isDeleted: false,
        isGlobal: false,
        kid: null,
        title: "",
        updatedAt: ""
    });
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const {data, isPending, isRefetching} = useFetchChecklistsCategories(true);

    useEffect(() => {
        if (!isPending || isRefetching) {
            setNewActiveCategory(data?.data[activeTabIndex]);
            setActiveTabIndex(activeTabIndex);
        }
    }, [isPending, isRefetching]);

    if (isPending) return <ChecklistLoader />

    return (
        <DashboardLayout title={"Checklists"}>
            <div className={"flex gap-4 lg:gap-6 mt-7"}>
                <button onClick={() => setNewChecklistModal(true)} className={"primary-btn w-fit px-4 lg:px-[30px]"}>New checklist +</button>
                <button onClick={() => setNewCategoryModal(true)} className={"white-btn w-fit px-4 lg:px-[30px]"}>New category</button>
            </div>

            <ChecklistSection
                setActiveTabIndex={setActiveTabIndex}
                newActiveCategory={newActiveCategory}
                setNewActiveCategory={setNewActiveCategory}
                data={data}
            />

            <FormModal isOpen={newCategoryModal || newChecklistModal} style={`lg:w-[550px] max-h-full overflow-y-auto lg:mb-0 rounded-t-3xl`}>
                {newCategoryModal && <NewChecklistCategoryModal closeModal={() => setNewCategoryModal(false)}/>}
                {newChecklistModal && <NewChecklist activeCategory={newActiveCategory} categoryExists={false} closeModal={() => setNewChecklistModal(false)}/>}
            </FormModal>
        </DashboardLayout>
    );
};
export default Checklists;