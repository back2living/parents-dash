import {useState} from 'react';
import {ChevronDown} from "lucide-react";
import {VerticalThreeDotIcon} from "@/components/shared/Svg";

const OngoingTasks = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const openDropdown = () => setShowDropdown(prevState => !prevState)

    return (
        <div className={"mt-6"}>
            <div onClick={openDropdown} className={"flex-center-between cursor-pointer"}>
                <p className={"flex-center gap-1 text-secondary-dark font-semibold text-sm"}>🔛 Ongoing tasks <span
                    className={"font-medium text-secondary"}>2</span></p>
                <ChevronDown size={16} className={"text-[#B1B1B1]"}/>
            </div>
            {showDropdown && <div className={"mt-2 flex-column gap-2"}>
                <div className={"flex-center-between p-3 bg-white border border-[#E8E8E8] rounded-xl"}>
                    <p className={"font-medium text-[#363636] flex-1"}>🥱 Get out of bed early</p>

                    <div className={"flex-center gap-4"}>
                        <img className={"w-6 rounded-xl"} src="/assets/images/girl-smile.svg" alt=""/>
                        <p className={"text-sm text-secondary font-medium"}>16pts</p>
                        <span>{VerticalThreeDotIcon}</span>
                    </div>
                </div>
                <div className={"flex-center-between p-3 bg-white border border-[#E8E8E8] rounded-xl"}>
                    <p className={"font-medium text-[#363636] flex-1"}>💆🏻‍♂️ Wash your face</p>

                    <div className={"flex-center gap-4"}>
                        <img className={"w-6 rounded-xl"} src="/assets/images/girl-smile.svg" alt=""/>
                        <p className={"text-sm text-secondary font-medium"}>16pts</p>
                        <span>{VerticalThreeDotIcon}</span>
                    </div>
                </div>
                <div className={"flex-center-between p-3 bg-white border border-[#E8E8E8] rounded-xl"}>
                    <p className={"font-medium text-[#363636] flex-1"}>🪥 Brush your teeth</p>

                    <div className={"flex-center gap-4"}>
                        <img className={"w-6 rounded-xl"} src="/assets/images/girl-smile.svg" alt=""/>
                        <p className={"text-sm text-secondary font-medium"}>16pts</p>
                        <span>{VerticalThreeDotIcon}</span>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default OngoingTasks;