import {CloseIcon, EditKidIcon, SelectedCircle, Circle} from "@/components/shared/Svg";
import {DatePickerForm} from "@/components/shared/DatePicker";
import {cn} from "@/lib/utils";
import {useState} from "react";
import PasswordInput from "@/components/shared/PasswordInput";
import ModalTop from "@/components/shared/ModalTop";
import FormModal from "@/components/shared/FormModal";
import ImageUpload from "@/components/routes/kids/kid/ImageUpload";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {addKidSchema} from "@/lib/helpers";
import Button from "@/components/shared/Button";
import {IAddKid, useAddKid} from "@/hooks/useKids";
import useUploadFiles from "@/hooks/useUploadFiles";
import useImageUpload from "@/hooks/useImageUpload";

type FormValues = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    points: number;
}

const AddKid = ({closeModal}: {closeModal: () => void}) => {
    const [showModal, setShowModal] = useState(false);
    const [isMaleGender, setIsMaleGender] = useState<boolean>(true);
    const [date, setDate] = useState<Date>();

    const form = useForm<FormValues>({mode: "onChange", resolver: zodResolver(addKidSchema)});
    const {formState, register, handleSubmit} = form;
    const {errors, isValid} = formState;
    const {selectedImage, handleImageUpload, file, setFile, handleGetImageSignedUrls, URLS, isImageConversionLoading} = useImageUpload();

    // this
    useUploadFiles(URLS, selectedImage);
    const {mutate, isPending} = useAddKid(closeModal);
    const handleAddKid = async (kidData: FormValues) => {
        if (selectedImage?.length > 0) {
            const imageUrl = await handleGetImageSignedUrls();
            if (imageUrl) {
                const payload: IAddKid = {
                    firstName: kidData.firstName,
                    lastName: kidData.lastName,
                    points: kidData.points,
                    username: kidData.username,
                    password: kidData.password,
                    avatar: imageUrl[0],
                    // dob: formatDate(date!),
                    dob: "05-01-2020",
                    gender: isMaleGender ? "m" : "f"
                }
                mutate(payload);
            }
        }
    }

    const isFormValid = !!(file && isValid && date);

    return (
        <div>
            <ModalTop title={"Add a kid"} Icon={CloseIcon} closeModal={closeModal} />
            <div className={"modal-content"}>
                <form onSubmit={handleSubmit(handleAddKid)} className={"flex-column gap-6"}>
                    <div className={"relative"}>
                        <div className={"rounded-3xl w-20 h-20 relative"}>
                            {!file && <img className={"rounded-full object-cover w-full h-full"}
                                           src={"/assets/images/kid-avatar.svg"} alt=""/>}
                            {file && <img className={"rounded-full object-cover w-full h-full"}
                                          src={URL.createObjectURL(file)} alt=""/>}
                            <label
                                className={"cursor-pointer transition-all duration-300 hover:rotate-[360deg] absolute top-0 right-0"}
                                htmlFor="images">
                                <span>{EditKidIcon}</span>
                                <input accept=".jpeg, .jpg, .png, .heic" multiple onChange={(e) => {
                                    handleImageUpload(e);
                                    setShowModal(true);
                                }} id={"images"} type="file" hidden/>
                            </label>
                        </div>
                        {!file && <p className={"auth-form-error absolute ml-0"}>Please upload an image</p>}
                    </div>

                    <div className={"flex-center gap-4"}>
                        <div className={"flex-1"}>
                            <label className={"auth-label"} htmlFor="">First name</label>
                            <input {...register("firstName")} placeholder={"John"} className={"auth-input"}
                                   type="text"/>
                            {errors?.firstName &&
                                <span className={"auth-form-error mt-1 absolute"}>{errors?.firstName?.message}</span>}
                        </div>
                        <div className={"flex-1"}>
                            <label className={"auth-label"} htmlFor="">Last name</label>
                            <input {...register("lastName")} placeholder={"Doe"} className={"auth-input"} type="text"/>
                            {errors?.lastName &&
                                <span className={"auth-form-error mt-1 absolute"}>{errors?.lastName?.message}</span>}
                        </div>
                    </div>
                    <div className={"flex-center flex-column lg:flex-row gap-4"}>
                        <div className={"w-full lg:flex-1"}>
                            <label className="auth-label">Username</label>
                            <input {...register("username")} type="text" placeholder={"Enter username"}
                                   className={"auth-input"}/>
                            {errors?.username &&
                                <span className={"auth-form-error mt-1 absolute"}>{errors?.username?.message}</span>}
                        </div>
                        <div className={"w-full lg:flex-1"}>
                            <label className={"auth-label text-[#515151]"} htmlFor="">Gender</label>
                            <div className={"flex-center gap-4"}>
                                <button type={"button"} onClick={() => setIsMaleGender(true)} className={cn(
                                    "default-radio-btn",
                                    isMaleGender && "selected-radio-btn"
                                )}>
                            <span
                                className={`flex-center gap-2 ${isMaleGender ? "text-[#363636]" : "text-secondary-dark"}`}>
                                {isMaleGender ? SelectedCircle : Circle} Male
                            </span>
                                </button>

                                <button type={"button"} onClick={() => setIsMaleGender(false)} className={cn(
                                    "default-radio-btn",
                                    !isMaleGender && "selected-radio-btn"
                                )}>
                             <span
                                 className={`flex-center gap-2 ${!isMaleGender ? "text-[#363636]" : "text-secondary-dark"}`}>
                                {!isMaleGender ? SelectedCircle : Circle} Female
                            </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <DatePickerForm date={date} setDate={setDate} isDOB/>

                    <div>
                        <label className={"auth-label"} htmlFor="">Starting Allowance</label>
                        <div className={"w-full relative rounded-[100px]"}>
                            <input {...register("points", {valueAsNumber: true})} className={`password-input`}
                                   type={"number"} placeholder={"0.00"}/>
                            <p className={"w-fit absolute top-1/2 right-4 -translate-y-1/2 text-[#B1B1B1] font-medium"}>pts</p>
                        </div>
                        {errors?.points && <span className={"auth-form-error mt-2"}>{errors?.points?.message}</span>}
                    </div>

                    <PasswordInput
                        label={"Password"}
                        errors={errors}
                        name={"password"}
                        register={register}
                    />

                    <div className={"flex gap-6"}>
                        <button type={"button"} onClick={closeModal} className={"white-btn"}>Cancel</button>
                        <Button type={"submit"} isLoading={isPending} isValid={isFormValid} name={"Submit"}/>
                    </div>
                </form>
            </div>

            <FormModal isOpen={!!(file && showModal)}
                       style={"lg:w-[550px] max-h-full rounded-2xl w-[95%] mx-auto overflow-y-auto mb-8 lg:mb-0"}>
                <ImageUpload isImageConversion={isImageConversionLoading} text={"Upload Image"} closeModal={() => {
                    setFile(null);
                    setShowModal(false)
                }} setShowModal={setShowModal} file={file}/>
            </FormModal>
        </div>
    );
};

export default AddKid;