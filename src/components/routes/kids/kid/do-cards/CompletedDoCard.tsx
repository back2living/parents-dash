const CompletedDoCard = ({doCard}: {doCard: any}) => {
    return (
        <div className={"bg-primary p-3 rounded-2xl"}>
            <div className={"w-full h-[150px] rounded-xl"}>
                <img
                    className={"w-full h-full object-cover rounded-xl"}
                    src={doCard?.avatar}
                    alt={doCard?.purpose}
                />
            </div>

            <div className={"mt-3 flex-column gap-2"}>
                <div className={"font-medium flex-center-between"}>
                    <p className={"text-primary"}>{doCard?.purpose}</p>
                </div>

                <div className={"flex-center gap-6 text-sm font-medium text-primary"}>
                    <div>
                        <p>{doCard?.points}pts</p>
                        <p className={"text-secondary text-xs font-light"}>Saved</p>
                    </div>
                    <div>
                        <p>Completed</p>
                        <p className={"text-secondary text-xs font-light"}>Target</p>
                    </div>
                </div>


                <div className={"flex-center gap-2 my-2"}>
                    <div className={"bg-[#ECECEC] h-4 flex-1 rounded-xl"}>
                     <p className={"bg-green h-full w-full rounded-xl"}/>
                    </div>
                   <p className={"text-sm text-green font-medium"}>100%</p>
                </div>
            </div>
        </div>
    );
};

export default CompletedDoCard;