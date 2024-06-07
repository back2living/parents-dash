import {cn} from "@/lib/utils";
import Link from "next/link";
import {LogoutIcon, ProfileSettingsIcon, SupportIcon} from "@/components/shared/Svg";
import {Dispatch, LegacyRef, SetStateAction, useState} from "react";
import FormModal from "@/components/shared/FormModal";
import LogoutModal from "@/components/shared/Navbar/modal/LogoutModal";

interface IUSerProfile {
    showUserProfile: boolean;
    ref?: LegacyRef<HTMLDivElement> | undefined;
    setShowUserProfile: Dispatch<SetStateAction<boolean>>;
}

const UserProfile = ({showUserProfile, ref, setShowUserProfile}: IUSerProfile) => {
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

    return (
        <>
            <div ref={ref} className={cn(
                "opacity-0 top-[-1000px] transition-opacity duration-300 absolute",
                showUserProfile && "opacity-100 transition-opacity duration-300 top-14 lg:top-20 bg-white shadow text-[#868686] w-60 right-0 absolute z-50 border-2 border-[#ECECEC] rounded-2xl font-medium"
            )}>
                <div className={"p-4 flex-center gap-2 border-b border-b-[#ECECEC]"}>
                    <div className="left">
                        <img className={"h-[33px]"} src="/assets/images/avatar.svg" alt=""/>
                    </div>
                    <div className="right flex-column">
                        <span className={"text-primary"}>Asher Kyle</span>
                        <span>Parent</span>
                    </div>
                </div>
                <Link href={'/settings'} className={"flex-center gap-2 p-4"}>
                    <span>{ProfileSettingsIcon}</span>
                    <span>Settings</span>
                </Link>
                <div className={"flex-center gap-2 p-4 "}>
                    <p>{SupportIcon}</p>
                    <p>Contact Support</p>
                </div>
                <button onClick={() => {
                    setShowUserProfile(false);
                    setShowLogoutModal(true);
                }} className={"flex-center gap-2 p-4 w-full border-t border-t-[#ECECEC]"}>
                    <p>{LogoutIcon}</p>
                    <p className={"text-orange"}>LOG OUT</p>
                </button>
            </div>

            <FormModal isOpen={showLogoutModal} style={"lg:w-[450px] rounded-t-3xl max-h-full overflow-y-auto lg:mb-0"}>
                <LogoutModal closeModal={() => setShowLogoutModal(false)}/>
            </FormModal>
        </>
    );
};

export default UserProfile;