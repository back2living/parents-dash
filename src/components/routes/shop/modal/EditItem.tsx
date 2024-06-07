import {CircleCloseIcon, EditItemIcon} from "@/components/shared/Svg";
import ModalTop from "@/components/shared/ModalTop";
import {useState} from "react";

type Props = {
    closeModal: () => void;
    item: {
        name: string;
        amount: number;
        img: string;
        description?: string;
    }
}

const EditItem = ({closeModal, item}: Props) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [file, setFile] = useState(null);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemPrice, setItemPrice] = useState("");

    const handleImageUpload = (e: any) => {
        const selectedImage = e.target.files[0];
        setFile(selectedImage);
    }


    return (
        <div className={""}>
            <ModalTop title={"Edit store item"} Icon={CircleCloseIcon} closeModal={closeModal}/>

            <div className={"modal-content flex-column gap-6"}>
                <div>
                    <p className={"auth-label"}>Photo</p>
                    <div className={"bg-[#F5F5F5] h-[220px] flex-center justify-center rounded-3xl relative"}>
                        <img className={"w-full h-full object-cover rounded-3xl"} src={item.img} alt=""/>

                        {/*TODO: update the image....HINT: Check saving goals.*/}

                        <label
                            className={"cursor-pointer transition-all duration-300 hover:-rotate-180 absolute top-4 right-4"}
                            htmlFor="images">
                            <span onClick={() => setShowModal(true)}>{EditItemIcon}</span>
                            <input accept=".jpeg, .jpg, .png" multiple onChange={(e) => handleImageUpload(e)}
                                   id={"images"} type="file" hidden/>
                        </label>
                    </div>
                </div>

                <div>
                    <label className={"auth-label"} htmlFor="">Item name</label>
                    <div>
                        <input onChange={e => setItemName(e.target.value)}
                               className={"auth-input placeholder:text-primary"} placeholder={item.name}
                               value={itemName} type="text"/>
                    </div>
                </div>

                <div>
                    <label className={"auth-label"} htmlFor="">Item description</label>
                    <textarea
                        className={"textarea placeholder:text-primary"}
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        rows={5}
                        // rows={Math.ceil(item.description.length / 50)}
                        placeholder={item.description}
                    />
                </div>

                <div>
                    <label className={"auth-label"} htmlFor="">Item price</label>
                    <div>
                        <input className={"auth-input placeholder:text-primary"} placeholder={String(item.amount)}
                               value={itemPrice} type="text"/>
                    </div>
                </div>

                <button className={"primary-btn lg:mt-10 xl:mt-16"}>Update</button>
            </div>

        </div>
    );
};

export default EditItem;