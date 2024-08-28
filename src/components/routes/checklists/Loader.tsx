import DashboardLayout from "@/layouts/DashboardLayout";
import {DeleteChecklistIcon, EditChecklistIcon} from "@/components/shared/Svg";

const ChecklistLoader = () => {
    return (
        <DashboardLayout title={"Checklist"}>
            <div>
                <div className={"flex gap-4 lg:gap-6 mt-7"}>
                    <button className={"bg-animate w-[200px] h-11 rounded-full"}/>
                    <button className={"bg-animate w-[200px] h-11 rounded-full"}/>
                </div>

                <div className={"mt-10 rounded-2xl bg-animate hidden md:block lg:min-h-[400px] xl:min-h-[600px]"}/>

                <div className={"md:hidden mt-8 flex-column gap-2"}>
                    {Array.from({length: 5}).map((_, index) => <div key={index} className={"p-2 bg-primary border border-[#E8E8E8] rounded-xl"}>
                        <div className={"flex-center-between"}>
                            <p className={"w-20 h-4 rounded-md bg-animate "}/>

                            <div className={"flex-center gap-4"}>
                                <button className={"text-sm text-orange font-medium"}>{DeleteChecklistIcon}</button>
                                <button className={"text-sm text-secondary font-medium"}>{EditChecklistIcon}</button>
                            </div>
                        </div>
                        <div className={"flex-center-between mt-3"}>
                            <p className={"bg-animate h-3 w-8 rounded-sm"}/>
                            <p className={"bg-animate h-3 w-8 rounded-sm"}/>
                        </div>
                    </div>)}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ChecklistLoader;