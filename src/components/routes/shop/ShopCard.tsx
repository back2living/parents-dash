import React, {useState} from 'react';
import {BinIcon, PencilEditIcon, ThreeDotIcon} from "@/components/shared/Svg";
import FormModal from "@/components/shared/FormModal";
import InfoModal from "@/components/shared/InfoModal";
import EditItem from "@/components/routes/shop/modal/EditItem";
import RemoveItem from "@/components/routes/shop/modal/RemoveItem";

type Props = {
    item: {
        img: string;
        name: string;
        amount: number;
    }
}

const ShopCard = ({item}: Props) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showModal, setShowModal] = useState({editModal: false, removeModal: false});

    const isModalOpen = showModal.editModal || showModal.removeModal;

    const handleOpenAccountModal = (modalType: string) => {
        setShowModal((prevState) => ({...prevState, [modalType]: true}));
        setShowDropdown(false);
    }
    const handleCloseAccountModal = (modalType: string) => {
        setShowModal((prevState) => ({
            ...prevState,
            [modalType]: false,
        }));
    };

    const handleCloseDropdown = () => showDropdown && setShowDropdown(false);

    return (
        <div>
            <div className={"relative group"}>
                <div className={"w-full h-[250px] rounded-3xl"}>
                    <img className={"w-full h-full object-cover rounded-3xl transition duration-300 group-hover:opacity-80"} src={item.img} alt=""/>
                </div>

                <button onClick={() => setShowDropdown(prevState => !prevState)} className={"lg:opacity-0 transition duration-300 lg:group-hover:opacity-100 absolute top-4 right-4"}>{ThreeDotIcon}</button>
                <div className={`${showDropdown ? "opacity-100" : "opacity-0 pointer-events-none"} shadow-country text-xs p-0.5 transition-all duration-300 bg-white rounded-lg z-20 absolute top-11 right-2 lg:-right-12 w-[160px] max-w-[200px]`}>
                    <button onClick={() => handleOpenAccountModal("editModal")} className={"dropdown-text"}><span>{PencilEditIcon}</span> Edit item</button>
                    <button onClick={() => handleOpenAccountModal("removeModal")} className={"dropdown-text"}><span>{BinIcon}</span> Remove Item</button>
                </div>
            </div>

            <div className={"mt-4"}>
                <p className={"text-[#515151] font-bold"}>{item.name}</p>
                <p className={"text-secondary-dark text-sm font-medium mt-2"}>{item.amount} pts</p>
            </div>


            <FormModal isOpen={showModal.removeModal} style={`lg:w-[450px] max-h-full overflow-y-auto lg:mb-0 rounded-t-3xl`}>
                <RemoveItem closeModal={() => handleCloseAccountModal("removeModal")} />
            </FormModal>

            <InfoModal isOpen={showModal.editModal} style={"w-full lg:w-[400px] max-h-full"}>
                <EditItem item={item} closeModal={() => handleCloseAccountModal("editModal")} />
            </InfoModal>
        </div>
    );
};
export default ShopCard;