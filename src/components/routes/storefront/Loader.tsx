import DashboardLayout from "@/layouts/DashboardLayout";

const StorefrontLoader = () => {
    return (
        <DashboardLayout title={"Storefront"}>
            <div className={"pb-10 overflow-hidden"}>
                <div className={"lg:flex-center-between"}>
                    <p className={"bg-animate h-7 w-56 rounded-md"}/>
                </div>
                {Array.from({length: 2})?.map((_, index: number) => <div key={index}>
                    <div className={"flex-center font-semibold gap-4 mt-10"}>
                        <p className={"bg-animate h-7 w-40 rounded-md"}/>
                        <p className={"bg-animate h-4 w-20 rounded-sm"}/>
                    </div>
                    <div className={"mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}>
                        {Array.from({length: 4})?.map((_, index: number) => <div key={index}>
                            <div className={"relative group"}>
                                <div className={"w-full h-[250px] bg-animate relative rounded-3xl"}/>
                            </div>

                            <div className={"mt-4"}>
                                <p className={"bg-animate h-4 w-24 rounded-sm"}/>
                                <p className={"bg-animate h-2.5 w-14 rounded-sm mt-2"}/>
                            </div>

                        </div>)}
                    </div>
                </div>)}
            </div>
        </DashboardLayout>
    );
};

export default StorefrontLoader;