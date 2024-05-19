import Link from "next/link";
import {sidebarLinks} from "@/constants/data";
import {cn} from "@/lib/utils";
import {useRouter} from "next/router";

const Sidebar = () => {
    const {pathname} = useRouter();
    const isKidsActive = ["kids"].includes(pathname);

    // Define the active paths for the Kids link
    const activePaths = ['/kids'];

    // Check if the current route matches any of the active paths
    const isActive = activePaths.some((path) => pathname.startsWith(path));

    return (
        <div className={"sidebar-wrapper hidden lg:block"}>
            <div className={"w-full"}>
                <Link href={'/'} className="p-6 inline-block">
                    <img src="/assets/images/dashboard-logo.svg" alt=""/>
                </Link>

                {/*dashboard-links*/}
                <div className={"mt-[100px] px-3 flex-column gap-3"}>
                    {sidebarLinks.slice(0, 1).map((link) => <Link href={link.path} key={link.name} className={cn(
                        "flex-center gap-3 px-4 py-[14px]",
                        link.path === pathname && "active-sidebar"
                    )}>
                        <span className={`${link.path === pathname && "active-icon"}`}>{link.icon}</span>
                        <span className={cn("text-secondary font-semibold uppercase", link.path === pathname && "text-orange")}>{link.name}</span>
                    </Link>)}
                    {sidebarLinks.slice(1, 2).map((link) => <Link href={link.path} key={link.name} className={cn(
                        "flex-center gap-3 px-4 py-[14px]",
                        (link.path === pathname || isActive) && "active-sidebar"
                    )}>
                        <span className={`${(link.path === pathname || isActive) && "active-icon"}`}>{link.icon}</span>
                        <span className={cn("text-secondary font-semibold uppercase", (link.path === pathname || isActive) && "text-orange")}>{link.name}</span>
                    </Link>)}

                    {sidebarLinks.slice(2, 6).map((link) => <Link href={link.path} key={link.name} className={cn(
                        "flex-center gap-3 px-4 py-[14px]",
                        link.path === pathname && "active-sidebar"
                    )}>
                        <span className={`${link.path === pathname && "active-icon"}`}>{link.icon}</span>
                        <span className={cn("text-secondary font-semibold uppercase", link.path === pathname && "text-orange")}>{link.name}</span>
                    </Link>)}

                </div>
            </div>
        </div>
    );
};

export default Sidebar;