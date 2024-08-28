import Image from "next/image";
import CompletedDoCard from "@/components/routes/kids/kid/do-cards/CompletedDoCard";
import {useFetchAllKidDoCards} from "@/hooks/useDocards";
import {useCurrentKid} from "@store/kid/kidStore";
import Loader from "@components/routes/kids/kid/do-cards/Loader";

const CompletedDoCardSection = () => {
    const currentKid = useCurrentKid();
    const {data, isPending} = useFetchAllKidDoCards("approved", "goal", currentKid?._id || "");
    const isEmpty = data?.data?.length === 0;

    if (isPending) return <Loader />

    return (
        <div>

            {isEmpty && <div className={"flex-column items-center gap-4 py-12"}>
                <Image src={"/assets/images/savings.svg"} alt={"savings"} width={80} height={80}/>
                <p className={"text-primary font-semibold"}>No do cards completed yet</p>
            </div>}

            {!isEmpty && <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-6"}>
                {data?.data?.map((doCard, index: number) => <CompletedDoCard doCard={doCard} key={index}/>)}
            </div>}
        </div>
    );
};

export default CompletedDoCardSection;