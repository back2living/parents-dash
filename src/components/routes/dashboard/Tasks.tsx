import Link from "next/link";

const Tasks = () => {
    return (
        <div className={"w-full lg:w-[41.5%] max-w-[600px] mt-14"}>
            <div className={"flex-center-between"}>
                <p className={"text-md lg:text-lg font-semibold text-[#515151]"}>Tasks</p>
                <p className={"text-orange font-semibold text-sm"}>Pending</p>
            </div>

            <div className={"mt-6 flex-column gap-2"}>
                {Array.from({length: 5}).map((item, index) => (
                    <div key={index} className={"flex-center-between bg-primary rounded-xl p-3"}>
                        <div className={"flex-center gap-4 lg:gap-6"}>
                            <div className="flex-center gap-2">
                                <div className={"w-10 h-10"}>
                                    <img className={"w-full h-full rounded-3xl object-cover"} src="/assets/images/boy-smile.webp" alt=""/>
                                </div>
                                <p className={"text-primary font-semibold hidden lg:block"}>Layla</p>
                            </div>

                            <div className={"flex-center gap-2"}>
                                <p>🪥️</p>
                                <p className={"text-primary text-sm font-medium"}>Brush your teeth</p>
                            </div>
                        </div>
                        <div className={"flex-center text-sm lg:text-base gap-2 lg:gap-4"}>
                            <button className={"text-orange font-semibold"}>Approve</button>
                            <button className={"text-secondary font-semibold"}>Decline</button>
                        </div>
                    </div>
                ))}
            </div>

            <Link className={"mt-2 flex justify-center text-orange font-semibold text-sm"} href={"/task"}>View all</Link>
        </div>
    );
};

export default Tasks;