import {useState} from "react";
import {DoCardIcon} from "@/components/shared/Svg";
import FilterDropdown from "@/components/shared/FilterDropdown";
import OptionalDoCardPenaltySection from "@/components/routes/kids/kid/do-cards/OptionalDoCardPenaltySection";
import MandatoryDoCardPenaltySection from "@/components/routes/kids/kid/do-cards/MandatoryDoCardPenaltySection";
import CompletedDoCardPenaltySection from "@/components/routes/kids/kid/do-cards/CompletedDoCardPenaltySection";
import ProcessingDoCardPenaltySection from "@components/routes/kids/kid/do-cards/ProcessingDoCardPenaltySection";

const filterArray = ["Optional", "Mandatory", "Processing", "Completed"];

const DoCardsPenalties = () => {
    const [selectedFilter, setSelectedFilter] = useState(filterArray[0]);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <div>
            <div className={"flex-center-between"}>
                <p className={"flex-center gap-2 font-medium"}>Do-Card Penalties <span>{DoCardIcon}</span></p>

                <FilterDropdown filterOptionArray={filterArray} setSelected={setSelectedFilter} selected={selectedFilter} setIsFocus={setIsFocus} isFocus={isFocus}/>
            </div>

            {selectedFilter === "Optional" && <OptionalDoCardPenaltySection />}
            {selectedFilter === "Mandatory" && <MandatoryDoCardPenaltySection/>}
            {selectedFilter === "Processing" && <ProcessingDoCardPenaltySection/>}
            {selectedFilter === "Completed" && <CompletedDoCardPenaltySection/>}

        </div>
    );
};

export default DoCardsPenalties;