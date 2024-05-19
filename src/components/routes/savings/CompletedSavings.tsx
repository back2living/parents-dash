import SavingGoalItem from "@/components/routes/savings/SavingGoalItem";
import Image from "next/image";
import {completedSavingsData} from "@/constants/data";

const CompletedSavings = () => {
    const isEmpty = completedSavingsData.length < 1;

    return (
        <div className={""}>
            <div className={"mt-6 flex-column gap-2"}>
                {isEmpty && <div className={"flex-column items-center gap-4 py-12"}>
                    <Image src={"/assets/images/savings.svg"} alt={"savings"} width={80} height={80}/>
                    <p className={"text-primary font-semibold"}>No savings goals completed yet</p>
                </div>}
                {!isEmpty && completedSavingsData.map((goal, index) => <div className={"max-w-[600px]"}>
                    <SavingGoalItem goal={goal} isCompleted={true} key={index}/>
                </div>)}
            </div>
        </div>
    );
};

export default CompletedSavings;