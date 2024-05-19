import Link from "next/link";
import FormModal from "@/components/shared/FormModal";
import {useState} from "react";
import {Savings} from "@/components/routes/dashboard";
import {useRouter} from "next/router";
import SavingGoalItem from "@/components/routes/savings/SavingGoalItem";
import {savingsData} from "@/constants/data";

const SavingGoals = () => {
    const {query: {id}} = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <div className={""}>
                <div className={"flex-center-between"}>
                    <p className={"text-md font-semibold text-primary"}>Savings</p>
                    <button onClick={() => setShowModal(true)} className={"text-orange font-semibold text-sm underline"}>New Saving goal</button>
                </div>

                <div className={"mt-6 flex-column gap-2"}>
                    {savingsData.map((goal, index) => <SavingGoalItem goal={goal} key={index} />)}
                </div>

                <Link
                    className={"mt-2 flex justify-center text-orange font-semibold text-sm underline underline-offset-2"}
                    href={`/kids/${id}/savings`}>View all</Link>
            </div>

            {/*-----TODO: add savings modal-----*/}
            <FormModal isOpen={showModal} style={"lg:w-[450px] max-h-full overflow-y-auto lg:mb-0"}>
                {/*<Savings closeModal={() => setShowModal(false)}/>*/}
            </FormModal>
        </>
    );
};

export default SavingGoals;