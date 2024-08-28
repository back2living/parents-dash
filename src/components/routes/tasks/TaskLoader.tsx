const TaskLoader = () => {
    return (
        <div>
            <div className={"mt-10 rounded-2xl bg-animate hidden md:block lg:min-h-[400px] xl:min-h-[600px]"}/>

            <div className={"md:hidden mt-8 flex-column gap-2"}>
                {Array.from({length: 5}).map((_, index) => <div key={index} className={"flex-center-between h-11 p-2 bg-primary border border-[#E8E8E8] rounded-xl"}>
                    <div className={"flex-center-between"}>
                        <p className={"w-36 h-4 rounded-md bg-animate "}/>
                    </div>

                    <div className={"flex-center gap-2"}>
                        <p className={"bg-animate h-3 w-8 rounded-sm"}/>
                        <p className={"bg-animate h-3 w-8 rounded-sm"}/>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default TaskLoader;