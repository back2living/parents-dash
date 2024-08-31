import Image from "next/image";
import RequestDoCard from "@/components/routes/kids/kid/do-cards/RequestDoCard";
import {useFetchAllKidDoCards} from "@/hooks/useDocards";
import {useCurrentKid} from "@store/kid/kidStore";
import Loader from "@components/routes/kids/kid/do-cards/Loader";
import {useState} from "react";
import Pagination from "@components/shared/Pagination";

const DoCardRequestSection = () => {
    const currentKid = useCurrentKid();
    const [pageNum, setPageNum] = useState(1);
    const {data, isPending} = useFetchAllKidDoCards("processing", "goal", currentKid?._id || "", false, pageNum);
    const isEmpty = data?.data?.length === 0;

    if (isPending) return <Loader />

    return (
        <div>
            {isEmpty && <div className={"flex-column items-center gap-4 py-12"}>
                <Image src={"/assets/images/savings.svg"} alt={"savings"} width={80} height={80}/>
                <p className={"text-primary font-semibold"}>No processing do cards yet.</p>
            </div>}

            {!isEmpty && <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-6"}>
                {data?.data?.map((doCard, index: number) => <RequestDoCard doCard={doCard} key={index}/>)}
            </div>}

            <Pagination setPageNum={setPageNum} pageNum={pageNum} totalPages={data?.meta?.pages} />
        </div>
    );
};

export default DoCardRequestSection;