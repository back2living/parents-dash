import {Dispatch, SetStateAction} from "react";
import Button from "@/components/shared/Button";

type ImageUploadType = {
    file: File | null;
    closeModal: () => void;
    text?: string;
    setShowModal?: Dispatch<SetStateAction<boolean>>
    isImageConversion?: boolean;
    isGuardianProfileImg?: boolean;
    handleUploadProfilePicture?:() => void;
    isPending?:boolean;
}

const ImageUpload = ({file, closeModal, text="Edit Image", setShowModal, isImageConversion, handleUploadProfilePicture, isGuardianProfileImg, isPending}: ImageUploadType) => {
    const saveImage = () => {
        if (setShowModal) {
            setShowModal(false);
        }
    }

    const handleUploadImage = () => {
        if (isGuardianProfileImg && handleUploadProfilePicture) {
            handleUploadProfilePicture();
        }
    }

    return (
        file && <div>
            <div className={"p-4 lg:p-6"}>
                <p className={"form-modal-title"}>{text}</p>
                <div className={"mt-6 lg:mt-12"}>
                    <div className={"max-w-[500px] rounded-xl"}>
                        {!isImageConversion && <div className={"max-w-[500px] h-[261px] lg:h-[400px] rounded-xl relative"}>
                            <img src={URL.createObjectURL(file)} alt="Boy"
                                 className="w-full h-full absolute inset-0 rounded-xl brightness-50 object-cover"/>
                            <img src={URL.createObjectURL(file)} alt="Boy"
                                 className="w-[260px] lg:w-[400px] mx-auto h-[255px] lg:h-full relative rounded-full object-cover"/>
                        </div>}
                        {isImageConversion && <div className={"max-w-[500px] h-[261px] lg:h-[400px] rounded-xl relative"}>
                            <p>Converting...</p>
                            <p>Image is being converted to a suitable format...</p>
                        </div>}
                    </div>
                </div>

                <div className={"mt-6 lg:mt-12 flex gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    {!isGuardianProfileImg && <button onClick={saveImage} className={"primary-btn"}>Save</button>}
                    {isGuardianProfileImg && <Button isLoading={isPending!} isValid={true} name={"Upload"} handleClick={handleUploadImage} className={"primary-btn"}/>}
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;