import Sidebar from "@/components/shared/Sidebar";
import Navbar from "../components/shared/Navbar";
import React from "react";
import Title from "@/components/shared/Title";

interface IDashboardLayout {
    children: React.ReactNode;  // Type for children, can be any valid React node
    title?: string;              // Type for title, must be a string
    showBack?: boolean;
}

const DashboardLayout = ({children, title}: IDashboardLayout) => {
    return (
        <div className={"bg-primary lg:p-6 h-dvh lg:h-screen"}>
            <Title title={`${title} - Playground`} description={"The ultimate platform to build capable and financially responsible kids."} />

            <div className={"lg:flex gap-4 h-full"}>
                <Sidebar/>
                <div className={"dashboard-container"}>
                    <Navbar title={title!}/>
                    <div className={"dashboard-children-wrapper"}>
                        <div className={"dashboard-children-container"}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardLayout;