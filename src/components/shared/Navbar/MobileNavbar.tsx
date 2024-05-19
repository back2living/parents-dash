import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
    MenuIcon,
    ArrowLeftIcon, BellIcon, CloseMenuIcon,
} from "@/components/shared/Svg";
import {motion, AnimatePresence} from "framer-motion";
import Image from "next/image";
import {sidebarLinks} from "@/constants/data";
import {useRouter} from "next/router";
import Link from "next/link";
import {cn} from "@/lib/utils";

export type NavbarProp = {
    title: string;
    setShowNotifications: Dispatch<SetStateAction<boolean>>;
    setShowAccountSummary: Dispatch<SetStateAction<boolean>>;
}

const MobileNavbar = ({title, setShowNotifications, setShowAccountSummary}: NavbarProp) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Define the active paths for the Kids link
    const activePaths = ['/kids'];

    // Check if the current route matches any of the active paths
    const router = useRouter();
    const {pathname} = useRouter();
    const isActive = activePaths.some((path) => pathname.startsWith(path));
    const isKidsActive = ["kids"].includes(pathname);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overlay");
        } else {
            document.body.classList.remove("overlay");
        }
    }, [isOpen]);

    const mobileVariants = {
        initial: {
            opacity: 0,
            transition: {},
            left: "-100px",
        },
        final: {
            opacity: 1,
            transition: {},
            left: "0px",
        }
    }
    const handleGoToPreviousPage = () => router.back();

    const showArrowIcon = (title === "User Level" || title === "Rate Alert" || title === "Get Mobile Apps" || title === "Referrals");

    return (
        <div className={"h-16 flex-center justify-between lg:hidden relative"}>
            <button onClick={() => setIsOpen(true)}>{MenuIcon}</button>
            <div className={"flex-center gap-2"}>
                {showArrowIcon && <span className={"cursor-pointer"} onClick={handleGoToPreviousPage}>{ArrowLeftIcon}</span>}
                <p className={"text-md text-[#777777] font-semibold"}>{title}</p>
            </div>
            <div className={"flex-center gap-4"}>
                <div className={"flex items-center gap-2"}>
                    <button onClick={() => setShowAccountSummary(true)}>{BellIcon}</button>
                    <button>
                        <img src="/assets/images/avatar.svg" alt="avatar"/>
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && <motion.div className={"fixed bg-black/40 top-0 left-0 z-10 h-full w-full"}
                                       initial={{opacity: 0, x: -15}} animate={{opacity: 1, x: 0}}
                                       exit={{opacity: 0, x: -15}}>
                    <motion.div className={"bg-white h-full w-[90%]"} variants={mobileVariants} initial={"initial"} animate={"final"} exit={{opacity: 0}}>
                        <div className={"flex flex-col justify-between h-full gap-10"}>
                            <div className={"w-full"}>
                                <div className={"p-6 flex-center border-b border-[#EAEAEA] justify-between"}>
                                    <Image width={182} height={22} src={"/assets/images/dashboard-logo.svg"}
                                           alt={"logo"}/>
                                    <button onClick={() => setIsOpen(false)}>{CloseMenuIcon}</button>
                                </div>

                                <div className={"mt-16 pl-2"}>
                                    <div className={"mt-[100px] px-3 flex-column gap-3"}>
                                        {sidebarLinks.slice(0, 1).map((link) => <Link href={link.path}
                                                                                      key={link.name}
                                                                                      className={cn(
                                                                                          "flex-center gap-3 px-4 py-[14px] max-w-[230px]",
                                                                                          link.path === pathname && "active-sidebar"
                                                                                      )}>
                                            <span
                                                className={`${link.path === pathname && "active-icon"}`}>{link.icon}</span>
                                            <span
                                                className={cn("text-secondary font-semibold uppercase", link.path === pathname && "text-orange")}>{link.name}</span>
                                        </Link>)}
                                        {sidebarLinks.slice(1, 2).map((link) => <Link href={link.path}
                                                                                      key={link.name}
                                                                                      className={cn(
                                                                                          "flex-center gap-3 px-4 py-[14px]",
                                                                                          (link.path === pathname || isActive) && "active-sidebar"
                                                                                      )}>
                                            <span
                                                className={`${(link.path === pathname || isActive) && "active-icon"}`}>{link.icon}</span>
                                            <span
                                                className={cn("text-secondary font-semibold uppercase", (link.path === pathname || isActive) && "text-orange")}>{link.name}</span>
                                        </Link>)}

                                        {sidebarLinks.slice(2, 6).map((link) => <Link href={link.path}
                                                                                      key={link.name}
                                                                                      className={cn(
                                                                                          "flex-center gap-3 px-4 py-[14px]",
                                                                                          link.path === pathname && "active-sidebar"
                                                                                      )}>
                                            <span
                                                className={`${link.path === pathname && "active-icon"}`}>{link.icon}</span>
                                            <span
                                                className={cn("text-secondary font-semibold uppercase", link.path === pathname && "text-orange")}>{link.name}</span>
                                        </Link>)}

                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}

export default MobileNavbar;