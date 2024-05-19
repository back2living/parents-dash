import {kidsData} from "@/constants/data";
import KidCard from "@/components/routes/kids/KidCard";
import FormModal from "@/components/shared/FormModal";
import {useState} from "react";
import AddKid from "@/components/routes/kids/modal/AddKid";

const Kids = () => {
    const [addKidModal, setAddKidModal] = useState(false);
    return (
        <div>
            <div className={"flex-center-between"}>
                <p className={"text-primary text-md lg:text-lg font-semibold"}>Manage Kids ({kidsData?.length})</p>
                <button onClick={() => setAddKidModal(true)} className={"w-[150px] lg:w-[200px] primary-btn"}>New kid</button>
            </div>

            <div className={"mt-6 lg:mt-10 grid grid-cols-2 gap-4 lg:flex-center lg:flex-wrap lg:gap-6"}>
                {kidsData.map((item, index) => <KidCard key={index} item={item}/>)}
            </div>

            <FormModal isOpen={addKidModal} style={"lg:w-[550px] rounded-t-3xl max-h-full overflow-y-auto lg:mb-0"}>
                <AddKid closeModal={() => setAddKidModal(false)} />
            </FormModal>
        </div>
    );
};

export default Kids;