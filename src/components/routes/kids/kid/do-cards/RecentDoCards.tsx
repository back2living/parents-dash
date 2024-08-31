import {useFetchAllKidDoCards} from "@/hooks/useDocards";
import NoData from "@/components/shared/NoData";
import {useCurrentKid} from "@store/kid/kidStore";
import {IDoCard} from "@interfaces/DoCardInterfaces";

const RecentDoCards = () => {
    const currentKid = useCurrentKid();
    const {data, isPending} = useFetchAllKidDoCards("pending", "goal", currentKid?._id || "");
    const isEmpty = data?.data?.length === 0;
    const doCardsWithOngoingPayment = data?.data?.filter((item => item.paid > 0)) as IDoCard[];

    return (
        <div>
            <div>
                <p className={"text-md font-semibold text-primary mt-6 lg:mt-0"}>Recent Do-Cards</p>

                {isPending && <div className={"h-[180px] lg:h-[200px] bg-animate rounded-3xl mt-6"}/>}
                {isEmpty && <NoData image={"/assets/images/no-do-card.png"} text={"No Do-Card Awaiting Approval"}/>}
                {data?.data?.length > 0 && <div className={"grid grid-cols-1 md:grid-cols-2 gap-2 mt-6"}>
                    {doCardsWithOngoingPayment?.slice(0, 2).map((item, index: number) => (
                        <div key={index} className={"bg-primary p-3 rounded-2xl"}>
                            <div className={"w-full h-[150px] rounded-xl"}>
                                <img className={"w-full h-full object-cover rounded-xl"} src={item.avatar}
                                     alt={item.purpose}/>
                            </div>

                            <div className={"mt-3 flex-column gap-2"}>
                                <p className={"text-primary font-medium"}>{item?.purpose?.length > 30 ? `${item.purpose.substring(0, 30)}...` : item?.purpose}</p>
                                <div className={"flex-center gap-6 text-sm font-medium text-primary"}>
                                    <div>
                                        <p>{item.paid}pts</p>
                                        <p className={"text-secondary text-xs font-light"}>Saved</p>
                                    </div>
                                    <div>
                                        <p>{item.points}pts</p>
                                        <p className={"text-secondary text-xs font-light"}>Target</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
        </div>
    );
};

export default RecentDoCards;