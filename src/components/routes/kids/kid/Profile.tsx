import {useState} from "react";
import FormModal from "@/components/shared/FormModal";
import ChangePassword from "@/components/routes/kids/modal/ChangePassword";
import RemoveKid from "@/components/routes/kids/modal/RemoveKid";
import AddMoney from "@/components/routes/kids/modal/AddMoney";
import {IKid} from "@/hooks/useKids";

const Profile = ({kidData}: {kidData: IKid}) => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPointsModal, setShowPointsModal] = useState(false);
    const [showRemoveKidModal, setShowRemoveKidModal] = useState(false);

    const age = new Date().getFullYear() - kidData?.dob?.year;
    return (
        <div>
            <div className={"mt-4 lg:mt-6"}>
                <p className={"text-primary font-medium text-[18px] mb-2"}>{kidData.firstName} {kidData.lastName}</p>
                <div className={"flex-center gap-4 lg:gap-6"}>
                    <div className={"text-sm text-primary flex-1"}>
                        <p className={"text-secondary mb-2"}>Username</p>
                        <p>@{kidData.username}</p>
                    </div>
                    <div className={"text-sm text-primary flex-1"}>
                        <p className={"text-secondary mb-2"}>Gender</p>
                        <p>{kidData?.gender === "m" ? "Male" : "Female"}</p>
                    </div>
                    <div className={"text-sm text-primary flex-1"}>
                        <p className={"text-secondary mb-2"}>Age</p>
                        <p>{age} years</p>
                    </div>
                </div>
            </div>

            <div className={"flex-center flex-wrap gap-4 mt-10 text-nowrap"}>
                <button onClick={() => setShowPasswordModal(true)} className={"w-fit white-btn lg:flex-1 max-w-[230px]"}>Change Password</button>
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