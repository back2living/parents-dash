import {DoCardIcon} from "@/components/shared/Svg";
import {useState} from "react";
import OngoingDoCardSection from "@/components/routes/kids/kid/do-cards/OngoingDoCardSection";
import CompletedDoCardSection from "@/components/routes/kids/kid/do-cards/CompletedDoCardSection";
import RequestDoCardSection from "@/components/routes/kids/kid/do-cards/RequestDoCardSection";
import FilterDropdown from "@/components/shared/FilterDropdown";

const filterArray = ["Ongoing", "Request", "Completed"];

const DoCardGoals = () => {
    const [selectedFilter, setSelectedFilter] = useState(filterArray[0]);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <div>
            <div className={"flex-center-between"}>
                <p className={"flex-center gap-2"}>Do-Card Goals <span>{DoCardIcon}</span></p>

                <FilterDropdown filterOptionArray={filterArray} setSelected={setSelectedFilter} selected={selectedFilter} setIsFocus={setIsFocus} isFocus={isFocus} />
            </div>

            {selectedFilter === "Ongoing" && <OngoingDoCardSection />}
            {selectedFilter === "Request" && <RequestDoCardSection />}
            {selectedFilter === "Completed" && <CompletedDoCardSection />}
        </div>
    );
};

export default DoCardGoals;