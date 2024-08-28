import {
    DuplicateIcon,
} from "@/components/shared/Svg";
import FormModal from "@/components/shared/FormModal";
import {useEffect, useState} from "react";
import DuplicateChecklist from "@/components/routes/kids/modal/DuplicateChecklist";
import ChecklistSection from "@/components/shared/ChecklistSection";
import {useFetchKidChecklistsCategories} from "@/hooks/useChecklists";
import {useCurrentKid} from "@/store/kid/kidStore";
import {IChecklistCategory} from "@interfaces/ChecklistInterface";
import {IKid} from "@hooks/useKids";

const KidChecklist = ({kidData}: {kidData: IKid}) => {
    const [showDuplicateModal, setShowDuplicateModal] = useState<boolean>(false);
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

    const currentKid = useCurrentKid();
    const {data, isPending, isRefetching} = useFetchKidChecklistsCategories(true, currentKid?._id || "");

    useEffect(() => {
        setNewActiveCategory(data?.data[activeTabIndex]);
        setActiveTabIndex(activeTabIndex);
    }, [isPending, isRefetching]);

    if (isPending) return <div className={"mt-10 rounded-2xl bg-animate hidden md:block lg:min-h-[400px] xl:min-h-[600px]"}/>

    return (
        <div>
            <div className={"flex-center-between"}>
                <p className={"text-[#515151] lg:text-md font-semibold"}>{currentKid?.firstName}'s Checklists</p>
                <button onClick={() => setShowDuplicateModal(true)} className={"text-orange underline flex-center gap-2"}>Duplicate Checklist {DuplicateIcon}</button>
            </div>

            <ChecklistSection
                setActiveTabIndex={setActiveTabIndex}
                kidData={kidData}
                newActiveCategory={newActiveCategory}
                setNewActiveCategory={setNewActiveCategory}
                data={data}
            />

            <FormModal isOpen={showDuplicateModal} style={`lg:w-[550px] max-h-full overflow-y-auto lg:mb-0 rounded-t-3xl`}>
                <DuplicateChecklist closeModal={() => setShowDuplicateModal(false)}/>
            </FormModal>
        </div>
    );
};

export default KidChecklist;