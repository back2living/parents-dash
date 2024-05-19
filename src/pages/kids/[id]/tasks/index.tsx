import DashboardLayout from "@/layouts/DashboardLayout";

const KidTasksPage = () => {
    const date = new Date();
    console.log(date);
    return (
        <DashboardLayout>
            <div className={"flex-center-between"}>
                <p className={"text-[#515151] text-md lg:text-lg font-semibold"}>Monday, 01 Apr</p>
                <button className={"primary-btn max-w-[160px]"}>+ New task</button>
            </div>

            <div className={"mt-10 max-w-[500px] mx-auto"}>
                <div className={"flex-center-between font-semibold"}>
                    <p className={"text-primary text-md"}>Today’s Tasks 5</p>
                    <p className={"text-orange text-sm"}>All tasks</p>
                </div>

                <div className={"mt-6 flex-column gap-2"}>
                    {Array.from({length: 10}).map((item, index) => (
                        <div key={index} className={"flex-center-between  bg-primary rounded-xl p-3"}>
                            <div className={"flex-center gap-6"}>
                                <div className={"flex-center gap-2"}>
                                    <p>🙇🏻</p>
                                    <p className={"text-primary text-sm font-medium"}>Say Sir/Ma</p>
                                </div>
                            </div>
                            <div className={"flex-center gap-4"}>
                                <button className={"text-orange font-semibold"}>Approve</button>
                                <button className={"text-secondary font-semibold"}>Decline</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default KidTasksPage;