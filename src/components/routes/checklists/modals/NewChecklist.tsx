import ModalTop from "@/components/shared/ModalTop";
import {CircleCloseIcon, SelectedIcon} from "@/components/shared/Svg";
import {Listbox, Transition} from "@headlessui/react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Fragment, useState} from "react";
import {useAddChecklist, useAddKidChecklist} from "@/hooks/useChecklists";
import IconComponent from "@/components/shared/IconComponent";
import Button from "@/components/shared/Button";
import {FetchChecklistCategory, IChecklistCategory} from "@interfaces/ChecklistInterface";

export const array1To24 = Array.from({ length: 24 }, (_, i) => i + 1);

type NewChecklistType = {
    closeModal: () => void;
    activeCategory: IChecklistCategory;
    categoryExists: boolean;
    kidId?: string | undefined;
    data?: FetchChecklistCategory;
}

const NewChecklist = ({closeModal, categoryExists, activeCategory, kidId, data}: NewChecklistType) => {
    const [selectedCategory, setSelectedCategory] = useState<null | IChecklistCategory>(null);
    const [isTaskFocused, setIsTaskFocused] = useState(false);
    const [isIntervalFocused, setIsIntervalFocused] = useState(false);
    const [emoji, setEmoji] = useState("");
    const [checklistName, setChecklistName] = useState("");
    const [reward, setReward] = useState("");
    const [penalty, setPenalty] = useState("");
    const [interval, setInterval] = useState<null | number>(null);

    const {isPending, mutate} = useAddChecklist(closeModal);
    const {isPending: isAddKidChecklistPending, mutate: addKidChecklist} = useAddKidChecklist(closeModal);

    const isValid = !!(reward && emoji && penalty && checklistName && (activeCategory?._id || selectedCategory?._id) && interval)

    const handleAddNewChecklist = () => {
        if (kidId) {
            addKidChecklist({
                reward: +reward,
                icon: emoji,
                penalty: +penalty,
                title: checklistName,
                categoryId: categoryExists ? activeCategory._id! : selectedCategory?._id || "",
                kidId: kidId || "",
                intervals: interval || 1
            });
        } else {
            mutate({
                reward: +reward,
                icon: emoji,
                penalty: +penalty,
                title: checklistName,
                categoryId: categoryExists ? activeCategory?._id || "" : selectedCategory?._id || "",
                intervals: interval || 1
            });
        }
    };

    return (
        <div className={"relative"}>
            <ModalTop title={"Add new checklist"} Icon={CircleCloseIcon} closeModal={closeModal}/>

            <div className={"modal-content flex-column gap-4 lg:gap-6"}>
                <IconComponent emoji={emoji} setEmoji={setEmoji}/>
                <div>
                    <label className={"auth-label"} htmlFor="">Checklist name</label>
                    <input value={checklistName} onChange={e => setChecklistName(e.target.value)}
                           placeholder={"e.g Wash your face"} className={"auth-input"} type="text"/>
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
                                    <span className={`block font-medium text-secondary-dark text-sm`}>{interval ? interval : "Choose Interval"}</span>

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
                                                                <span className={`block text-primary dark:text-secondary-dark text-sm font-medium ${selected && "dark:text-[##363636]"}`}>{item}</span>
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

                <div className={"flex gap-6"}>
                    <div className={"flex-1"}>
                        <label className={"auth-label"} htmlFor="">Reward</label>
                        <input value={reward} onChange={e => setReward(e.target.value)} placeholder={"e.g 10"}
                               className={"auth-input placeholder:text-secondary"} type="text"/>
                    </div>

                    <div className={"flex-1"}>
                        <label className={"auth-label"} htmlFor="">Penalty</label>
                        <input value={penalty} onChange={e => setPenalty(e.target.value)} placeholder={"e.g 50"}
                               className={"auth-input placeholder:text-secondary"} type="text"/>
                    </div>
                </div>
                <div className={"flex gap-4 lg:gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <Button type={"submit"} isValid={isValid} handleClick={handleAddNewChecklist}
                            isLoading={isPending || isAddKidChecklistPending} name={"Submit"}/>
                </div>
            </div>
        </div>
    );
};

export default NewChecklist;