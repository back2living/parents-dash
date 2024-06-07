import {CloseIcon, RedDotIcon} from "@/components/shared/Svg";
import ModalTop from "@/components/shared/ModalTop";
import {notificationsData} from "@/constants/data";
import {cn} from "@/lib/utils";

const Notifications = ({closeModal}: {closeModal: () => void}) => {
    const showEmptyState = false;

    return (
        <div className={"h-full"}>
            <ModalTop title={"Notifications"} Icon={CloseIcon} closeModal={closeModal} />

            {showEmptyState && <div className={"flex flex-col justify-center h-[70vh] gap-4 items-center "}>
                <img className={"object-cover"} src="/assets/images/notification.svg" alt=""/>
                <p className={"font-semibold text-secondary"}>Nothing to show yet</p>
            </div>}

            <div className={"flex-column gap-2 modal-content"}>
                {notificationsData.map((notification, index) => <div key={index}
                    className={cn(
                        "p-3 rounded-2xl relative flex items-start gap-3 bg-primary",
                        notification.read && "bg-white"
                    )}>
                    {/*<Image className={"rounded-lg"} width={40} height={40} objectFit={"cover"} src={notification.img} alt=""/>*/}
                    <img className={"w-8 h-8 object-cover rounded-lg"} src={notification.img} alt={notification.name}/>

                    <div className={"text-secondary font-normal flex-column gap-1"}>
                        <p className={"text-primary font-semibold"}>{notification.heading}</p>
                        <p className={"text-sm"}>{notification.message}</p>
                        <p>2h</p>
                    </div>

                    {!notification.read && <span className={"absolute top-3 right-3"}>{RedDotIcon}</span>}
                </div>)}

            </div>

        </div>
    );
};

export default Notifications;