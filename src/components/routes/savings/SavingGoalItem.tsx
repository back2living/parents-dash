type GoalProps = {
    goal: {
        itemImg: string;
        name: string;
        points: number | string;
        target: number | string;
        profileImage?: string;
    },
    isCompleted?: boolean;
}

const SavingGoalItem = ({goal, isCompleted}: GoalProps) => {
    const width = (+goal?.points / +goal.target) * 100;

    return (
        <div className={"flex-between items-start gap-6 bg-primary rounded-xl p-3"}>
            <div className={"flex items-center flex-1 gap-6"}>
                <div className="w-36 h-20 lg:w-[200px] lg:h-[120px] rounded-xl gap-2 bg-white">
                    <img className={"w-full h-full rounded-xl object-cover"} src={goal.itemImg} alt=""/>
                </div>
                <div className={"w-full"}>
                    <div className={"flex  justify-between"}>
                        <p className={"font-medium text-primary"}>{goal.name}</p>
                        <img className={"w-8 h-8 rounded-full object-cover"} src={goal.profileImage} alt={"profile-img"}/>
                    </div>
                    <div className={"flex-center gap-6 my-2"}>
                    <div>
                            <p className={"text-primary text-sm font-medium"}>{goal.points}pts</p>
                            <p className={"text-secondary text-xs font-light"}>Saved</p>
                        </div>
                        <div>
                            {!isCompleted && <p className={"text-primary text-sm font-medium"}>{goal.target}pts</p>}
                            {isCompleted && <p className={"text-primary text-sm font-medium"}>Completed</p>}
                            <p className={"text-secondary text-xs font-light"}>Target</p>
                        </div>
                    </div>
                    <div className={"flex-center gap-2 my-2"}>
                        <div className={"bg-[#ECECEC] h-4 flex-1 rounded-xl"}>
                            {isCompleted && <p className={"bg-[#F07846] h-full w-full rounded-xl"}/>}
                            {!isCompleted && <p style={{width: `${width}%`}} className={"bg-[#F07846] h-full rounded-xl"}/>}
                        </div>
                        {isCompleted && <p className={"text-sm text-orange font-medium"}>100%</p>}
                        {!isCompleted && <p className={"text-sm text-orange font-medium"}>{width}%</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavingGoalItem;