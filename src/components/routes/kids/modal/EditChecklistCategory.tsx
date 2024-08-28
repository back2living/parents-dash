import ModalTop from "@/components/shared/ModalTop";
import {CircleCloseIcon, SelectedIcon} from "@/components/shared/Svg";
import {Listbox, Transition} from "@headlessui/react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Fragment, useState} from "react";
import {tasks} from "@/constants/data";

const EditChecklistCategory = ({closeModal}: { closeModal: () => void }) => {
    const [selected, setSelected] = useState(null);
    const [isTaskFocused, setIsTaskFocused] = useState(false);

    return (
        <div className={"relative"}>
            <ModalTop title={"Edit category name"} Icon={CircleCloseIcon} closeModal={closeModal}/>

            <div className={"modal-content flex-column gap-6"}>
                <div>
                    <label className={"auth-label text-primary"} htmlFor="">Category Icon</label>
                    <div>
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative">
                                <Listbox.Button onClick={() => setIsTaskFocused(!isTaskFocused)}
                                                className={`edit-category-btn ${isTaskFocused ? "border-2 border-[#F07846]" : "border-none"}`}>
                                    <span
                                        className={`block font-medium text-secondary-dark text-sm`}>{selected ? selected : "Choose kid"}</span>
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
                                                    className={({active}) => `rounded-lg relative cursor-default py-2 text-primary  ${active ? "bg-[#F9FAFB]" : ""}`}
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

                <div>
                    <label className={"auth-label"} htmlFor="">Category name</label>
                    <input placeholder={"e.g sneakers"} className={"auth-input"} type="text"/>
                </div>

                <div className={"flex gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <button className={"primary-btn"}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default EditChecklistCategory;