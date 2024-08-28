import DesktopNavbar from "@/components/shared/Navbar/DesktopNavbar";
import MobileNavbar from "@/components/shared/Navbar/MobileNavbar";
import {useState} from "react";
import InfoModal from "@/components/shared/InfoModal";
import Notifications from "@/components/shared/Navbar/modal/Notifications";

const Navbar = ({title, goBack}: { title: string, goBack?:boolean }) => {
    const [showNotifications, setShowNotifications] = useState<boolean>(false);

    return (
        <div>
            <DesktopNavbar setShowNotifications={setShowNotifications} title={title} goBack={goBack} />
            <MobileNavbar setShowNotifications={setShowNotifications} title={title} goBack={goBack} />

            {/*------------------MODAL-----------------------*/}
            <InfoModal isOpen={showNotifications} style={"w-full lg:w-[400px] h-full overflow-y-auto overflow-x-hidden"}>
                <Notifications closeModal={() => setShowNotifications(false)}/>
            </InfoModal>
        </div>
    );
};

export default Navbar;