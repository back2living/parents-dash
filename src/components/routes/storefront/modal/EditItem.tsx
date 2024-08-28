import {CircleCloseIcon, EditItemIcon} from "@/components/shared/Svg";
import ModalTop from "@/components/shared/ModalTop";
import {useState} from "react";
import useImageUpload from "@/hooks/useImageUpload";
import useUploadFiles from "@/hooks/useUploadFiles";
import {useEditStorefrontCategoryItem} from "@/hooks/useStorefront";
import Button from "@/components/shared/Button";
import {StorefrontItem} from "@interfaces/StorefrontInterface";

type Props = {
    closeModal: () => void;
    item: StorefrontItem;
}

const EditItem = ({closeModal, item}: Props) => {
    const [itemName, setItemName] = useState(item?.name);
    const [itemDescription, setItemDescription] = useState(item?.description);
    const [itemPoints, setItemPoints] = useState(item?.points);
    const [localLoading, setLocalLoading] = useState(false);

    const {selectedImage, handleImageUpload, file, handleGetImageSignedUrls, URLS} = useImageUpload();
    useUploadFiles(URLS, selectedImage);

    const handleStopLocalLoading = () => setLocalLoading(false);
    const {mutate, isPending} = useEditStorefrontCategoryItem(closeModal, handleStopLocalLoading,)

    const handleEditCategoryItem = async () => {
        setLocalLoading(true);
        if (selectedImage?.length > 0) {
            const imageUrl = await handleGetImageSignedUrls();
            if (imageUrl) {
                mutate({
                    points: +itemPoints,
                    description: itemDescription,
                    id: item?._id,
                    name: itemName,
                    avatar: imageUrl[0],
                });
            }
        } else {
            mutate({
                points: +itemPoints,
                description: itemDescription,
                id: item?._id,
                name: itemName,
                avatar: item.avatar,
            });
        }
    }

    return (
        <div className={"flex-column h-full"}>
            <ModalTop title={"Edit store item"} Icon={CircleCloseIcon} closeModal={closeModal}/>

            <div className={"modal-content flex-column justify-between h-full"}>
                <div className={"flex-column gap-6 flex-1"}>
                    <div>
                        <p className={"auth-label"}>Photo</p>
                        {!file && <div className={"bg-[#F5F5F5] h-44 flex-center justify-center rounded-3xl relative"}>
                            <img className={"w-full h-full object-cover rounded-3xl"} src={item.avatar} alt=""/>

                            <label
                                className={"cursor-pointer transition-all duration-300 hover:-rotate-180 absolute top-4 right-4"}
                                htmlFor="images">
                                <span>{EditItemIcon}</span>
                                <input
                                    accept=".jpeg, .jpg, .png"
                                    multiple
                                    onChange={(e) => handleImageUpload(e)}
                                    id={"images"}
                                    type="file"
                                    hidden
                                />
                            </label>
                        </div>}
                        {file && <div className={"h-44 bg-[#f5f5f5] relative flex-center justify-center rounded-3xl"}>
                                <label
                                    className={"edit-icon"}
                                    htmlFor="images">
                                    <span>{EditItemIcon}</span>
                                    <input
                                        accept=".jpeg, .jpg, .png"
                                        multiple
                                        onChange={(e) => handleImageUpload(e)}
                                        id={"images"}
                                        type="file"
                                        hidden
                                    />
                                </label>
                                <img src={URL.createObjectURL(file)} alt="goal-image"
                                     className="w-full h-full object-cover rounded-3xl"/>
                            </div>}
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
                        />
                    </div>
                    <div>
                        <label className={"auth-label"} htmlFor="">Item price</label>
                        <div>
                            <input
                                className={"auth-input placeholder:text-primary"}
                                placeholder={String(item.points)}
                                value={itemPoints}
                                onChange={e => setItemPoints(+e.target.value)}
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                <Button
                    isValid={true}
                    className={"primary-btn lg:mt-10 xl:mt-16"}
                    name={"Update"}
                    isLoading={localLoading || isPending}
                    handleClick={handleEditCategoryItem}
                />
            </div>
        </div>
    );
};

export default EditItem;