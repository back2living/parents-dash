import {CircleCloseIcon, EditItemIcon,} from "@/components/shared/Svg";
import ModalTop from "@/components/shared/ModalTop";
import {useState} from "react";
import {DatePickerForm} from "@/components/shared/DatePicker";

const EditSavingGoalsModal = ({goal, closeModal}: {goal: any,closeModal: () => void}) => {
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selected, setSelected] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isTaskFocused, setIsTaskFocused] = useState(false);

    const handleImageUpload = (e: any) => {
        const selectedImage = e.target.files[0];
        setFile(selectedImage);
        // setSelectedImage([...e.target.files]);
    }

    console.log(goal);

    return (
        <div className={"h-full"}>
            <ModalTop title={"Edit saving goal request"} Icon={CircleCloseIcon} closeModal={closeModal}/>

            <div className={"modal-content pb-0 lg:receipt-height flex-column gap-6 lg:justify-between"}>
                <div className={"flex-column gap-6"}>
                    <div>
                        <span className={"auth-label text-primary"}>Photo</span>
                        {!file && <div className={"w-[300px] h-44 bg-[#f5f5f5] relative flex-center justify-center rounded-3xl"}>
                            <label
                                className={"edit-icon"}
                                htmlFor="images">
                                <span className={""} onClick={() => setShowModal(true)}>{EditItemIcon}</span>
                                <input accept=".jpeg, .jpg, .png" multiple onChange={(e) => handleImageUpload(e)}
                                       id={"images"}
                                       type="file" hidden/>
                            </label>
                            <img src={goal?.itemImg} alt="goal-image"
                                 className="w-full h-full object-cover rounded-3xl"/>
                        </div>}

                        {file && <div className={"w-[300px] h-44 bg-[#f5f5f5] relative flex-center justify-center rounded-3xl"}>
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
                    <div>
                        <label className="auth-label">Savings goal name</label>
                        <input className={"auth-input"} type="text" placeholder={"e.g buy a bicycle"}/>
                    </div>
                    <div>
                        <label className="auth-label">Point</label>
                        <input className={"auth-input"} type="text" placeholder={"e.g 20pts"}/>
                    </div>
                    <div className={"flex flex-column items-start gap-4"}>
                        <div className={"w-full"}>
                            <DatePickerForm/>
                        </div>
                    </div>
                </div>

                <div className={"flex gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <button className={"primary-btn"}>Edit Request</button>
                </div>
            </div>
        </div>
    );
};

export default EditSavingGoalsModal;