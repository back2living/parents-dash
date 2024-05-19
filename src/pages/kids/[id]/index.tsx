import DashboardLayout from "@/layouts/DashboardLayout";
import {Profile, SavingGoals, RecentDoCards, RecentTasks, Activity, Allowance, StoreItem} from "@/components/routes/kids/kid";
import {useState} from "react";
import {EditIcon} from "@/components/shared/Svg";
import ImageUpload from "@/components/routes/kids/kid/ImageUpload";
import FormModal from "@/components/shared/FormModal";

const styles = {
    active: "bg-[#F7F7F7] text-primary py-2 px-6 rounded-full",
    inactive: "text-secondary py-2 px-6"
}

const KidPage = () => {
    const [showTasksSection, setShowTasksSection] = useState(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [file, setFile] = useState(null);
    const [URLS, setURLS] = useState(null);
    const [selectedImages, setSelectedImage] = useState<any>([]);

    const handleImageUpload = (e: any) => {
        const selectedImage = e.target.files[0];
        setFile(selectedImage);
        setSelectedImage([...e.target.files]);
    }

    return (
        <DashboardLayout showBack title={"KIDS"}>
            <div className={"grid grid-cols-1 lg:grid-cols-2 lg:gap-20"}>
                <div className={"max-w-[600px]"}>
                    <div className={"relative"}>
                        <div className={"rounded-3xl"}>
                            <img className={"rounded-3xl object-cover"} src={"/assets/images/girl-smile.webp"} alt=""/>
                        </div>

                        <label
                            className={"cursor-pointer transition-all duration-300 hover:rotate-[360deg] absolute top-2 right-2"}
                            htmlFor="images">
                            <span onClick={() => setShowModal(true)}>{EditIcon}</span>
                            <input accept=".jpeg, .jpg, .png" multiple onChange={(e) => handleImageUpload(e)}
                                   id={"images"} type="file" hidden/>
                        </label>
                    </div>
                    <div className={"flex-center gap-2 mt-6 lg:hidden transition-all duration-300 font-medium"}>
                        <button className={!showTasksSection ? styles.active : styles.inactive}
                                onClick={() => setShowTasksSection(false)}>Profile
                        </button>
                        <button className={showTasksSection ? styles.active : styles.inactive}
                                onClick={() => setShowTasksSection(true)}>Task
                        </button>
                    </div>

                    <div className={"hidden lg:block"}>
                        <Profile/>
                        <Allowance/>
                        <Activity/>
                    </div>

                    {!showTasksSection && <div className={"lg:hidden"}>
                        <Profile/>
                        <Allowance/>
                        <Activity/>
                    </div>}
                </div>

                <div className={"hidden max-w-[600px] mt-4 lg:mt-0 lg:flex-column gap-10"}>
                    <RecentTasks/>
                    <RecentDoCards/>
                    <SavingGoals/>
                    <StoreItem/>
                </div>

                {showTasksSection && <div className={"lg:hidden max-w-[600px] mt-4 lg:mt-0 flex-column gap-10"}>
                    <RecentTasks/>
                    <RecentDoCards/>
                    <SavingGoals/>
                    <StoreItem/>
                </div>}
            </div>

            <FormModal isOpen={file}
                       style={"lg:w-[550px] max-h-full rounded-2xl w-[95%] mx-auto overflow-y-auto mb-8 lg:mb-0"}>
                <ImageUpload closeModal={() => {
                    setShowModal(false);
                    setFile(null);
                }} file={file} />
            </FormModal>
        </DashboardLayout>
    );
};

export default KidPage;