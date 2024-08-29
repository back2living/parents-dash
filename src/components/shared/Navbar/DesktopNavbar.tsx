import {BellIcon} from "@/components/shared/Svg";
import {NavbarProp} from "@/components/shared/Navbar/MobileNavbar";
import {useEffect, useRef, useState} from "react";
import useOnClickOutsideAndEscapePress from "@/hooks/useOnClickOutsideAndEscapePress";
import UserProfile from "@/components/shared/Navbar/UserProfile";
import GoBack from "@/components/shared/GoBack";
import {useCurrentUser} from "@/store/auth/authStore";
import Image from "next/image";

const DesktopNavbar = ({title="Title", setShowNotifications, goBack}: NavbarProp) => {
    const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutsideAndEscapePress(ref, () => setShowUserProfile(false));
    const [key, setKey] = useState(0);

    const currentUser = useCurrentUser();

    useEffect(() => {
        // This effect will run whenever currentUser?.updatedAt changes
        setKey(prevState => prevState + 1);
    }, [currentUser?.updatedAt]);

    return (
        <header className={"hidden lg:block relative"}>
            <nav className={"h-20 flex-center-between mb-6"}>
                {!goBack && <p className={"text-secondary text-md font-semibold uppercase"}>{title}</p>}
                {goBack && <GoBack/>}

                <div className={"flex-center gap-4"}>
                    <button onClick={() => setShowNotifications(true)}>{BellIcon}</button>
                    <button onClick={() => setShowUserProfile(!showUserProfile)}>
                        <Image
                            className={"w-8 h-8 rounded-full"}
                            width={32}
                            height={32}
                            src={currentUser?.avatar ? `${currentUser?.avatar}?key=${key}&cache=${key}` : "/assets/images/avatar.svg"}
                            alt={currentUser?.firstName || ""}
                        />
                        {/*<img key={key} className={"w-8 h-8 rounded-full"} src={currentUser?.avatar || "/assets/images/avatar.svg"} alt="avatar"/>*/}
                    </button>
                </div>
            </nav>

            {/*---------- USER PROFILE-----------*/}
            <UserProfile showUserProfile={showUserProfile} ref={ref} setShowUserProfile={setShowUserProfile}/>
        </header>
    );
};

export default DesktopNavbar;