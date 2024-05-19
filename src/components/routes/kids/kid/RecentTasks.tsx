import Link from "next/link";
import Task from "@/components/routes/kids/modal/Task";
import FormModal from "@/components/shared/FormModal";
import {useState} from "react";
import {useRouter} from "next/router";

const RecentTasks = () => {
    const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
    const {query: {id}} = useRouter();

    return (
        <div>
            <div>
                <div className={"flex-center-between"}>
                    <p className={"text-md font-semibold text-primary"}>Recent Tasks</p>
                    <button onClick={() => setShowTaskModal(true)} className={"text-orange font-semibold text-sm underline"}>Add task</button>
                </div>
                <div className={"mt-6 flex-column gap-2"}>
                    {Array.from({length: 5}).map((item, index) => (
                        <div key={index} className={"flex-center-between bg-primary rounded-xl p-3"}>
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
                <Link className={"mt-2 flex justify-center text-orange font-semibold text-sm underline underline-offset-2"} href={`/kids/${id}/tasks`}>View all</Link>
            </div>

            <FormModal isOpen={showTaskModal} style={"lg:w-[450px] max-h-full rounded-t-3xl overflow-y-auto lg:mb-0"}>
                <Task closeModal={() => setShowTaskModal(false)}/>
            </FormModal>
        </div>
    );
};

export default RecentTasks;