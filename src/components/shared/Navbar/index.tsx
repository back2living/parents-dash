import DesktopNavbar from "@/components/shared/Navbar/DesktopNavbar";
import MobileNavbar from "@/components/shared/Navbar/MobileNavbar";
import {useState} from "react";

const Navbar = ({title}: { title: string }) => {
    const [showNotifications, setShowNotifications] = useState<boolean>(false);
    const [showAccountSummary, setShowAccountSummary] = useState<boolean>(false);

    return (
        <div>
            <DesktopNavbar setShowNotifications={setShowNotifications} setShowAccountSummary={setShowAccountSummary} title={title} />
            <MobileNavbar setShowNotifications={setShowNotifications} setShowAccountSummary={setShowAccountSummary} title={title} />
        </div>
    );
};

export default Navbar;