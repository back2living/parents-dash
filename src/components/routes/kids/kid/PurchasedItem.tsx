import {useApproveOrRejectKidPurchase} from "@/hooks/useStorefront";
import {IPurchasedStorefrontItem} from "@/interfaces/StorefrontInterface";

const ApprovedIcon = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8" fill="#09C2B2" stroke="#09C2B2" stroke-width="2"/>
    <path d="M6 9.77778L8.22222 12L11.5556 7" stroke="white" stroke-width="1.5" stroke-linecap="round"
          stroke-linejoin="round"/>
</svg>

type PurchasedItemComponentType =  {
    kidId: string;
    status?: string;
    item: IPurchasedStorefrontItem
}

const PurchasedItem = ({item, kidId, status}: PurchasedItemComponentType) => {
    const {isPending, mutate} = useApproveOrRejectKidPurchase();
    const handleApproveOrRejectPurchase = (storeItem: IPurchasedStorefrontItem, approved: boolean) => {
        mutate({
            id: storeItem?._id,
            approved,
            kidId,
            status
        });
    }
    return (
        <div className={"bg-primary p-3 rounded-2xl"}>
            <div className={"w-full h-[150px] rounded-xl"}>
                <img className={"w-full h-full object-cover rounded-xl"} src={item?.itemInfo?.avatar}
                     alt={item?.itemInfo?.name}/>
            </div>

            <div className={"mt-3 flex-column gap-2"}>
                <div className={"font-medium flex-center-between"}>
                    <p className={"text-primary capitalize"}>{item?.itemInfo?.name}</p>
                </div>


                <div className={"text-sm font-medium flex-center-between"}>
                    <p className={"text-secondary-dark"}>{item?.itemInfo?.points}</p>

                    {item?.status === "pending" && <div className={"flex-center gap-4"}>
                        {!isPending && <button onClick={() => handleApproveOrRejectPurchase(item, true)}
                                               className={"text-green"}>Approve</button>}
                        {isPending && <button disabled={true}
                                              className={"text-green animate-pulse opacity-50 disabled:cursor-not-allowed"}>Approve</button>}
                        {!isPending && <button onClick={() => handleApproveOrRejectPurchase(item, false)}
                                               className={"text-orange"}>Decline</button>}
                        {isPending && <button disabled={true}
                                              className={"text-orange animate-pulse opacity-50 disabled:cursor-not-allowed"}>Decline</button>}
                    </div>}
                    {item?.status === "approved" && <p className={"text-green font-medium text-sm flex-center gap-2"}>{ApprovedIcon} Approved</p>}
                </div>
            </div>
        </div>
    );
};
export default PurchasedItem;