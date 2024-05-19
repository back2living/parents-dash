import {CloseIcon, SelectedIcon} from "@/components/shared/Svg";
import {Fragment, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react"
import {tasks} from "@/constants/data";

const Task = ({closeModal}: {closeModal: () => void}) => {
    const [selected, setSelected] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isTaskFocused, setIsTaskFocused] = useState(false);

    return (
        <div>
            <div className={"flex-center-between"}>
                <p className={"form-modal-title"}>Assign task</p>
                <button onClick={closeModal}>{CloseIcon}</button>
            </div>

            <div className={"mt-10"}>
                <div>
                    <label className={"auth-label text-primary"} htmlFor="">Task categories</label>
                    <div>
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative">
                                <Listbox.Button onClick={() => setIsFocus(!isFocus)}
                                                className={`edit-category-btn ${isFocus ? "border-2 border-[#F07846]" : "border-none"}`}>
                                    <p className={"space-y-[1.5px]"}>
                                        <span
                                            className={`block font-medium text-secondary-dark text-sm`}>{selected ? selected : "Select task category"}</span>
                                    </p>
                                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                        {isFocus ? <ChevronUp color={"#868686"}/> : <ChevronDown color={"#868686"}/>}
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
                                            {tasks.map((item, personIdx) => (
                                                <Listbox.Option
                                                    onClick={() => setIsFocus(false)}
                                                    key={personIdx}
                                                    className={({active}) => `rounded-lg relative cursor-default py-2 text-primary  ${active ? 'bg-[#F9FAFB]' : ''}`}
                                                    value={item}
                                                >

                                                    {({selected}) => (
                                                        <p className={`flex-center gap-2 ${selected ? "px-3" : "px-10"}`}>
                                                            {selected && <span>{SelectedIcon}</span>}
                                                            <span
                                                                className={`block text-primary dark:text-secondary-dark text-sm font-medium ${selected && "dark:text-[##363636]"}`}>{item}</span>
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

                <div className={"mt-6"}>
                    <label className={"auth-label text-primary"} htmlFor="">Assign task</label>
                    <div>
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative">
                                <Listbox.Button onClick={() => setIsTaskFocused(!isTaskFocused)} className={`edit-category-btn ${isTaskFocused ? "border-2 border-[#F07846]" : "border-none"}`}>
                                    <span className={`block font-medium text-secondary-dark text-sm`}>{selected ? selected : "Select task"}</span>
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
                                            {tasks.map((item, personIdx) => (
                                                <Listbox.Option
                                                    onClick={() => setIsTaskFocused(false)}
                                                    key={personIdx}
                                                    className={({active}) => `rounded-lg relative cursor-default py-2 text-primary  ${active ? 'bg-[#F9FAFB]' : ''}`}
                                                    value={item}
                                                >

                                                    {({selected}) => (
                                                        <p className={`flex-center gap-2 ${selected ? "px-3" : "px-10"}`}>
                                                            {selected && <span>{SelectedIcon}</span>}
                                                            <span
                                                                className={`block text-primary dark:text-secondary-dark text-sm font-medium ${selected && "dark:text-[##363636]"}`}>{item}</span>
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

                <div className={"flex-center gap-6 mt-10"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <button className={"primary-btn"}>Add money</button>
                </div>
            </div>
        </div>
    );
};

export default Task;