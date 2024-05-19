import Link from "next/link";
import {savingsData} from "@/constants/data";
import SavingGoalItem from "@/components/routes/savings/SavingGoalItem";

const Savings = () => {
    return (
        <div className={"w-full lg:w-[48.5%] max-w-[700px] mt-14"}>
            <div className={"flex-center-between"}>
                <p className={"text-lg font-semibold text-[#515151]"}>Savings</p>
                <p className={"text-orange font-semibold text-sm"}>All savings</p>
            </div>

            <div className={"mt-6 flex-column gap-2"}>
                {savingsData.map((goal, index) => <SavingGoalItem goal={goal} key={index}/>)}
            </div>
            <Link className={"mt-2 flex justify-center text-orange font-semibold text-sm underline underline-offset-2"} href={"/savings"}>View all</Link>
        </div>
    );
};

export default Savings;