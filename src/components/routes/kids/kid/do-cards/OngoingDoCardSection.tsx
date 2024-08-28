import Image from "next/image";
import OngoingDoCard from "@/components/routes/kids/kid/do-cards/OngoingDoCard";
import {useFetchAllKidDoCards} from "@/hooks/useDocards";
import {useCurrentKid} from "@store/kid/kidStore";
import Loader from "@components/routes/kids/kid/do-cards/Loader";

const OngoingDoCardSection = () => {
    const currentKid = useCurrentKid();
    const {data, isPending} = useFetchAllKidDoCards("pending", "goal", currentKid?._id || "", false);
    const isEmpty = data?.data?.length === 0;

    if (isPending) return <Loader />
    
    return (
        <div>
            {isPending && <p>Loading...</p>}
            {isEmpty && !isPending && <div className={"flex-column items-center gap-4 py-12"}>
                <Image src={"/assets/images/savings.svg"} alt={"savings"} width={80} height={80}/>
                <p className={"text-primary font-semibold"}>No do cards yet</p>
            </div>}

            {!isEmpty && !isPending && <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-6"}>
                {data?.data?.map((doCard) => <OngoingDoCard doCard={doCard} key={doCard._id}/>)}
            </div>}
        </div>
    );
};

export default OngoingDoCardSection;