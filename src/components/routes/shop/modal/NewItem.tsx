import React, {Fragment, useState} from 'react';
import {AddPhotoIcon, CloseIcon, EditItemIcon, SelectedIcon} from "@/components/shared/Svg";
import {Listbox, Transition} from "@headlessui/react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {tasks} from "@/constants/data";
import ModalTop from "@/components/shared/ModalTop";

const NewItem = ({closeModal}: {closeModal: () => void}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [selected, setSelected] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [itemDescription, setItemDescription] = useState("");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setFile(selectedImage);
            // setSelectedImage([...e.target.files]); // If you need to handle multiple files
        } else {
            // Handle the case where no files are selected
            console.log("No files selected.");
            setFile(null);
        }
    }



    return (
        <div>
            <ModalTop title={"Add new item"} Icon={CloseIcon} closeModal={closeModal}/>

            <div className={"modal-content flex-column gap-6"}>
                <div>
                    <span className={"auth-label text-primary"}>Photo</span>
                    {!file && <div className={"w-[300px] h-40 bg-[#f5f5f5] flex-center justify-center rounded-3xl "}>
                        <label
                            className={"cursor-pointer transition-all duration-300 flex-column items-center gap-2.5"}
                            htmlFor="images">
                            <span onClick={() => setShowModal(true)}>{AddPhotoIcon}</span>
                            <span className={"text-[#515151] text-sm font-medium"}>Add item photo</span>

                            <input accept=".jpeg, .jpg, .png" multiple onChange={(e) => handleImageUpload(e)}
                                   id={"images"}
                                   type="file" hidden/>
                        </label>
                    </div>}

                    {file &&
                        <div className={"w-[300px] h-40 bg-[#f5f5f5] relative flex-center justify-center rounded-3xl"}>
                            <label
                                className={"edit-icon"}
                                htmlFor="images">
                                <span className={""} onClick={() => setShowModal(true)}>{EditItemIcon}</span>
                                <input accept=".jpeg, .jpg, .png" multiple onChange={(e) => handleImageUpload(e)}
                                       id={"images"}
                                       type="file" hidden/>
                            </label>
                            <img src={URL.createObjectURL(file)} alt="goal-image"
                                 className="w-full h-full object-cover rounded-3xl"/>
                        </div>}
                </div>
                <div className={"flex-center gap-4"}>
                    <div className={"w-[57%]"}>
                        <label className="auth-label">Item name</label>
                        <input className={"auth-input"} type="text" placeholder={"e.g sneakers"}/>
                    </div>
                    <div className={"flex-1"}>
                        <label className="auth-label">Item price</label>
                        <input className={"auth-input"} type="text" placeholder={"0 pts"}/>
                    </div>
                </div>
                <div className={"w-full"}>
                    <label className="auth-label">Item description</label>
                    <textarea
                        className={"textarea placeholder:text-secondary"}
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        rows={3}
                        placeholder={"UrbanStride sneakers are as comfy as clouds and as cool as can be! Perfect for all your adventures"}
                    />
                </div>
                <div className={"flex flex-column items-start gap-4"}>
                    <div className={"w-full"}>
                        <label className={"auth-label"}>Item category</label>
                        <div>
                            <Listbox value={selected} onChange={setSelected}>
                                <div className="relative">
                                <Listbox.Button onClick={() => setIsFocus(!isFocus)}
                                                    className={`edit-category-btn ${isFocus ? "border-2 border-[#F07846]" : "border-none"}`}>
                                        <p className={"space-y-[1.5px]"}>
                                        <span
                                            className={`block font-medium text-secondary-dark text-sm`}>{selected ? selected : "None"}</span>
                                        </p>
                                        <span
                                            className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
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
                                                                <span className={`block text-primary dark:text-secondary-dark text-sm font-medium ${selected && "dark:text-[##363636]"}`}>{item}</span>
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
                </div>

                <div className={"flex gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <button className={"primary-btn"}>Add item</button>
                </div>
            </div>

        </div>);
};

export default NewItem;