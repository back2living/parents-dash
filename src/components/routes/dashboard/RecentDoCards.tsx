import {useFetchAllDoCards} from "@/hooks/useDocards";
import NoData from "@/components/shared/NoData";

const RecentDoCards = () => {
    const {data, isPending} = useFetchAllDoCards("pending", "goal");
    const isEmpty = data?.data?.length === 0;

    return (
        <div className={"w-full lg:flex-1 lg:max-w-[700px] mt-6 lg:mt-14"}>
            <div>
                <p className={"text-md font-semibold text-primary"}>Recent Do-Cards</p>
                {isPending && <div className={"w-full mt-6 h-[180px] bg-animate relative rounded-3xl"}/>}
                {isEmpty && <NoData image={"/assets/images/no-do-card.png"} text={"No Do-Card Awaiting Approval"}/>}
                {!isEmpty && <div className={"grid grid-cols-1 md:grid-cols-2 gap-2 mt-6"}>
                    {data?.data?.slice(0, 2)?.map((doCard) => (
                        <div key={doCard?._id} className={"bg-primary p-3 rounded-2xl"}>
                            <div className={"w-full h-[150px] rounded-xl"}>
                                <img className={"w-full h-full object-cover rounded-xl"} src={doCard?.avatar} alt=""/>
                            </div>
                            <div className={"mt-3 flex-column gap-2"}>
                                <p className={"text-primary h-[40px]"}>{doCard?.purpose?.length > 30 ? `${doCard.purpose.substring(0, 40)}...` : doCard?.purpose}</p>

                                <div className={"flex-center gap-6 text-sm font-medium text-primary"}>
                                    <div>
                                        <p>{doCard?.paid}pts</p>
                                        <p className={"text-secondary text-xs font-light"}>Saved</p>
                                    </div>
                                    <div>
                                        <p>{doCard?.points}pts</p>
                                        <p className={"text-secondary text-xs font-light"}>Target</p>
                                    </div>
                                </div>

                                <div className={"flex-center gap-1.5 mt-1"}>
                                    <img src={doCard?.kid?.avatar} className={"w-4 xl:w-6 rounded-full object-cover"}
                                         alt=""/>
                                    <p className={"text-secondary-dark xl:text-sm text-xs font-medium"}>{doCard?.kid?.firstName} {doCard?.kid?.lastName}</p>
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