import {CloseIcon, SelectedIcon, AddPhotoIcon, EditKidIcon, EditItemIcon} from "@/components/shared/Svg";
import {Fragment, useState} from "react";
import {Listbox, Transition} from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react"
import {tasks} from "@/constants/data";
import {DatePickerForm} from "@/components/shared/DatePicker";
import ModalTop from "@/components/shared/ModalTop";

const AddSavingGoals = ({closeModal}: {closeModal: () => void}) => {
    const [selected, setSelected] = useState(null);
    const [selectedFrequency, setSelectedFrequency] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isTaskFocused, setIsTaskFocused] = useState(false);
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleImageUpload = (e: any) => {
        const selectedImage = e.target.files[0];
        setFile(selectedImage);
        // setSelectedImage([...e.target.files]);
    }

    return (
        <div>
            <ModalTop title={"Add new savings goal"} Icon={CloseIcon} closeModal={closeModal}/>

            <div className={"mt-10 flex-column gap-6"}>
                <div>
                    <span className={"auth-label text-primary"}>Photo</span>
                    {!file && <div className={"w-[300px] h-40 bg-[#f5f5f5] flex-center justify-center rounded-3xl "}>
                        <label
                            className={"cursor-pointer transition-all duration-300 flex-column items-center gap-2.5"}
                            htmlFor="images">
                            <span onClick={() => setShowModal(true)}>{AddPhotoIcon}</span>
                            <span className={"text-[#515151] text-sm font-medium"}>Add photo</span>

                            <input accept=".jpeg, .jpg, .png" multiple onChange={(e) => handleImageUpload(e)}
                                   id={"images"}
                                   type="file" hidden/>
                        </label>
                    </div>}

                    {file && <div className={"w-[300px] h-40 bg-[#f5f5f5] relative flex-center justify-center rounded-3xl"}>
                        <label
                            className={"edit-icon"}
                            htmlFor="images">
                            <span className={""} onClick={() => setShowModal(true)}>{EditItemIcon}</span>
                            <input accept=".jpeg, .jpg, .png" multiple onChange={(e) => handleImageUpload(e)}
                                   id={"images"}
                                   type="file" hidden/>
                        </label>
                        <img src={URL.createObjectURL(file)} alt="goal-image" className="w-full h-full object-cover rounded-3xl"/>
                    </div>}
                </div>

                <div>
                    <label className="auth-label">Savings goal name</label>
                    <input className={"auth-input"} type="text" placeholder={"e.g buy a bicycle"}/>
                </div>

                <div>
                    <label className={"auth-label text-primary"} htmlFor="">Assign to</label>
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

                <div>
                    <label className="auth-label">Amount</label>
                    <input className={"auth-input"} type="text" placeholder={"e.g 20pts"}/>
                </div>
                <div className={"w-full"}>
                    <DatePickerForm/>
                </div>

                <div className={"flex-center gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <button className={"primary-btn"}>Add point</button>
                </div>
            </div>
        </div>
    );
};

export default AddSavingGoals;