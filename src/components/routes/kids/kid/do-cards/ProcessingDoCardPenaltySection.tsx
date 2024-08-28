import Image from "next/image";
import PenaltyCard from "@/components/routes/kids/kid/do-cards/PenaltyCard";
import {useFetchAllKidDoCards} from "@/hooks/useDocards";
import {useCurrentKid} from "@store/kid/kidStore";
import Loader from "@components/routes/kids/kid/do-cards/Loader";

const ProcessingDoCardPenaltySection = () => {
    const currentKid = useCurrentKid();
    const {data, isPending} = useFetchAllKidDoCards("processing", "penalty", currentKid?._id || "", false);
    const isEmpty = data?.data?.length === 0;

    if (isPending) return <Loader />

    return (
        <div>
            {isEmpty && <div className={"flex-column items-center gap-4 py-12"}>
                <Image src={"/assets/images/NoPenalty.svg"} alt={"savings"} width={80} height={80}/>
                <p className={"text-primary font-semibold"}>{currentKid?.firstName} has no processing Do Card.</p>
            </div>}

            {!isEmpty && <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-6"}>
                {data?.data?.map((doCard, index) => <PenaltyCard doCard={doCard} key={index} />)}
            </div>}
        </div>
    );
};

export default ProcessingDoCardPenaltySection;