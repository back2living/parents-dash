const NoKids = () => {
    return (
        <div className={"h-full center"}>
            <div className={"flex-column items-center gap-10 w-[30%] max-w-[400px]"}>
                <div className={"w-[41%] max-w-[150px]"}>
                    <img className={"max-w-full"} src="/assets/images/no-kid.png" alt=""/>
                </div>
                <div className={"text-center"}>
                    <p className={"text-primary text-lg font-semibold tracking-[0.48px]"}>You are yet to add a kid</p>
                    <p className={"text-secondary mt-4"}>Create profiles for your kids and start enjoying playground 😎</p>
                </div>
                <button className={"primary-btn"}>Add kids</button>
            </div>
        </div>
    );
};

export default NoKids;