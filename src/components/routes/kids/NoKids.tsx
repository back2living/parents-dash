import AddKid from "@/components/routes/kids/modal/AddKid";
import FormModal from "@/components/shared/FormModal";
import {useState} from "react";

const NoKids = () => {
    const [addKidModal, setAddKidModal] = useState<boolean>(false);

    return (
        <div className={"h-full center"}>
            <div className={"flex-column items-center gap-10 w-[30%] max-w-[400px]"}>
                <div className={"w-[41%] max-w-[150px]"}>
                    <img className={"max-w-full"} src="/assets/images/no-kid.png" alt=""/>
                </div>
                <div className={"text-center"}>
                    <p className={"text-primary text-lg font-semibold tracking-[0.48px]"}>You are yet to add a kid</p>
                    <p className={"text-secondary mt-4"}>Create profiles for your kids and start enjoying playground 😎</p>
                </div>
                <button onClick={() => setAddKidModal(true)} className={"primary-btn"}>Add kids</button>
            </div>

            <FormModal isOpen={addKidModal} style={"lg:w-[550px] rounded-t-3xl max-h-full overflow-y-auto lg:mb-0"}>
                <AddKid closeModal={() => setAddKidModal(false)} />
            </FormModal>
        </div>
    );
};

export default NoKids;