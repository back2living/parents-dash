import {BellIcon} from "@/components/shared/Svg";
import {NavbarProp} from "@/components/shared/Navbar/MobileNavbar";

const DesktopNavbar = ({title, setShowNotifications, setShowAccountSummary}: NavbarProp) => {
    return (
        <header className={"hidden lg:block"}>
            <nav className={"h-20 flex-center-between mb-6"}>
                <p className={"text-secondary text-md font-semibold uppercase"}>{title}</p>

                <div className={"flex-center gap-4"}>
                    <button onClick={() => setShowNotifications(true)}>{BellIcon}</button>
                    <button onClick={() => setShowAccountSummary(true)}>
                        <img src="/assets/images/avatar.svg" alt="avatar"/>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default DesktopNavbar;