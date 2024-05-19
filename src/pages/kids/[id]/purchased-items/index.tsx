import DashboardLayout from "@/layouts/DashboardLayout";

const KidPurchasedItemsPage = () => {
    const date = new Date();
    return (
        <DashboardLayout>
            <div className={"flex-center-between font-semibold"}>
                <p className={"text-[#515151] text-lg"}>Store items purchase</p>
                <button className={"text-orange text-sm"}>All</button>
            </div>

            <div className={"mt-10"}>
                <div className={"mt-6 grid grid-cols-2 gap-2 lg:flex lg:flex-wrap lg:gap-6"}>
                    {Array.from({length: 5}).map((item, index) => <div key={index}>
                        <div className={"max-w-[300px] py-10 rounded-3xl flex-center justify-center bg-[#F5F5F5]"}>
                            <img className={"w-3/5"} src="/assets/images/shoe.png" alt=""/>
                        </div>
                        <div className={"mt-4"}>
                            <p className={"text-[#515151] font-bold"}>Sneakers</p>
                            <div className={"lg:flex-center-between mt-2"}>
                                <p className={"text-secondary-dark text-sm font-medium"}>2,000 pts</p>
                                <div className={"mt-2 lg:mt-0 font-medium text-sm flex-center gap-4"}>
                                    <button className={"text-orange"}>Approve</button>
                                    <button className={"text-secondary"}>Decline</button>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default KidPurchasedItemsPage;