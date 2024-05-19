import {savingsData} from "@/constants/data";
import RequestItem from "@/components/routes/savings/RequestItem";

const SavingRequests = () => {
    return (
        <div className={"mt-6 max-w-[600px]"}>
            <div className={"mt-6 flex-column gap-2"}>
                {savingsData.map((goal, index) => <RequestItem goal={goal} key={index}/>)}
            </div>
        </div>
    );
};

export default SavingRequests;