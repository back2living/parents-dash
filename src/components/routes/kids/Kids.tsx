import KidCard from "@/components/routes/kids/KidCard";
import FormModal from "@/components/shared/FormModal";
import {useState} from "react";
import AddKid from "@/components/routes/kids/modal/AddKid";
import {IKid} from "@/hooks/useKids";

const Kids = ({kids}: {kids: IKid[]}) => {
    const [addKidModal, setAddKidModal] = useState(false);
    return (
        <div>
            <div className={"flex-center-between mt-4 lg:mt-0"}>
                <p className={"text-primary text-md lg:text-lg font-semibold"}>Manage Kids ({kids?.length})</p>
                <button onClick={() => setAddKidModal(true)} className={"w-[150px] lg:w-[200px] primary-btn"}>New kid</button>
            </div>

            <div className={"kids-grid"}>
                {kids?.map((kid) => <KidCard key={kid._id} kid={kid}/>)}
            </div>

            <FormModal isOpen={addKidModal} style={"lg:w-[550px] rounded-t-3xl max-h-full overflow-y-auto lg:mb-0"}>
                <AddKid closeModal={() => setAddKidModal(false)} />
            </FormModal>
        </div>
    );
};

export default Kids;