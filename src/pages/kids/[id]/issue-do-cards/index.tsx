import DashboardLayout from "@/layouts/DashboardLayout";
import Image from "next/image";
import {SelectedDoCardIcon} from "@/components/shared/Svg";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/router";
import {useCurrentKid} from "@/store/kid/kidStore";

const KidIssueDoCardPage = () => {
    const router = useRouter();
    const [isGoalsSelected, setIsGoalsSelected] = useState<boolean>(true);
    const currentKid = useCurrentKid();

    const handleGoToNextPage = async () => {
        if (isGoalsSelected) {
            await router.push(`/kids/${currentKid?._id}/do-cards-goals`);
        } else {
            await router.push(`/kids/${currentKid?._id}/do-cards-penalties`);
        }
    }
    const handleGoToPreviousPage = () => router.back();

    return (
        <DashboardLayout title={"Issue Do-Card"}>
            <div className={"h-full lg:center"}>
                <div className={"lg:max-w-[500px] h-full lg:h-fit flex-column justify-between lg:justify-start gap-12"}>
                    <p className={"text-primary text-lg font-medium text-center"}>What type of Do-card do you <br/> want
                        to issue?</p>

                    <div className={"flex flex-column lg:flex-row gap-6"}>
                        <div onClick={() => setIsGoalsSelected(true)} className={cn(
                            "p-4 rounded-2xl border bg-primary border-secondary border-dashed relative custom-transition flex-1 cursor-pointer",
                            isGoalsSelected && "bg-[#FCE4DA] border-orange border-solid"
                        )}>
                                <span className={cn(
                                    "absolute top-2 right-2 opacity-0",
                                    isGoalsSelected && "opacity-100"
                                )}>{SelectedDoCardIcon}</span>
                            <Image className={"w-10 h-10"} width={40} height={40} src={isGoalsSelected ? "/assets/images/active-goals.png" : "/assets/images/inactive-goal.png"} alt=""/>

                            <div className={"mt-4"}>
                                <p className={"text-[#515151] font-medium"}>Goal</p>
                                <p className={"text-secondary"}>Set goals for your kids to save points towards.</p>
                            </div>

                        </div>

                        <div onClick={() => setIsGoalsSelected(false)} className={cn(
                            "p-4 rounded-2xl border bg-primary border-secondary border-dashed relative custom-transition flex-1 cursor-pointer",
                            !isGoalsSelected && "bg-[#FCE4DA] border-orange border-solid"
                        )}>
                                <span className={cn(
                                    "absolute top-2 right-2 opacity-0",
                                    !isGoalsSelected && "opacity-100"
                                )}>{SelectedDoCardIcon}</span>
                            <Image width={40} height={40}
                                   src={!isGoalsSelected ? "/assets/images/active-penalty.png" : "/assets/images/inactive-penalty.png"}
                                   alt=""/>

                            <div className={"mt-4"}>
                                <p className={"text-[#515151] font-medium"}>Penalty</p>
                                <p className={"text-secondary"}>Issue do-card penalty when your kid does something they shouldn’t.</p>
                            </div>

                        </div>
                    </div>

                    <div className={"flex gap-6"}>
                        <button onClick={handleGoToPreviousPage} className={"white-btn"}>Cancel</button>
                        <button onClick={handleGoToNextPage} className={"primary-btn"}>Continue</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default KidIssueDoCardPage;