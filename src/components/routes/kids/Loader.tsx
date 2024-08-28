import DashboardLayout from "@/layouts/DashboardLayout";

const KidsLoader = () => {
    return (
        <DashboardLayout title={"KIDS"}>
            <div className={"pb-10 overflow-hidden"}>
                <div className={"flex-center-between mt-4 lg:mt-0"}>
                    <p className={"bg-animate h-7 lg:w-[280px] rounded-md"}/>
                    <button className={"w-[150px] lg:w-[200px] bg-animate h-14 rounded-full"}/>
                </div>

                <div className={"mt-6 lg:mt-10"}>
                    <div className={"kids-grid"}>
                        {Array.from({length: 5})?.map((_, index: number) => <div className={"kid-card h-[228px]"} key={index}>
                            <div className={"w-full h-full bg-animate relative rounded-3xl"}/>
                        </div>)}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default KidsLoader;