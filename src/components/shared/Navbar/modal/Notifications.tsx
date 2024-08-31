import {CloseIcon, RedDotIcon} from "@/components/shared/Svg";
import ModalTop from "@/components/shared/ModalTop";
import {cn} from "@/lib/utils";
import {useDeleteNotification, useFetchNotifications, useReadNotification} from "@/hooks/useNotifications";
import {useState} from "react";
import {motion} from "framer-motion";
import {INotification} from "@interfaces/NotificationInterface";
import {format} from "date-fns";

const Loader = () => {
    return (
        <div>
            {Array.from({length: 10}).map((_, index) => <div key={index} className={"h-[100px] mb-2 rounded-2xl w-[90%] mx-auto bg-animate"}/>)}
        </div>
    )
}

const Notifications = ({closeModal}: { closeModal: () => void }) => {
    const [slideToLeft, setSlideToLeft] = useState(false);
    const [notificationContent, setNotificationContent] = useState<null | INotification>(null);

    const {data, isLoading} = useFetchNotifications();
    const showEmptyState = data?.data?.length === 0;

    const handleNotification = (notification: INotification) => {
        setSlideToLeft(!slideToLeft)
        setNotificationContent((prev: INotification | null) => (prev === notification ? null : notification));
    }

    const {mutate: readNotifications, isPending: isReadPending} = useReadNotification();
    const {mutate, isPending: isDeletePending} = useDeleteNotification();

    const handleReadNotification = () => {
        if (notificationContent?._id) {
            readNotifications({
                id: notificationContent?._id
            });
        }
    }
    const handleDeleteNotification = () => {
        if (notificationContent?._id) {
            mutate({
                id: notificationContent?._id
            });
        }
    }

    return (
        <div className={"h-full"}>
            <ModalTop title={"Notifications"} Icon={CloseIcon} closeModal={closeModal}/>

            {isLoading && <Loader />}
            {showEmptyState && <div className={"flex flex-col justify-center h-[70vh] gap-4 items-center "}>
                <img className={"object-cover"} src="/assets/images/notification.svg" alt=""/>
                <p className={"font-semibold text-secondary"}>Nothing to show yet</p>
            </div>}

            {!isLoading && !showEmptyState && <div className={"flex-column gap-2 modal-content relative"}>
                {data?.data?.map((notification) => (
                    <div
                        onTouchStart={() => handleNotification(notification)}
                        onMouseLeave={() => handleNotification(notification)}
                         onMouseEnter={() => handleNotification(notification)}
                        key={notification._id}
                         className={"flex-center gap-4"}>
                        <motion.div
                            animate={notificationContent?._id === notification?._id ? {left: "-60px"} : {left: "0px"}}
                            className={cn(
                                "p-3 rounded-2xl relative flex items-start gap-3 bg-primary",
                                notification?.read && "bg-white",
                            )}>
                            <img className={"w-8 h-8 object-cover rounded-lg"} src={notification?.receiver?.avatar} alt={notification?.receiver?.firstName}/>
                            <div className={"text-secondary font-normal flex-column gap-1"}>
                                <p className={"text-sm"}>{notification?.message}</p>
                                <p className={"text-xs"}>{format(notification?.createdAt, "PPPP")}</p>
                            </div>
                            {!notification?.read && <span className={"absolute top-3 right-3"}>{RedDotIcon}</span>}
                        </motion.div>

                        <motion.div
                            animate={notificationContent?._id === notification?._id ? {opacity: 100} : {opacity: 0}}
                            className={`absolute right-6 lg:right-8 flex-column gap-1 items-start text-sm font-medium`}>
                            {!notification?.read && <button disabled={isReadPending} onClick={handleReadNotification}
                                     className={`text-[#00D47E] ${isReadPending ? "opacity-50 animate-pulse" : "opacity-100"}`}>Read</button>}
                            <button disabled={isDeletePending} onClick={handleDeleteNotification} className={`text-[#FF0021] ${isDeletePending ? "opacity-50 animate-pulse" : "opacity-100"}`}>Delete</button>

                        </motion.div>
                    </div>

                ))}
            </div>}
        </div>
    );
};

export default Notifications;