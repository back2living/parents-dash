import ModalTop from "@/components/shared/ModalTop";
import {CircleCloseIcon, SelectedIcon} from "@/components/shared/Svg";
import {Fragment, useState} from "react";
import IconComponent from "@/components/shared/IconComponent";
import Button from "@/components/shared/Button";
import {useUpdateChecklistById} from "@/hooks/useChecklists";
import {Listbox, Transition} from "@headlessui/react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {FetchChecklistCategory, IChecklist, IChecklistCategory} from "@interfaces/ChecklistInterface";
import {array1To24} from "@components/routes/checklists/modals/NewChecklist";

type EditChecklistType = {
    closeModal: () => void;
    selectedChecklist: null | IChecklist;
    activeCategory: IChecklistCategory;
    categoryExists: boolean;
    kidId?: string | undefined;
    data?: FetchChecklistCategory;
}

const EditChecklist = ({closeModal, selectedChecklist, activeCategory, data, categoryExists, kidId}: EditChecklistType) => {
    const [selectedCategory, setSelectedCategory] = useState<null | IChecklistCategory>(null);
    const [isTaskFocused, setIsTaskFocused] = useState(false);
    const [isIntervalFocused, setIsIntervalFocused] = useState(false);
    const [emoji, setEmoji] = useState(selectedChecklist?.icon || "");
    const [checklistName, setChecklistName] = useState(selectedChecklist?.title);
    const [reward, setReward] = useState(selectedChecklist?.reward);
    const [penalty, setPenalty] = useState(selectedChecklist?.penalty);
    const [interval, setInterval] = useState<null | number>(null);

    const {mutate, isPending} = useUpdateChecklistById(closeModal, kidId);
    const handleEditChecklist = () => {
        if (selectedChecklist?._id) {
            mutate({
                icon: emoji!,
                title: checklistName!,
                categoryId: selectedChecklist._id,
                reward: reward || selectedChecklist.reward,
                penalty: penalty || selectedChecklist.penalty,
                intervals: interval || 1
            });
        }
    }

    return (
        <div className={"relative"}>
            <ModalTop title={"Edit checklist"} Icon={CircleCloseIcon} closeModal={closeModal}/>

            <div className={"modal-content flex-column gap-6"}>
                <IconComponent emoji={emoji} setEmoji={setEmoji}/>
                <div>
                    <label className={"auth-label"} htmlFor="">Checklist name</label>
                    <input value={checklistName} onChange={e => setChecklistName(e.target.value)}
                           placeholder={"e.g sneakers"} className={"auth-input"} type="text"/>
                </div>
                <div>
                    <label className={"auth-label text-primary"} htmlFor="">Category</label>
                    <div>
                        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                            <div className="relative">
                                <Listbox.Button onClick={() => setIsTaskFocused(!isTaskFocused)}
                                                className={`edit-category-btn ${isTaskFocused ? "border-2 border-[#F07846]" : "border-none"}`}>
                                    {categoryExists && <span
                                        className={`block font-medium text-secondary-dark text-sm`}>{activeCategory?.title}</span>}
                                    {!categoryExists && <span
                                        className={`block font-medium text-secondary-dark text-sm`}>{selectedCategory?.title ? selectedCategory?.title : "Choose Category"}</span>}

                                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                        {isTaskFocused ? <ChevronUp color={"#868686"}/> :
                                            <ChevronDown color={"#868686"}/>}
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="select-dropdown-box max-h-[300px] z-50 left-0">
                                        <div>
                                            {data?.data?.map((item) => (
                                                <Listbox.Option
                                                    onClick={() => setIsTaskFocused(false)}
                                                    key={item?._id}
                                                    className={({active}) => `rounded-lg relative cursor-default py-2 text-primary  ${active ? "bg-[#F9FAFB]" : ""}`}
                                                    value={item}
                                                >
                                                    {({selected}) => (
                                                        <p className={`flex-center gap-2 ${selected ? "px-3" : "px-10"}`}>
                                                            {selected && <span>{SelectedIcon}</span>}

                                                            <p className={"flex-center gap-1"}>
                                                                <span>{item?.icon}</span>
                                                                <span
                                                                    className={`block text-primary dark:text-secondary-dark text-sm font-medium ${selected && "dark:text-[##363636]"}`}>{item?.title}</span>
                                                            </p>
                                                        </p>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </div>
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                </div>
                <div>
                    <label className={"auth-label text-primary"} htmlFor="">Interval (Hours)</label>
                    <div>
                        <Listbox value={interval} onChange={setInterval}>
                            <div className="relative">
                                <Listbox.Button onClick={() => setIsIntervalFocused(!isIntervalFocused)}
                                                className={`edit-category-btn ${isIntervalFocused ? "border-2 border-[#F07846]" : "border-none"}`}>
                                    <span
                                        className={`block font-medium text-secondary-dark text-sm`}>{interval ? interval : "Choose Interval"}</span>

                                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                        {isIntervalFocused ? <ChevronUp color={"#868686"}/> :
                                            <ChevronDown color={"#868686"}/>}
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="select-dropdown-box max-h-[200px] z-50 left-0">
                                        <div>
                                            {array1To24.map((item) => (
                                                <Listbox.Option
                                                    onClick={() => setIsIntervalFocused(false)}
                                                    key={item}
                                                    className={({active}) => `rounded-lg relative cursor-default py-2 text-primary  ${active ? "bg-[#F9FAFB]" : ""}`}
                                                    value={item}
                                                >
                                                    {({selected}) => (
                                                        <p className={`flex-center gap-2 ${selected ? "px-3" : "px-10"}`}>
                                                            {selected && <span>{SelectedIcon}</span>}

                                                            <p className={"flex-center gap-1"}>
                                                                <span
                                                                    className={`block text-primary dark:text-secondary-dark text-sm font-medium ${selected && "dark:text-[##363636]"}`}>{item}</span>
                                                            </p>
                                                        </p>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </div>
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                </div>
                <div className={"flex-center gap-6"}>
                    <div className={"flex-1"}>
                        <label className={"auth-label"} htmlFor="">Reward</label>
                        <input value={reward} onChange={e => setReward(+e.target.value)} placeholder={"e.g sneakers"}
                               className={"auth-input"} type="text"/>
                    </div>

                    <div className={"flex-1"}>
                        <label className={"auth-label"} htmlFor="">Penalty</label>
                        <input value={penalty} onChange={e => setPenalty(+e.target.value)} placeholder={"e.g sneakers"}
                               className={"auth-input"} type="text"/>
                    </div>
                </div>
                <div className={"flex-center gap-4 lg:gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <Button type={"submit"} isValid={true} handleClick={handleEditChecklist} isLoading={isPending}
                            name={"Save Changes"}/>
                </div>
            </div>
        </div>
    );
};

export default EditChecklist;