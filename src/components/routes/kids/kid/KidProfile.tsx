import {EditKidIcon} from "@/components/shared/Svg";
import FormModal from "@/components/shared/FormModal";
import ImageUpload from "@/components/routes/kids/kid/ImageUpload";
import {useState} from "react";
import {Allowance, Profile, RecentDoCards, RecentTasks, StoreItem, Activity} from "@/components/routes/kids/kid/index";
import {useUpdateKidProfileImage} from "@/hooks/useKids";
import useImageUpload from "@/hooks/useImageUpload";
import useUploadFiles from "@/hooks/useUploadFiles";
import {useCurrentKid} from "@store/kid/kidStore";

const KidProfile = () => {
    const currentKid = useCurrentKid();
    const [localLoading, setLocalLoading] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [avatarKey, setAvatarKey] = useState(0);

    const {selectedImage, handleImageUpload, file, setFile, handleGetImageSignedUrls, URLS} = useImageUpload();
    useUploadFiles(URLS, selectedImage);
    const fallbackImg = file ? URL.createObjectURL(file) : null

    const handleStopLocalLoading = () => setLocalLoading(false);
    const closeModal = () => {
        setShowModal(false);
        setAvatarKey((prevKey) => prevKey + 1);
    }

    const {isPending, mutate} = useUpdateKidProfileImage(closeModal, handleStopLocalLoading);
    const handleUploadProfilePicture = async () => {
        setLocalLoading(true);
        if (selectedImage?.length > 0) {
            const imageUrls = await handleGetImageSignedUrls();
            if (imageUrls) {
                mutate({
                    avatar: imageUrls[0],
                    id: currentKid?._id || ""
                });
            }
        }
    }

    return (
        <div className={"grid grid-cols-1 lg:grid-cols-2 lg:gap-20"}>
            <div className={"max-w-[600px]"}>
                <div className={"rounded-3xl w-20 h-20 relative"}>
                    <img
                        key={avatarKey}
                        className={"rounded-full w-20 h-20 object-cover"}
                        src={`${fallbackImg || currentKid?.avatar}`}
                        alt=""
                    />

                    <label className={"cursor-pointer transition-all duration-300 hover:rotate-[360deg] absolute top-0 right-0"}
                        htmlFor="images">
                        <span>{EditKidIcon}</span>
                        <input accept=".jpeg, .jpg, .png" multiple onChange={(e) => {
                            handleImageUpload(e);
                            setShowModal(true)
                        }} id={"images"} type="file" hidden/>
                    </label>
                </div>

                <div>
                    <Profile/>
                    <Allowance/>
                    <Activity/>
                </div>
            </div>
            <div className={"max-w-[600px] mt-4 lg:mt-0 lg:flex-column gap-10"}>
                <RecentTasks/>
                <RecentDoCards/>
                <StoreItem/>
            </div>
            <FormModal isOpen={!!(file && showModal)} style={"lg:w-[550px] max-h-full rounded-2xl w-[95%] mx-auto overflow-y-auto mb-8 lg:mb-0"}>
                <ImageUpload
                    isPending={localLoading || isPending}
                    handleUploadProfilePicture={handleUploadProfilePicture}
                    isGuardianProfileImg
                    text={"Upload Image"}
                    closeModal={() => {
                        setFile(null);
                        setShowModal(false)
                    }}
                    file={file}
                />
            </FormModal>
        </div>

    );
};

export default KidProfile;