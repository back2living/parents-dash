import {useEffect, useState} from "react";
import {BinIcon, PencilEditIcon, ThreeDotIcon} from "@/components/shared/Svg";
import FormModal from "@/components/shared/FormModal";
import InfoModal from "@/components/shared/InfoModal";
import EditItem from "@/components/routes/storefront/modal/EditItem";
import RemoveItem from "@/components/routes/storefront/modal/RemoveItem";
import {useClickOutside} from "@/hooks/useClickoutside";
import {StorefrontItem} from "@/interfaces/StorefrontInterface";

export interface IStoreItem {
    item: StorefrontItem;
    avatarKey: number;
}

const ShopCard = ({item, avatarKey}: IStoreItem) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [showModal, setShowModal] = useState({editModal: false, removeModal: false});
    const [selectedItem, setSelectedItem] = useState<StorefrontItem>(item);
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prevState => prevState + 1);
    }, [item?.updatedAt]);

    const handleOpenAccountModal = (modalType: string) => {
        setShowModal((prevState) => ({...prevState, [modalType]: true}));
        setShowDropdown(false);
        setSelectedItem(item);
    }
    const handleCloseAccountModal = (modalType: string) => {
        setShowModal((prevState) => ({
            ...prevState,
            [modalType]: false,
        }));
        setSelectedItem(item);
    };

    const ref = useClickOutside<HTMLDivElement>(() => setShowDropdown(false));

    return (
        <div>
            <div className={"relative group"}>
                <div className={"w-full h-[250px] relative rounded-3xl"}>
                    <img
                        key={key || avatarKey}
                        src={`${item.avatar}`}
                        alt={item.name}
                        className={"w-full h-full object-cover rounded-3xl transition duration-300 group-hover:opacity-80"}
                    />
                </div>


                <button onClick={() => setShowDropdown((prevState) => !prevState)}
                        className={`lg:opacity-0 transition duration-300 lg:group-hover:opacity-100 absolute top-4 right-4 ${showDropdown && "pointer-events-none"}`}>{ThreeDotIcon}</button>
                <div ref={ref}
                     className={`${showDropdown ? "opacity-100" : "opacity-0 pointer-events-none"} shadow-country text-xs p-0.5 transition-all duration-300 bg-white rounded-lg z-20 absolute top-11 right-2 lg:-right-12 w-[160px] max-w-[200px]`}>
                    <button onClick={() => handleOpenAccountModal("editModal")} className={"dropdown-text"}><span>{PencilEditIcon}</span> Edit item</button>
                    <button onClick={() => handleOpenAccountModal("removeModal")} className={"dropdown-text"}><span>{BinIcon}</span> Remove Item</button>
                </div>
            </div>


            <div className={"mt-4"}>
                <p className={"text-[#515151] font-bold capitalize"}>{item.name}</p>
                <p className={"text-secondary-dark text-sm font-medium mt-2"}>{item.points} pts</p>
            </div>


            <FormModal isOpen={showModal.removeModal} style={`lg:w-[450px] w-[95%] max-h-full overflow-y-auto mb-8 lg:mb-0 rounded-3xl lg:rounded-t-3xl`}>
                <RemoveItem item={selectedItem} closeModal={() => handleCloseAccountModal("removeModal")} />
            </FormModal>

            <InfoModal isOpen={showModal.editModal} style={"w-full lg:w-[400px] max-h-full"}>
                <EditItem item={selectedItem} closeModal={() => handleCloseAccountModal("editModal")} />
            </InfoModal>
        </div>
    );
};
export default ShopCard;