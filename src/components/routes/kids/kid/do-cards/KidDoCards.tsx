import {AddDoCardIcon} from "@/components/shared/Svg";
import {useState} from "react";
import DoCardGoals from "@/components/routes/kids/kid/do-cards/DoCardGoals";
import DoCardsPenalties from "@/components/routes/kids/kid/do-cards/DoCardsPenalties";
import Link from "next/link";
import {IKid} from "@/hooks/useKids";
import {useCurrentKid, useSetCurrentKid} from "@/store/kid/kidStore";

const styles = {
    active: "px-6 py-2 rounded-full text-primary bg-primary",
    inactive: "text-secondary px-6 py-2",
}

const KidDoCards = ({kidData}: {kidData: IKid}) => {
    const currentKid = useCurrentKid();
    const [isGoalsActive, setIsGoalsActive] = useState<boolean>(true);
    const setCurrentKid = useSetCurrentKid();

    return (
        <div>
            <div className={"flex-between"}>
                <p className={"text-md font-semibold text-[#515151]"}>{currentKid?.firstName}’s Do-Cards</p>
                <Link onClick={() => setCurrentKid(kidData)} href={`/kids/${currentKid?._id}/issue-do-cards`} className={"text-orange underline flex-center gap-2"}>Issue Do-Card {AddDoCardIcon}</Link>
            </div>

            <div className={"mt-4 font-medium mb-6"}>
                <button onClick={() => setIsGoalsActive(true)} className={isGoalsActive ? styles.active : styles.inactive}>Goals</button>
                <button onClick={() => setIsGoalsActive(false)} className={!isGoalsActive ? styles.active : styles.inactive}>Penalties</button>
            </div>

            <div>
                {isGoalsActive && <DoCardGoals />}
                {!isGoalsActive && <DoCardsPenalties/>}
            </div>

        </div>
    );
};

export default KidDoCards;