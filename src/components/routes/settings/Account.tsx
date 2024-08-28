import {EditKidIcon, LogoutIcon} from "@/components/shared/Svg";
import {useState} from "react";
import FormModal from "@/components/shared/FormModal";
import DeleteAccount from "@/components/routes/settings/modal/DeleteAccount";
import ImageUpload from "@/components/routes/kids/kid/ImageUpload";
import LogoutModal from "@/components/shared/Navbar/modal/LogoutModal";
import {useCurrentUser} from "@/store/auth/authStore";
import useImageUpload from "@/hooks/useImageUpload";
import useUploadFiles from "@/hooks/useUploadFiles";
import {useUpdateUserProfileImage} from "@/hooks/useUsers";

const Account = () => {
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [avatarKey, setAvatarKey] = useState(0);

    const {selectedImage, handleImageUpload, file, setFile, handleGetImageSignedUrls, URLS, isImageConversionLoading} = useImageUpload();
    useUploadFiles(URLS, selectedImage);

    const fallbackImg = file ? URL.createObjectURL(file) : null
    const currentUser = useCurrentUser();
    const dateUpdated = new Date(currentUser?.updatedAt || "").getTime();

    const closeModal = () => {
        setShowModal(false);
        setAvatarKey((prevKey) => prevKey + 1);
    }

    const {isPending, mutate} = useUpdateUserProfileImage(closeModal);

    const handleUploadProfilePicture = async () => {
        if (selectedImage?.length > 0) {
            const imageUrls = await handleGetImageSignedUrls();
            if (imageUrls) {
                mutate({avatar: imageUrls[0]});
            }
        }
    }

    return (
        <div className={"max-w-[500px]"}>
            <div>
                <div className={"flex-column gap-6"}>
                    <div className={"flex-center relative items-end gap-5"}>
                        <div>
                            <p className={"auth-label"}>Photo</p>
                            <div className={"w-20 h-20 rounded-full relative"}>
                                <img
                                    key={avatarKey || dateUpdated}
                                    className={"rounded-full w-20 h-20 object-cover"}
                                    src={`${fallbackImg || currentUser?.avatar  || "/assets/images/kid-avatar.svg"}`}
                                    alt=""
                                />

                                <label
                                    className={"cursor-pointer transition-all duration-300 hover:rotate-[360deg] absolute top-0 right-0"}
                                    htmlFor="images">
                                    <span>{EditKidIcon}</span>
                                    <input accept=".jpeg, .jpg, .png" multiple
                                           onChange={(e) => {
                                               handleImageUpload(e);
                                               setShowModal(true);
                                           }}
                                           id={"images"}
                                           type="file" hidden/>
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className={"lg:flex-center flex-column lg:flex-row gap-4"}>
                        <div className={"flex-1"}>
                            <label className={"auth-label"} htmlFor="">First name</label>
                            <input disabled={true} value={currentUser?.firstName} className={"auth-input disabled:cursor-not-allowed"}
                                   type="text"/>
                        </div>
                        <div className={"flex-1"}>
                            <label className={"auth-label"} htmlFor="">Last name</label>
                            <input disabled={true} value={currentUser?.lastName} className={"auth-input disabled:cursor-not-allowed"}
                                   type="text"/>
                        </div>
                    </div>
                    <div className={"flex-column gap-2"}>
                        <label htmlFor="">Email address</label>
                        <input disabled={true} value={currentUser?.email} className={"auth-input disabled:cursor-not-allowed"} type="email"/>
                    </div>
                </div>

                <div className="border border-[#F7F7F7] my-10"/>

                <button onClick={() => setShowLogoutModal(true)} className={"flex-center gap-1 text-orange font-semibold"}><span>{LogoutIcon}</span>LOGOUT</button>

                <div className={"mt-10"}>
                    <p className={"text-primary text-md font-semibold mb-2"}>Close account</p>
                    <p className={"text-secondary"}>Delete your account and all the data</p>
                    <button onClick={() => setShowDeleteAccountModal(true)} className={"white-btn w-[48%] text-orange mt-6"}>Delete account</button>
                </div>
            </div>

            <FormModal isOpen={showDeleteAccountModal} style={"lg:w-[450px] rounded-t-3xl max-h-full overflow-y-auto lg:mb-0"}>
                <DeleteAccount closeModal={() => setShowDeleteAccountModal(false)} />
            </FormModal>
            <FormModal isOpen={!!(file && showModal)} style={"lg:w-[550px] max-h-full rounded-2xl w-[95%] mx-auto overflow-y-auto mb-8 lg:mb-0"}>
                <ImageUpload isPending={isPending} handleUploadProfilePicture={handleUploadProfilePicture} isGuardianProfileImg isImageConversion={isImageConversionLoading} text={"Upload Image"} closeModal={() => {
                    setFile(null);
                    setShowModal(false)
                }} setShowModal={setShowModal} file={file}/>
            </FormModal>
            <FormModal isOpen={showLogoutModal} style={"lg:w-[450px] w-[95%] rounded-3xl mb-8 lg:rounded-t-3xl max-h-full overflow-y-auto lg:mb-0"}>
                <LogoutModal closeModal={() => setShowLogoutModal(false)}/>
            </FormModal>
        </div>
    );
};
export default Account;