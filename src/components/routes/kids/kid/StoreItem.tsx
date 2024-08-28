import Link from "next/link";
import PurchasedItem from "@/components/routes/kids/kid/PurchasedItem";
import {useFetchStorefrontPurchases} from "@/hooks/useStorefront";
import NoData from "@/components/shared/NoData";
import {useCurrentKid} from "@store/kid/kidStore";

const StoreItem = () => {
    const currentKid = useCurrentKid();
    const {isPending, data} = useFetchStorefrontPurchases(currentKid?._id || "", "pending");
    const isEmpty = data?.data?.length === 0;

    return (
        <div>
            <div className={"flex-center-between"}>
                <p className={"text-md text-primary font-semibold mt-6 lg:mt-0"}>Store items purchase</p>
                <Link className={"flex justify-center text-orange font-semibold text-sm underline-offset-2"} href={`/kids/${currentKid?._id}/purchased-items`}>View all</Link>
            </div>
            {isPending && <div className={"h-[180px] lg:h-[200px] bg-animate rounded-3xl mt-6"}/>}
            {isEmpty && <NoData image={"/assets/images/no-store-item.png"} text={"No Purchase Awaiting Approval"}/>}

            {!isEmpty && <div className={"grid grid-cols-1 md:grid-cols-2 gap-2 mt-6"}>
                {data?.data?.slice(0, 2).map((item) => <PurchasedItem status={"pending"} kidId={currentKid?._id || ""} item={item} key={item?._id}/>)}
            </div>}
            {!isEmpty && <Link className={"mt-6 flex justify-center text-orange font-semibold text-sm underline underline-offset-2"} href={`/kids/${currentKid?._id}/purchased-items`}>View all</Link>}
        </div>
    );
};

export default StoreItem;