import DashboardLayout from "@/layouts/DashboardLayout";
import {cn} from "@/lib/utils";
import {Circle, SelectedCircle} from "@/components/shared/Svg";
import {useState} from "react";
import {useRouter} from "next/router";
import {useAddDoCard} from "@/hooks/useDocards";
import {useCurrentKid, useSetKidActiveTab} from "@/store/kid/kidStore";
import Button from "@/components/shared/Button";
import {useKidProfileRoute} from "@/hooks/useKidProfile";

const KidIssueDoCardPenalties= () => {
    const setKidActiveTab = useSetKidActiveTab();
    const currentKid = useCurrentKid();

    const router = useRouter();
    const [isMandatory, setIsMandatory] = useState<boolean>(true);
    const [purpose, setPurpose] = useState("");
    const [points, setPoints] = useState("");

    const handleRouteToKidProfile = useKidProfileRoute(currentKid?._id || "", setKidActiveTab);

    const handleGoToPreviousPage = () => router.back();
    const {mutate, isPending} = useAddDoCard(handleRouteToKidProfile);

    const handleSubmitDoCard = () => {
        if (currentKid) {
            mutate({
                isMandatory,
                type: "penalty",
                kidId: currentKid?._id,
                points: +points,
                purpose
            })
        }
    }
    const isValid = !!(purpose && points);

    return (
        <DashboardLayout title={"New Do-Card Penalty"}>
            <div className={"max-w-[500px] flex-column gap-6"}>
                <div>
                    <label className="auth-label">Purpose</label>
                    <input value={purpose} onChange={e => setPurpose(e.target.value)} className={"auth-input"} type="text" placeholder={"e.g Drake didn't read."}/>
                </div>
                <div>
                    <label className="auth-label">Points</label>
                    <input value={points} onChange={e => setPoints(e.target.value)} className={"auth-input"} type="number" placeholder={"e.g 5,000"}/>
                </div>
                <div className={"w-full lg:flex-1"}>
                    <label className={"auth-label text-[#515151]"} htmlFor="">Type</label>
                    <div className={"flex-center gap-4"}>
                        <button onClick={() => setIsMandatory(true)} className={cn(
                            "bg-primary flex-center justify-center h-12 px-4 rounded-xl min-w-[140px] border-2 border-[#ECECEC] transition-all",
                            isMandatory && "bg-[#FCE4DA] border-[#F07846]"
                        )}>
                            <span
                                className={`flex-center gap-2 ${isMandatory ? "text-[#363636]" : "text-secondary-dark"}`}>
                                {isMandatory ? SelectedCircle : Circle} Mandatory
                            </span>
                        </button>
                        <button onClick={() => setIsMandatory(false)} className={cn(
                            "bg-primary flex-center justify-center h-12 px-4 rounded-xl min-w-[140px] border-2 border-[#ECECEC] transition-all",
                            !isMandatory && "bg-[#FCE4DA] border-[#F07846]"
                        )}>
                             <span
                                 className={`flex-center gap-2 ${!isMandatory ? "text-[#363636]" : "text-secondary-dark"}`}>
                                {!isMandatory ? SelectedCircle : Circle} Optional
                            </span>
                        </button>
                    </div>
                </div>
                <div className={"flex gap-4 lg:gap-6 mt-10"}>
                    <button onClick={handleGoToPreviousPage} className={"white-btn"}>Cancel</button>
                    <Button className={"h-10 lg:h-16"} handleClick={handleSubmitDoCard} type={"button"} isValid={isValid} isLoading={isPending} name={"Proceed"} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default KidIssueDoCardPenalties;