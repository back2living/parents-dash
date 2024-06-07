import {useState} from "react";
import FormModal from "@/components/shared/FormModal";
import ChangePassword from "@/components/routes/kids/modal/ChangePassword";
import RemoveKid from "@/components/routes/kids/modal/RemoveKid";
import AddMoney from "@/components/routes/kids/modal/AddMoney";

const Profile = () => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPointsModal, setShowPointsModal] = useState(false);
    const [showRemoveKidModal, setShowRemoveKidModal] = useState(false);


    return (
        <div>
            <div className={"mt-4 lg:mt-6"}>
                <p className={"text-primary font-medium text-[18px] mb-2"}>Layla Adams</p>
                <div className={"flex-center gap-4 lg:gap-6"}>
                    <div className={"text-sm text-primary flex-1"}>
                        <p className={"text-secondary mb-2"}>Username</p>
                        <p>@layla</p>
                    </div>
                    <div className={"text-sm text-primary flex-1"}>
                        <p className={"text-secondary mb-2"}>Gender</p>
                        <p>Female</p>
                    </div>
                    <div className={"text-sm text-primary flex-1"}>
                        <p className={"text-secondary mb-2"}>Age</p>
                        <p>8 years</p>
                    </div>
                </div>
            </div>

            <div className={"flex-center flex-wrap gap-4 mt-10 text-nowrap"}>
                <button onClick={() => setShowPointsModal(true)} className={"w-[170px] primary-btn lg:flex-1"}>Add money</button>
                <button onClick={() => setShowPasswordModal(true)} className={"w-fit white-btn lg:flex-1"}>Change password</button>
                <button onClick={() => setShowRemoveKidModal(true)} className={"text-orange font-semibold lg:flex-1"}>REMOVE KID</button>
            </div>

            <FormModal isOpen={showPointsModal || showPasswordModal || showRemoveKidModal} style={`lg:w-[550px] rounded-t-3xl max-h-full overflow-y-auto lg:mb-0 ${showRemoveKidModal && "rounded-b-3xl mb-8 w-[95%] mx-auto"}`}>
                {showPointsModal && <AddMoney closeModal={() => setShowPointsModal(false)}/>}
                {showPasswordModal && <ChangePassword closeModal={() => setShowPasswordModal(false)}/>}
                {showRemoveKidModal && <RemoveKid closeModal={() => setShowRemoveKidModal(false)}/>}
            </FormModal>
        </div>
    );
};

export default Profile;