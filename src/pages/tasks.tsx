import DashboardLayout from "@/layouts/DashboardLayout";
import Card from "@/components/shared/Card";
import { Plus } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import {VerticalThreeDotIcon} from "@/components/shared/Svg";
import {useState} from "react";
import Task from "@/components/routes/tasks/modal/AddTask";
import FormModal from "@/components/shared/FormModal";

const Tasks = () => {
    const [showTaskModal, setShowTaskModal] = useState<boolean>(false);

    return (
        <DashboardLayout title={"Tasks"}>
            <div>
                <div className={"flex-center-between"}>
                    <p className={"text-[#515151] text-lg font-semibold"}>Monday, 01 Apr</p>
                    <button onClick={() => setShowTaskModal(true)} className={"primary-btn max-w-[160px]"}>+ New task</button>
                </div>

                <div className={"flex-center flex-wrap gap-4 mt-6"}>
                    <Card
                        textColor={"#AF70EE"}
                        text={"Ongoing tasks"}
                        count={1}
                        img={"task-one-bg.png"}
                    />
                    <Card
                        textColor={"#868686"}
                        text={"Tasks waiting for approval"}
                        count={1}
                        img={"task-two-bg.png"}
                    />
                    <Card
                        textColor={"#068177"}
                        text={"Tasks completed"}
                        count={1}
                        img={"task-three-bg.png"}
                    />
                    <Card
                        textColor={"#D39B26"}
                        text={"Incomplete tasks"}
                        count={1}
                        img={"task-four-bg.png"}
                    />

                </div>

                <div className={"mt-10 flex items-start gap-6 rounded-2xl bg-primary p-1.5"}>
                    <div className="p-2 w-[26.3%] bg-white rounded-xl max-w-[310px] xl:min-h-[580px]">
                        <h3 className={"p-4 text-secondary-dark font-semibold"}>Categories</h3>
                        <div className={"flex-column gap-2"}>
                            <div
                                className={"font-medium flex-center-between p-3 bg-primary rounded-xl border border-[#E8E8E8]"}>
                                <div className={"text-[#363636]"}>🌞 Morning tasks</div>
                                <p className={"text-sm text-secondary"}>7</p>
                            </div>
                            <div
                                className={"font-medium flex-center-between p-3 rounded-xl"}>
                                <div className={"text-[#363636]"}>📘 School work</div>
                                <p className={"text-sm text-secondary"}>2</p>
                            </div>
                            <div
                                className={"font-medium flex-center-between p-3 rounded-xl"}>
                                <div className={"text-[#363636]"}>🏡 House work</div>
                                <p className={"text-sm text-secondary"}>1</p>
                            </div>
                            <div
                                className={"font-medium flex-center-between p-3 rounded-xl"}>
                                <div className={"text-[#363636]"}>🧎🏻‍♂️ Ethics & Values</div>
                                <p className={"text-sm text-secondary"}>5</p>
                            </div>
                            <button className={"ml-3 text-[#B1B1B1] flex-center gap-2 text-sm"}><Plus size={20} className={"text-[#B1B1B1]"} /> New Category </button>
                        </div>
                    </div>
                    <div className="flex-1 pr-6">
                        <div className={"py-4 flex-center-between"}>
                            <p className={"flex-center gap-1 text-[#515151] font-semibold"}>🌞 Morning tasks <span
                                className={"text-sm font-medium text-secondary"}>7</span></p>
                            <button className={"text-sm font-semibold text-[#B1B1B1] flex-center gap-1"}>New task <Plus
                                size={20} className={"text-[#B1B1B1]"}/></button>
                        </div>

                        <div className={"mt-6"}>
                            <div className={"flex-center-between"}>
                                <p className={"flex-center gap-1 text-secondary-dark font-semibold text-sm"}>⏳ Awaiting
                                    approval <span className={"font-medium text-secondary"}>3</span></p>
                                <ChevronDown size={16} className={"text-[#B1B1B1]"}/>
                            </div>
                            <div className={"mt-2 flex-column gap-2"}>
                                <div className={"flex-center-between p-3 bg-white border border-[#E8E8E8] rounded-xl"}>
                                    <p className={"font-medium text-[#363636] flex-1"}>🥱 Get out of bed early</p>

                                    <div className={"flex-center gap-4"}>
                                        <button className={"text-sm text-orange font-medium"}>Approve</button>
                                        <button className={"text-sm text-secondary font-medium"}>Decline</button>
                                        <img className={"w-6 rounded-xl"} src="/assets/images/girl-smile.svg" alt=""/>
                                    </div>
                                </div>
                                <div className={"flex-center-between p-3 bg-white border border-[#E8E8E8] rounded-xl"}>
                                    <p className={"font-medium text-[#363636] flex-1"}>💆🏻‍♂️ Wash your face</p>

                                    <div className={"flex-center gap-4"}>
                                        <button className={"text-sm text-orange font-medium"}>Approve</button>
                                        <button className={"text-sm text-secondary font-medium"}>Decline</button>
                                        <img className={"w-6 rounded-xl"} src="/assets/images/girl-smile.svg" alt=""/>
                                    </div>
                                </div>
                                <div className={"flex-center-between p-3 bg-white border border-[#E8E8E8] rounded-xl"}>
                                    <p className={"font-medium text-[#363636] flex-1"}>🪥 Brush your teeth</p>


                                    <div className={"flex-center gap-4"}>
                                        <button className={"text-sm text-orange font-medium"}>Approve</button>
                                        <button className={"text-sm text-secondary font-medium"}>Decline</button>
                                        <img className={"w-6 rounded-xl"} src="/assets/images/girl-smile.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"mt-6"}>
                            <div className={"flex-center-between"}>
                                <p className={"flex-center gap-1 text-secondary-dark font-semibold text-sm"}>🔛 Ongoing tasks <span className={"font-medium text-secondary"}>2</span></p>
                                <ChevronDown size={16} className={"text-[#B1B1B1]"}/>
                            </div>
                            <div className={"mt-2 flex-column gap-2"}>
                                <div className={"flex-center-between p-3 bg-white border border-[#E8E8E8] rounded-xl"}>
                                    <p className={"font-medium text-[#363636] flex-1"}>🥱 Get out of bed early</p>

                                    <div className={"flex-center gap-4"}>
                                        <img className={"w-6 rounded-xl"} src="/assets/images/girl-smile.svg" alt=""/>
                                        <p className={"text-sm text-secondary font-medium"}>16pts</p>
                                        <span>{VerticalThreeDotIcon}</span>
                                    </div>
                                </div>
                                <div className={"flex-center-between p-3 bg-white border border-[#E8E8E8] rounded-xl"}>
                                    <p className={"font-medium text-[#363636] flex-1"}>💆🏻‍♂️ Wash your face</p>

                                    <div className={"flex-center gap-4"}>
                                        <img className={"w-6 rounded-xl"} src="/assets/images/girl-smile.svg" alt=""/>
                                        <p className={"text-sm text-secondary font-medium"}>16pts</p>
                                        <span>{VerticalThreeDotIcon}</span>
                                    </div>
                                </div>
                                <div className={"flex-center-between p-3 bg-white border border-[#E8E8E8] rounded-xl"}>
                                    <p className={"font-medium text-[#363636] flex-1"}>🪥 Brush your teeth</p>

                                    <div className={"flex-center gap-4"}>
                                        <img className={"w-6 rounded-xl"} src="/assets/images/girl-smile.svg" alt=""/>
                                        <p className={"text-sm text-secondary font-medium"}>16pts</p>
                                        <span>{VerticalThreeDotIcon}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"mt-6"}>
                            <div className={"flex-center-between"}>
                                <p className={"flex-center gap-1 text-secondary-dark font-semibold text-sm"}>✅ Completed tasks<span className={"font-medium text-secondary"}>0</span></p>
                                <ChevronDown size={16} className={"text-[#B1B1B1]"}/>
                            </div>
                            <div className={"mt-2 flex-column gap-2"}>
                                <div className={"flex-center-between p-3 bg-white border border-[#E8E8E8] rounded-xl"}>
                                    <p className={"font-medium text-[#363636] flex-1"}>🥱 Get out of bed early</p>

                                    <div className={"flex-center gap-4"}>
                                        <p className={"text-sm text-[#09C2B2] font-medium"}>+5pts</p>
                                        <img className={"w-6 rounded-xl"} src="/assets/images/girl-smile.svg" alt=""/>
                                        <img className={"w-6 rounded-xl"} src="/assets/images/girl-smile.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <FormModal isOpen={showTaskModal} style={"lg:w-[450px] max-h-full rounded-t-3xl overflow-y-auto lg:mb-0"}>
                <Task closeModal={() => setShowTaskModal(false)}/>
            </FormModal>

        </DashboardLayout>
    );
};

export default Tasks;