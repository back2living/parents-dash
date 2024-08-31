import DashboardLayout from "@/layouts/DashboardLayout";
import PurchasedItem from "@/components/routes/kids/kid/PurchasedItem";
import {useCurrentKid} from "@/store/kid/kidStore";
import {useFetchStorefrontPurchases} from "@/hooks/useStorefront";
import {useState} from "react";
import FilterDropdown from "@/components/shared/FilterDropdown";
import NoData from "@/components/shared/NoData";
import Pagination from "@components/shared/Pagination";

const filterArray = ["pending", "approved"];

const KidPurchasedItemsPage = () => {
    const currentKid = useCurrentKid();

    const [isFocus, setIsFocus] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(filterArray[0]);
    const [pageNum, setPageNum] = useState(1);

    const {isPending, data} = useFetchStorefrontPurchases(currentKid?._id || "", selectedFilter, pageNum);
    const isEmpty = data?.data?.length === 0;

    return (
        <DashboardLayout title={currentKid?.firstName} showBack>
            <div className={"flex-center-between font-semibold"}>
                <p className={"text-[#515151] lg:text-lg"}>Store items purchase</p>
                <FilterDropdown filterOptionArray={filterArray} setSelected={setSelectedFilter} selected={selectedFilter} setIsFocus={setIsFocus} isFocus={isFocus}/>
            </div>

            <div className={"mt-10"}>
                {isPending && <div className={"mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"}>
                    {Array?.from({length: 4}).map((_, index) => <div key={index} className={"h-[160px] lg:h-[200px] bg-animate rounded-2xl"}/>)}
                </div>}
                {isEmpty && <NoData image={"/assets/images/no-store-item.png"} text={`No ${selectedFilter} purchases.`}/>}
                {!isEmpty && <div className={"mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"}>
                    {data?.data?.map((item) => <PurchasedItem kidId={currentKid?._id || ""} status={selectedFilter} item={item} key={item?._id}/>)}
                </div>}

                <Pagination setPageNum={setPageNum} pageNum={pageNum} totalPages={data?.meta?.pages} />
            </div>
        </DashboardLayout>
    );
};
export default KidPurchasedItemsPage;