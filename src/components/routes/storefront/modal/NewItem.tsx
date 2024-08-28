import {Dispatch, Fragment, SetStateAction, useState} from "react";
import {AddPhotoIcon, CloseIcon, EditItemIcon, SelectedIcon} from "@/components/shared/Svg";
import {Listbox, Transition} from "@headlessui/react";
import {ChevronDown, ChevronUp} from "lucide-react";
import ModalTop from "@/components/shared/ModalTop";
import useImageUpload from "@/hooks/useImageUpload";
import useUploadFiles from "@/hooks/useUploadFiles";
import {useAddStorefrontCategoryItem, useFetchAllStorefrontsCategories} from "@/hooks/useStorefront";
import Button from "@/components/shared/Button";
import {StorefrontCategoryOnly} from "@interfaces/StorefrontInterface";

interface INewItem {
    closeModal: () => void;
    setAvatarKey: Dispatch<SetStateAction<number>>
}

const NewItem = ({closeModal, setAvatarKey}: INewItem) => {
    const [selectedCategory, setSelectedCategory] = useState<null | StorefrontCategoryOnly>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [itemName, setItemName] = useState("");
    const [points, setPoints] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [localLoading, setLocalLoading] = useState(false);

    const {data: categories} = useFetchAllStorefrontsCategories();

    const handleStopLocalLoading = () => setLocalLoading(false);

    const {selectedImage, handleImageUpload, file, handleGetImageSignedUrls, URLS} = useImageUpload();
    useUploadFiles(URLS, selectedImage);

    const {mutate, isPending} = useAddStorefrontCategoryItem(closeModal, handleStopLocalLoading, () => setAvatarKey(prev => prev + 1));

    const handleAddCategoryItem = async () => {
        setLocalLoading(true);
        if (selectedImage?.length > 0) {
            const imageUrl = await handleGetImageSignedUrls();
            if (imageUrl && selectedCategory) {
                mutate({
                    points: +points,
                    description: itemDescription,
                    id: selectedCategory._id,
                    name: itemName,
                    avatar: imageUrl[0],
                });
            }
        }
    }

    const isValid = !!(itemName && points && itemDescription && selectedCategory && file);

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
                            <span>{AddPhotoIcon}</span>
                            <span className={"text-[#515151] text-sm font-medium"}>Add item photo</span>

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
                    {file && <div className={"w-[300px] h-40 bg-[#f5f5f5] relative flex-center justify-center rounded-3xl"}>
                            <label
                                className={"edit-icon"}
                                htmlFor="images">
                                <span>{EditItemIcon}</span>
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
                        <input
                            value={itemName}
                            onChange={e => setItemName(e.target.value)}
                            className={"auth-input"} type="text" placeholder={"e.g sneakers"}
                        />
                    </div>
                    <div className={"flex-1"}>
                        <label className="auth-label">Item points</label>
                        <input
                            value={points}
                            onChange={e => setPoints(e.target.value)}
                            className={"auth-input"} type="text" placeholder={"0 pts"}
                        />
                    </div>
                </div>
                <div className={"flex flex-column items-start gap-4"}>
                    <div className={"w-full"}>
                        <label className={"auth-label"}>Item category</label>
                        <div>
                            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                                <div className="relative">
                                    <Listbox.Button onClick={() => setIsFocus(!isFocus)}
                                                    className={`edit-category-btn ${isFocus ? "border-2 border-[#F07846]" : "border-none"}`}>
                                        <span className={`block font-medium text-secondary-dark text-sm`}>{selectedCategory ? selectedCategory.title : "None"}</span>
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
                                                {categories?.data?.map((category) => (
                                                    <Listbox.Option
                                                        onClick={() => setIsFocus(false)}
                                                        key={category._id}
                                                        className={({active}) => `rounded-lg relative cursor-default py-2 text-primary ${active ? "bg-[#F9FAFB]" : ""}`}
                                                        value={category}
                                                    >

                                                        {({selected}) => (
                                                            <p className={`flex-center gap-2 ${selected ? "px-3" : "px-10"}`}>
                                                                {selected && <span>{SelectedIcon}</span>}
                                                                <span className={`block text-primary dark:text-secondary-dark text-sm font-medium ${selected && "dark:text-[##363636]"}`}>{category.title}</span>
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
                <div className={"w-full"}>
                    <label className="auth-label">Item description</label>
                    <textarea
                        className={"textarea placeholder:text-secondary"}
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        rows={3}
                        placeholder={"Item description"}
                    />
                </div>

                <div className={"flex gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <Button isValid={isValid} className={"primary-btn"} name={"Add item"} isLoading={localLoading || isPending} handleClick={handleAddCategoryItem}/>
                </div>
            </div>

        </div>);
};

export default NewItem;