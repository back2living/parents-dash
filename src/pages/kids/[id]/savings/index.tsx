import DashboardLayout from "@/layouts/DashboardLayout";

const KidSavingsPage = () => {
    const date = new Date();
    return (
        <DashboardLayout>
            <div className={"flex-center-between"}>
                <p className={"text-[#515151] text-md lg:text-lg font-semibold"}>Savings goals</p>
                <button className={"primary-btn max-w-[200px]"}>New savings goals</button>
            </div>

            <div className={"mt-10 max-w-[500px] mx-auto"}>
                <div className={"mt-6 flex-column gap-2"}>
                    {Array.from({length: 5}).map((item, index) => (
                        <div key={index} className={"flex-between items-start gap-6 bg-primary rounded-xl p-3"}>
                            <div className={"flex flex-1 gap-6"}>
                                <div className="w-[200px] rounded-xl gap-2 bg-white">
                                    <img className={"w-full rounded-xl"} src="/assets/images/bike.webp" alt=""/>
                                </div>
                                <div className={"w-full"}>
                                    <p className={"font-medium text-primary"}>Buy a Bicycle</p>
                                    <div className={"flex-center gap-6"}>
                                        <div>
                                            <p className={"text-primary text-sm font-medium"}>0pts</p>
                                            <p className={"text-secondary text-xs font-light"}>Saved</p>
                                        </div>
                                        <div>
                                            <p className={"text-primary text-sm font-medium"}>400pts</p>
                                            <p className={"text-secondary text-xs font-light"}>Target</p>
                                        </div>
                                    </div>
                                    <div className={"flex-center gap-2 my-2"}>
                                        <div className={"bg-[#ECECEC] h-4 flex-1 rounded-xl"}>
                                            <p className={"bg-[#F07846] h-full w-3/5 rounded-xl"}/>
                                        </div>
                                        <p className={"text-sm text-orange font-medium"}>30%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default KidSavingsPage;