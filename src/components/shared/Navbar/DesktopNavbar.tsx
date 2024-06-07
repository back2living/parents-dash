import {BellIcon} from "@/components/shared/Svg";
import {NavbarProp} from "@/components/shared/Navbar/MobileNavbar";
import {useRef, useState} from "react";
import useOnClickOutsideAndEscapePress from "@/hooks/useOnClickOutsideAndEscapePress";
import UserProfile from "@/components/shared/Navbar/UserProfile";

const style = {
    show: "",
    hide: "bg-white shadow text-[#868686] w-60 right-0 top-20 absolute z-50 border-2 border-[#ECECEC] rounded-2xl font-medium",
}

const DesktopNavbar = ({title="Title", setShowNotifications, isBack}: NavbarProp) => {
    const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutsideAndEscapePress(ref, () => setShowUserProfile(false));

    return (
        <header className={"hidden lg:block relative"}>
            <nav className={"h-20 flex-center-between mb-6"}>
                <p className={"text-secondary text-md font-semibold uppercase"}>{title}</p>
                {/*{isBack && <GoBack/>}*/}

                <div className={"flex-center gap-4"}>
                    <button onClick={() => setShowNotifications(true)}>{BellIcon}</button>
                    <button onClick={() => setShowUserProfile(!showUserProfile)}>
                        <img src="/assets/images/avatar.svg" alt="avatar"/>
                    </button>
                </div>
            </nav>

            {/*---------- USER PROFILE-----------*/}
            <UserProfile showUserProfile={showUserProfile} ref={ref} setShowUserProfile={setShowUserProfile}/>
        </header>
    );
};

export default DesktopNavbar;