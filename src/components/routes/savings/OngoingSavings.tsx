import SavingGoalItem from "@/components/routes/savings/SavingGoalItem";
import {savingsData} from "@/constants/data";

const OngoingSavings = () => {
    return (
        <div className={"max-w-[600px]"}>
            <div className={"mt-6 flex-column gap-2"}>
                {savingsData.map((goal, index) => <SavingGoalItem goal={goal} key={index}/>)}
            </div>
        </div>
    );
};

export default OngoingSavings;